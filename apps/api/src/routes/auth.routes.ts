import { Router } from 'express'
import { forgotPassword, login, refresh, register, verifyOtp } from '../controllers/auth.controller'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)

export default router
