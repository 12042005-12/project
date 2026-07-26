import { Router } from 'express'
import { createRecommendation, listRecommendations } from '../controllers/recommendation.controller'
import { protect } from '../middleware/auth'

const router = Router()

router.get('/', protect, listRecommendations)
router.post('/', protect, createRecommendation)

export default router
