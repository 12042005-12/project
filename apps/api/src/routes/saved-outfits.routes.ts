import { Router } from 'express'
import { protect } from '../middleware/auth'

const router = Router()

router.get('/', protect, (_req, res) => {
  res.json({ success: true, data: [] })
})
router.post('/', protect, (_req, res) => {
  res.status(201).json({ success: true, data: { _id: 'saved-outfit-demo', title: 'Saved outfit', description: 'Your saved style', tag: 'Saved' } })
})
router.delete('/:id', protect, (_req, res) => {
  res.json({ success: true, message: 'Saved outfit removed' })
})

export default router
