import type { Response } from 'express'
import { User } from '../models/user'
import type { AuthRequest } from '../middleware/auth'

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    return res.json({ success: true, data: { _id: user._id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified } })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to fetch profile' })
  }
}

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.user?.id, { $set: req.body }, { new: true }).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    return res.json({ success: true, data: { _id: user._id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified } })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to update profile' })
  }
}
