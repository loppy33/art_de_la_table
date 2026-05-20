import { prisma } from '@/lib/prisma'
import ContactClient from './ContactClient'

import { contactMetadata } from '@/lib/metadata'
export const metadata = contactMetadata

async function getContacts() {
  const rows = await prisma.siteContent.findMany({
    where: { key: { in: ['contact_address', 'contact_phone', 'contact_email'] } },
  })
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}

export default async function Contact() {
  const contacts = await getContacts()
  return <ContactClient contacts={contacts} />
}