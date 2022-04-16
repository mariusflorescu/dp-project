import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session?.role === 'ADMIN') {
    if (req.method === 'PATCH') {
      try {
        const { id, role } = req.body

        const updatedUser = await prisma.user.update({
          where: {
            id
          },
          data: {
            role
          }
        })

        return res.status(200).json({ success: true })
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
