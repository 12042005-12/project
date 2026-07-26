import { Router } from 'express'
import { protect } from '../middleware/auth'

const router = Router()

router.post('/', protect, (req, res) => {
  res.status(201).json({ success: true, data: { _id: 'upload-demo', name: 'Uploaded item', category: 'General', color: 'Neutral', favorite: false, imageUrl: req.body.imageUrl || '' } })
})

export default router
