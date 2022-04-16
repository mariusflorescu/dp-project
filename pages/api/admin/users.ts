import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session?.role === 'ADMIN') {
    if (req.method === 'GET') {
      try {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        })

        return res.status(200).json({ users })
      } catch (err) {
        return res.status(500).json({ success: false })
      }
    }
  } else {
    res.send({
      error: 'You must be signed in to view the protected content on this page.'
    })
  }
}
