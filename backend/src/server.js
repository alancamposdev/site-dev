import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando!' })
})

// Middleware global de erros
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Erro interno do servidor!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))