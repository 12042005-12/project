import mongoose from 'mongoose'
import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/make-it-wear-it'

    await mongoose.connect(mongoURI)

    logger.info('MongoDB connected successfully')
  } catch (error) {
    logger.error('MongoDB connection error:', error)
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    logger.info('MongoDB disconnected successfully')
  } catch (error) {
    logger.error('MongoDB disconnection error:', error)
  }
}
