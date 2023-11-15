import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { restaurantRoutes } from './routes/restaurant'
import { productsRoutes } from './routes/products'
import { resolve } from 'path'
import { uploadRoutes } from './routes/upload'
import { favoriteRestaurantsRoutes } from './routes/favorite_restaurant'
import { ordersRoutes } from './routes/orders'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(jwt, {
  secret: 'ASIDJASOIJDASIOJDSAIJJSIAJDASIJDASIDJSIA',
})


app.register(authRoutes)
app.register(userRoutes)
app.register(restaurantRoutes)
app.register(productsRoutes)
app.register(uploadRoutes)
app.register(favoriteRestaurantsRoutes)
app.register(ordersRoutes)


app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
