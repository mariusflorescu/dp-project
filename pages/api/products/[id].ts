import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const products = await prisma.product.findUnique({
        where: {
          id: id as string
        },
        select: {
          id: true,
          name: true,
          description: true,
          quantity: true,
          price: true,
          imageURL: true,
          user: {
            select: {
              name: true
            }
          }
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
