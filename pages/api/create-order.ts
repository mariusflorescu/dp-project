import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session?.role) {
    if (req.method === 'POST') {
      try {
        const { uid } = session
        const { order } = req.body
        const { items, total } = order

        const { id: orderId } = await prisma.order.create({
          data: {
            userId: uid as string,
            total: total
          }
        })

        for (const item of items) {
          // add product to order
          await prisma.productOrders.create({
            data: {
              orderId,
              productId: item.id,
              quantity: item.quantity
            }
          })

          // then update its quantity
          await prisma.product.update({
            where: {
              id: item.id
            },
            data: {
              quantity: item.productMaxQuantity - item.quantity
            }
          })
        }

        return res.status(201).json({ success: true })
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
