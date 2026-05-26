import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
import { authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/dashboard', authenticate, authorizeAdmin, (req, res) => {
    res.json({
        message: 'Bem vindo à área admin!',
        user: req.user
    })
})

export default router