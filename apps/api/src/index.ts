import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import pino from 'pino'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api', limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Make-It-Wear-It API',
      version: '1.0.0',
      description: 'AI Powered Personal Fashion Stylist and Virtual Try-On Platform API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Make-It-Wear-It API is running' })
})

// API routes (to be added)
// app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/profiles', profileRoutes)
// app.use('/api/wardrobe', wardrobeRoutes)
// app.use('/api/recommendations', recommendationRoutes)
// app.use('/api/tryon', tryOnRoutes)
// app.use('/api/chat', chatRoutes)

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err)
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500,
    },
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`)
})

export default app
