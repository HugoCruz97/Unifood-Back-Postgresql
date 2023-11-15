import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  
  app.post('/products', async (request, reply) => {
    const productsSchema = z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      description: z.string(),
      restaurant_id: z.string()
    })


    const productsInfo = productsSchema.parse(request.body)

    const products = await prisma.products.create({
      data: {
        name: productsInfo.name,
        price: productsInfo.price,
        quantity: productsInfo.quantity,
        description: productsInfo.description,
        restaurant_id: productsInfo.restaurant_id
      }
    })

    if (products) {
      return products
    } else {
      reply.status(500).send({message: "Erro ao cadastrar os produtos!"})
    }

  })

  app.get('/products/:restaurant_id', async (request) => {
    const paramsSchema = z.object({
      restaurant_id: z.string()
    })

    const { restaurant_id } = paramsSchema.parse(request.params)

    const products = await prisma.products.findMany({
      where: {
        restaurant_id: restaurant_id
      }
    })

    return products
  })

  app.put('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      description: z.string()
    })

    const { name, price, quantity, description } = bodySchema.parse(request.body)

    const product = await prisma.products.update({
      where: {
        id: id
      },
      data: {
        name,
        price,
        quantity,
        description
      }
    })

    return product
  })

  app.delete('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.products.delete({
      where: {
        id: id
      }
    })
  })
}