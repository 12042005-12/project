import type { Response } from 'express'
import { WardrobeItem } from '../models/wardrobe-item'
import type { AuthRequest } from '../middleware/auth'

export const listWardrobe = async (req: AuthRequest, res: Response) => {
  try {
    const items = await WardrobeItem.find({ userId: req.user?.id }).sort({ createdAt: -1 })
    return res.json({ success: true, data: items })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to fetch wardrobe' })
  }
}

export const createWardrobeItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await WardrobeItem.create({
      userId: req.user?.id,
      name: req.body.name || 'Untitled item',
      category: req.body.category || 'General',
      color: req.body.color || 'Neutral',
      favorite: Boolean(req.body.favorite),
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      tags: req.body.tags || [],
    })

    return res.status(201).json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to create wardrobe item' })
  }
}

export const updateWardrobeItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await WardrobeItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { $set: req.body },
      { new: true }
    )

    if (!item) {
      return res.status(404).json({ success: false, message: 'Wardrobe item not found' })
    }

    return res.json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to update wardrobe item' })
  }
}

export const deleteWardrobeItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await WardrobeItem.findOneAndDelete({ _id: req.params.id, userId: req.user?.id })
    if (!item) {
      return res.status(404).json({ success: false, message: 'Wardrobe item not found' })
    }

    return res.json({ success: true, message: 'Wardrobe item deleted' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Failed to delete wardrobe item' })
  }
}
