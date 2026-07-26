import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

const signTokens = (user: { _id?: { toString(): string }; role: string }) => {
  const userId = user._id?.toString() || ''
  const accessToken = jwt.sign({ id: userId, role: user.role }, process.env.JWT_SECRET || 'dev-secret')
  const refreshToken = jwt.sign({ id: userId, role: user.role }, process.env.JWT_REFRESH_SECRET || 'dev-secret-refresh')
  return { accessToken, refreshToken }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })
    const tokens = signTokens(user)

    return res.status(201).json({ success: true, data: { user: { _id: user._id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified }, ...tokens } })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Registration failed' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const tokens = signTokens(user)
    return res.json({ success: true, data: { user: { _id: user._id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified }, ...tokens } })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Login failed' })
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'dev-secret-refresh') as { id: string; role: string }
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' })
    }

    const tokens = signTokens(user)
    return res.json({ success: true, data: { ...tokens } })
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid refresh token' })
  }
}

export const forgotPassword = async (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Password reset is not configured yet' })
}

export const verifyOtp = async (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'OTP verification is not configured yet' })
}
