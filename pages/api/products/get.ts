import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          quantity: true,
          imageURL: true
        }
      })

      return res.status(200).json(products)
    } catch (err) {
      return res.status(500).json({ success: false })
    }
  } else {
    res.send({
      error: 'Invalid method.'
    })
  }
}

export default handler
