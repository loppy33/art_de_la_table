'use client'
// hooks/useChatSocket.ts

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

export interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  type: 'TEXT' | 'IMAGE' | 'FILE'
  content: string
  fileName?: string
  fileSize?: number
  read: boolean
  createdAt: string
  sender: {
    id: string
    firstName: string
    lastName: string
    role: string
  }
}

export interface ChatRoom {
  id: string
  clientId: string
  artisanId: string
  lastMsgAt: string
  unread: number
  client: { id: string; firstName: string; lastName: string }
  artisan: { id: string; firstName: string; lastName: string }
  messages: ChatMessage[]
}

const CHAT_SERVER = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001'

export function useChatSocket(token: string | null) {
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({}) // roomId → messages
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!token) return

    const socket = io(CHAT_SERVER, {
      auth: { token },
      transports: ['websocket'],
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('join_rooms')
    })

    socket.on('disconnect', () => setConnected(false))

    socket.on('room_history', ({ roomId, messages: msgs }: { roomId: string; messages: ChatMessage[] }) => {
      setMessages(prev => ({ ...prev, [roomId]: msgs }))
    })

    socket.on('new_message', (msg: ChatMessage) => {
      setMessages(prev => ({
        ...prev,
        [msg.roomId]: [...(prev[msg.roomId] || []), msg],
      }))
    })

    socket.on('user_typing', ({ userId, roomId }: { userId: string; roomId: string }) => {
      setTypingUsers(prev => ({ ...prev, [`${roomId}:${userId}`]: true }))
    })

    socket.on('user_stop_typing', ({ userId, roomId }: { userId: string; roomId: string }) => {
      setTypingUsers(prev => {
        const next = { ...prev }
        delete next[`${roomId}:${userId}`]
        return next
      })
    })

    socket.on('error', (msg: unknown) => {
      if (typeof msg === 'string') {
        console.error('Socket error:', msg);
      } else if (msg instanceof Error) {
        console.error('Socket error:', msg.message);
      } else {
        console.error('Socket error:', JSON.stringify(msg));
      }
    });

    return () => { socket.disconnect() }
  }, [token])

  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('join_room', roomId)
  }, [])

  const sendMessage = useCallback((roomId: string, content: string) => {
    socketRef.current?.emit('send_message', { roomId, content })
  }, [])

  const sendFile = useCallback(async (roomId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      socketRef.current?.emit('send_file', {
        roomId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64,
      })
    }
    reader.readAsDataURL(file)
  }, [])

  const emitTyping = useCallback((roomId: string) => {
    socketRef.current?.emit('typing', roomId)
  }, [])

  const emitStopTyping = useCallback((roomId: string) => {
    socketRef.current?.emit('stop_typing', roomId)
  }, [])

  return {
    connected,
    messages,
    typingUsers,
    joinRoom,
    sendMessage,
    sendFile,
    emitTyping,
    emitStopTyping,
  }
}
