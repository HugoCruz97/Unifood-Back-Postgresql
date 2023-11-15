import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signin', async (request) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(1)
    })


    const userInfo = userSchema.parse(request.body)
    
    const hashedPassword = await bcrypt.hash(userInfo.password, 10)

    await prisma.user.create({
      data: {
        email: userInfo.email,
        name: userInfo.name,
        password: hashedPassword
      }
    })
  })

  app.put('/user/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      // password: z.string().min(1)
    })

    const { email, name } = bodySchema.parse(request.body)

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (id !== request.user.sub) {
      return reply.status(401).send()
    }

    user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    })

    return user
  })

  app.get('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    })

    return user
  })
}