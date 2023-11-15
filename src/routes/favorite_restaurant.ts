import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function favoriteRestaurantsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/favorite-restaurant', async(request) => {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      restaurant_id: z.string().uuid()
    })

    const body = bodySchema.parse(request.body)

    const { user_id, restaurant_id } = body

    const restaurant_favorite = prisma.favorite_Restaurant.create({
      data: {
        user_id,
        restaurant_id
      }
    })

    return restaurant_favorite
  })

  app.get('/favorite-restaurant/:user_id', async(request) => {
    const userIdSchema = z.object({
      user_id: z.string()
    })

    const userID = userIdSchema.parse(request.params)

    const { user_id } = userID

    const favoriteRestaurants = prisma.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        Favorite_Restaurant: true
      }
    })

    return favoriteRestaurants
  })
}