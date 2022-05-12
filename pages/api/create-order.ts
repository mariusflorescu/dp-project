import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
// import sgMail from '@sendgrid/mail'
// import { getEmailOptions } from '../../lib/email'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session?.role) {
    if (req.method === 'POST') {
      try {
        const { uid, user } = session!
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

        // sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string)
        // await sgMail.send(
        //   getEmailOptions(user?.email as string, user?.name as string, total)
        // )

        return res.status(201).json({ success: true })
      } catch (err) {
        console.log(err)

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
