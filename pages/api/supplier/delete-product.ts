import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session?.role === 'SUPPLIER') {
    if (req.method === 'DELETE') {
      const { id, userId } = req.body

      if (session.uid !== userId) {
        return res.status(401).json({ success: false })
      }

      try {
        await prisma.product.delete({
          where: {
            id
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

export default handler
