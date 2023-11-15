import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/order', async(request) => {
    const bodySchema = z.object({
      user_id: z.string(),
      name: z.string(),
      qtd: z.number(),
      priceTotal: z.number(),
      restaurant_id: z.string()
    })

    const body = bodySchema.parse(request.body)

    const { user_id, priceTotal, name, qtd, restaurant_id } = body

    await prisma.orders.create({
      data: {
        user_id,
        price: priceTotal,
        product_name: name,
        restaurant_id,
        quantity: qtd
      }
    })
  })

  app.get('/orders/:restaurant_id', async(request) => {
    const paramsSchema = z.object({
      restaurant_id: z.string(),
    })

    const params = paramsSchema.parse(request.params)

    const { restaurant_id } = params

    const orders = await prisma.orders.findMany({
      where: {
        restaurant_id
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  })

  app.get('/user-orders/:user_id', async(request) => {
    const paramsSchema = z.object({
      user_id: z.string(),
    })

    const params = paramsSchema.parse(request.params)

    const { user_id } = params

    const orders = await prisma.orders.findMany({
      where: {
        user_id
      },
      include: {
        restaurant: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  })
}