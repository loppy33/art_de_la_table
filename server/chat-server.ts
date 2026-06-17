// server/chat-server.ts
// Запуск: npx ts-node server/chat-server.ts
// В production: pm2 start server/chat-server.ts --interpreter ts-node

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import path from 'path'

const app = express()
const httpServer = createServer(app)
const prisma = new PrismaClient()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── CORS ───────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// ── Socket.io ──────────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    credentials: true,
  },
  maxHttpBufferSize: 10 * 1024 * 1024, // 10MB pour les fichiers
})

// ── Auth middleware Socket ─────────────────────────────────────────────────
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('Non autorisé'))

  try {
    const payload = jwt.verify(token, process.env.CHAT_JWT_SECRET!) as {
      userId: string
      role: string
    }
    socket.data.userId = payload.userId
    socket.data.role = payload.role
    next()
  } catch {
    next(new Error('Token invalide'))
  }
})

// ── Socket events ──────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  const { userId, role } = socket.data
  console.log(`✓ Connecté: ${userId} (${role})`)

  // Rejoindre ses rooms
  socket.on('join_rooms', async () => {
    try {
      let rooms: { id: string }[] = []

      if (role === 'ADMIN') {
        rooms = await prisma.chatRoom.findMany({ select: { id: true } })
      } else if (role === 'CLIENT') {
        rooms = await prisma.chatRoom.findMany({
          where: { clientId: userId },
          select: { id: true },
        })
      } else if (role === 'ARTISAN') {
        rooms = await prisma.chatRoom.findMany({
          where: { artisanId: userId },
          select: { id: true },
        })
      }

      rooms.forEach(r => socket.join(`room:${r.id}`))
      socket.emit('rooms_joined', rooms.map(r => r.id))
    } catch (err) {
      socket.emit('error', 'Erreur lors du chargement des rooms')
    }
  })

  // Rejoindre une room spécifique
  socket.on('join_room', async (roomId: string) => {
    try {
      const room = await prisma.chatRoom.findUnique({ where: { id: roomId } })
      if (!room) return socket.emit('error', 'Room introuvable')

      // Vérifier accès
      const hasAccess =
        role === 'ADMIN' ||
        room.clientId === userId ||
        room.artisanId === userId

      if (!hasAccess) return socket.emit('error', 'Accès refusé')

      socket.join(`room:${roomId}`)

      // Marquer comme lus
      await prisma.message.updateMany({
        where: { roomId, senderId: { not: userId }, read: false },
        data: { read: true },
      })

      // Charger historique
      const messages = await prisma.message.findMany({
        where: { roomId },
        include: { sender: { select: { id: true, firstName: true, lastName: true, role: true } } },
        orderBy: { createdAt: 'asc' },
        take: 100,
      })

      socket.emit('room_history', { roomId, messages })
    } catch {
      socket.emit('error', 'Erreur')
    }
  })

  // Envoyer un message texte
  socket.on('send_message', async (data: { roomId: string; content: string }) => {
    try {
      const { roomId, content } = data
      if (!content?.trim()) return

      const room = await prisma.chatRoom.findUnique({ where: { id: roomId } })
      if (!room) return socket.emit('error', 'Room introuvable')

      const hasAccess =
        role === 'ADMIN' ||
        room.clientId === userId ||
        room.artisanId === userId

      if (!hasAccess) return socket.emit('error', 'Accès refusé')

      const message = await prisma.message.create({
        data: {
          roomId,
          senderId: userId,
          type: 'TEXT',
          content: content.trim(),
        },
        include: {
          sender: { select: { id: true, firstName: true, lastName: true, role: true } },
        },
      })

      await prisma.chatRoom.update({
        where: { id: roomId },
        data: { lastMsgAt: new Date() },
      })

      // Broadcast à tous dans la room
      io.to(`room:${roomId}`).emit('new_message', message)
    } catch {
      socket.emit('error', 'Erreur envoi message')
    }
  })

  // Envoyer un fichier/image (en base64)
  socket.on('send_file', async (data: {
    roomId: string
    fileName: string
    fileType: string
    fileSize: number
    fileData: string // base64
  }) => {
    try {
      const { roomId, fileName, fileType, fileSize, fileData } = data

      if (fileSize > 10 * 1024 * 1024) {
        return socket.emit('error', 'Fichier trop volumineux (max 10 Mo)')
      }

      const room = await prisma.chatRoom.findUnique({ where: { id: roomId } })
      if (!room) return socket.emit('error', 'Room introuvable')

      const hasAccess =
        role === 'ADMIN' ||
        room.clientId === userId ||
        room.artisanId === userId

      if (!hasAccess) return socket.emit('error', 'Accès refusé')

      // Upload vers Supabase Storage
      const ext = path.extname(fileName)
      const storagePath = `chat/${roomId}/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
      const buffer = Buffer.from(fileData, 'base64')

      const { error } = await supabase.storage
        .from('media')
        .upload(storagePath, buffer, { contentType: fileType, upsert: false })

      if (error) return socket.emit('error', 'Erreur upload fichier')

      const { data: urlData } = supabase.storage.from('media').getPublicUrl(storagePath)

      const isImage = fileType.startsWith('image/')
      const message = await prisma.message.create({
        data: {
          roomId,
          senderId: userId,
          type: isImage ? 'IMAGE' : 'FILE',
          content: urlData.publicUrl,
          fileName,
          fileSize,
        },
        include: {
          sender: { select: { id: true, firstName: true, lastName: true, role: true } },
        },
      })

      await prisma.chatRoom.update({
        where: { id: roomId },
        data: { lastMsgAt: new Date() },
      })

      io.to(`room:${roomId}`).emit('new_message', message)
    } catch {
      socket.emit('error', 'Erreur envoi fichier')
    }
  })

  // Indicateur de frappe
  socket.on('typing', (roomId: string) => {
    socket.to(`room:${roomId}`).emit('user_typing', { userId, roomId })
  })

  socket.on('stop_typing', (roomId: string) => {
    socket.to(`room:${roomId}`).emit('user_stop_typing', { userId, roomId })
  })

  socket.on('disconnect', () => {
    console.log(`✗ Déconnecté: ${userId}`)
  })
})

// ── REST API pour le chat ──────────────────────────────────────────────────

// Middleware auth REST
function authMiddleware(req: any, res: any, next: any) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Non autorisé' })

  try {
    const payload = jwt.verify(
      auth.slice(7),
      process.env.CHAT_JWT_SECRET!
    ) as { userId: string; role: string }
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Token invalide' })
  }
}

// GET /chat/artisans — liste des artisans disponibles (pour le client)
app.get('/chat/artisans', authMiddleware, async (req: any, res) => {
  const artisans = await prisma.chatUser.findMany({
    where: { role: 'ARTISAN' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      artisan: { select: { name: true, logo: true } },
    },
  })
  res.json(artisans)
})

// POST /chat/rooms — créer ou récupérer une room
app.post('/chat/rooms', authMiddleware, async (req: any, res) => {
  const { artisanUserId } = req.body
  const clientId = req.user.userId

  if (req.user.role !== 'CLIENT' && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Seuls les clients peuvent créer une room' })
  }

  try {
    // Upsert room
    const room = await prisma.chatRoom.upsert({
      where: { clientId_artisanId: { clientId, artisanId: artisanUserId } },
      update: {},
      create: { clientId, artisanId: artisanUserId },
      include: {
        client:  { select: { id: true, firstName: true, lastName: true } },
        artisan: { select: { id: true, firstName: true, lastName: true } },
      },
    })

    // Notifier l'artisan et l'admin
    io.to(`room:${room.id}`).emit('room_created', room)

    res.json(room)
  } catch {
    res.status(500).json({ error: 'Erreur création room' })
  }
})

// GET /chat/rooms — liste des rooms (selon le rôle)
app.get('/chat/rooms', authMiddleware, async (req: any, res) => {
  const { userId, role } = req.user
  try {
    const where =
      role === 'ADMIN' ? {} :
      role === 'CLIENT' ? { clientId: userId } :
      { artisanId: userId }

    const rooms = await prisma.chatRoom.findMany({
      where,
      include: {
        client:   { select: { id: true, firstName: true, lastName: true } },
        artisan:  { select: { id: true, firstName: true, lastName: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { content: true, type: true, createdAt: true, read: true, senderId: true },
        },
      },
      orderBy: { lastMsgAt: 'desc' },
    })

    // Compter les non-lus par room
    const roomsWithUnread = await Promise.all(
      rooms.map(async r => {
        const unread = await prisma.message.count({
          where: { roomId: r.id, senderId: { not: userId }, read: false },
        })
        return { ...r, unread }
      })
    )

    res.json(roomsWithUnread)
  } catch {
    res.status(500).json({ error: 'Erreur' })
  }
})

// Démarrer le serveur
const PORT = process.env.CHAT_SERVER_PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`🚀 Chat server running on port ${PORT}`)
})
