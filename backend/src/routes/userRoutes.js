import { Router } from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getAllUsers)
router.get('/:id', authenticate, authorizeAdmin, getUserById)
router.put('/:id', authenticate, authorizeAdmin, updateUser)
router.delete('/:id', authenticate, authorizeAdmin, deleteUser)

export default router