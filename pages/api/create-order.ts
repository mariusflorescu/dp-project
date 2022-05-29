import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

const emailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

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

        const emailDetails = {
          from: 'upt.dp.ecommerce@gmail.com',
          to: user?.email as string,
          subject: 'Your order has been placed!',
          text: `Hello, ${user?.name}, your order with a total of ${total}$ has been placed!`
        }

        await emailTransport.sendMail(emailDetails)

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
