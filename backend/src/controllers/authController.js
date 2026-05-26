import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../database/prisma.js'

export const register = async (req, res) => {
    const { name, email, password } = req.body


    // validações
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios!' })
    }

    const userExists = await prisma.user.findUnique({
        where: { email }
    })

    if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado!' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    })

    return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    // validar para evitar erros e quebra da aplicação
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' })
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos!' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos!' })
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    return res.status(200).json({
        message: 'Login realizado com sucesso!',
        token
    })
}