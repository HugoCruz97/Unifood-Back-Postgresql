import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const userSchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = userSchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        Favorite_Restaurant: true
      }
    })

    if (!user) {
      reply.status(404).send({message: "Usuário não encontrado"})
    }

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user?.password)
      if (passwordMatch) {
        const token = app.jwt.sign(
          {
            name: user.name,
            email: user.email,
          },
          {
            sub: user.id,
            expiresIn: '30 days',
          },
        )
        return {
          token, user
        }
      } else {
        reply.status(500).send({message: "Usuário ou senha incorretos"})
      }
    }
  })
}