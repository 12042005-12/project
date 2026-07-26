import type { Response } from 'express'
import { Recommendation } from '../models/recommendation'
import type { AuthRequest } from '../middleware/auth'

export const listRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const items = await Recommendation.find({ userId: req.user?.id }).sort({ createdAt: -1 })
    return res.json({ success: true, data: items })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to fetch recommendations' })
  }
}

export const createRecommendation = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Recommendation.create({
      userId: req.user?.id,
      title: req.body.title || 'Fresh outfit idea',
      description: req.body.description || 'A polished everyday look.',
      tag: req.body.tag || 'Style',
      occasion: req.body.occasion,
    })

    return res.status(201).json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to create recommendation' })
  }
}
