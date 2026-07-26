import { Router } from 'express'
import { createWardrobeItem, deleteWardrobeItem, listWardrobe, updateWardrobeItem } from '../controllers/wardrobe.controller'
import { protect } from '../middleware/auth'

const router = Router()

router.get('/', protect, listWardrobe)
router.post('/', protect, createWardrobeItem)
router.put('/:id', protect, updateWardrobeItem)
router.delete('/:id', protect, deleteWardrobeItem)

export default router
