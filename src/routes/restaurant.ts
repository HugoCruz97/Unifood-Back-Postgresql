import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function restaurantRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/new-restaurant', async (request, reply) => {
    const restaurantSchema = z.object({
      name: z.string(),
      address: z.string(),
      logoUrl: z.string(),
      cep: z.string(),
      description: z.string()
      // contact_number: z.string()
    })


    const restaurantInfo = restaurantSchema.parse(request.body)

    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantInfo.name,
        logoUrl: restaurantInfo.logoUrl,
        address: restaurantInfo.address,
        cep: restaurantInfo.cep,
        description: restaurantInfo.description,
        contact_number: '(21) 99999-9999',
        user_id: request.user.sub
      }
    })

    if (restaurant) {
      await prisma.user.update({
        where: {
          id: request.user.sub
        },
        data: {
          hasRestaurant: true
        }
      })
      return restaurant
      
    } else {
      reply.status(500).send({message: "Erro ao criar restaurante!"})
    }

  })

  app.get('/restaurant/:user_id', async (request) => {
    const userIdSchema = z.object({
      user_id: z.string()
    })

    const userID = userIdSchema.parse(request.params)

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        user_id: userID.user_id
      },
      include: {
        Products: true
      }
    })

    return restaurant
  })

  app.get('/list-restaurant/:id', async (request) => {

    const userIdSchema = z.object({
      id: z.string()
    })

    const userID = userIdSchema.parse(request.params)

    const { id } = userID

    const restaurants = await prisma.restaurant.findMany({
      where:{
        NOT: {
          user_id: id
        }
      },
      include:{
        Products: true
      }
      ,orderBy: {
        createdAt: 'asc'
      }
    })

    return restaurants
  })

  app.put('/restaurant/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      address: z.string(),
      logoUrl: z.string(),
      cep: z.string(),
      description: z.string(),
      contact_number: z.string(),
    })

    const { address, cep, contact_number, description, logoUrl, name } = bodySchema.parse(request.body)

    let restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (restaurant.user_id !== request.user.sub) {
      return reply.status(401).send()
    }

    restaurant = await prisma.restaurant.update({
      where: {
        id
      },
      data:{
        address,
        cep,
        contact_number,
        description,
        logoUrl,
        name
      }
    })

    return restaurant
  })

  app.delete('/restaurant/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.restaurant.delete({
      where: {
        id: id
      }
    })
  })

  app.post('/filter', async (request) => {
    const filterSchema = z.object({
      nome: z.string().optional(),
      id: z.string()
    })

    const filterData = filterSchema.parse(request.body)

    const { nome, id } = filterData

    const restaurants = prisma.restaurant.findMany({
      where: {
        name: {
          contains: nome
        },
        AND: {
          NOT: {
            user_id: id
          }
        }
      }
    })

    return restaurants

  })
}