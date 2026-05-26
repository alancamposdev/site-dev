import prisma from '../database/prisma.js'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return res.status(200).json({
        message: 'Usuários listados com sucesso!',
        total: users.length,
        users
    })
}

export const getUserById = async (req, res) => {
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    })

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    return res.status(200).json({ user })
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const userExists = await prisma.user.findUnique({
        where: { id }
    })

    if (!userExists) {
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    const data = {}

    if (name) data.name = name
    if (email) data.email = email
    if (password) data.password = await bcrypt.hash(password, 10)

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado para atualizar!' })
    }

    const user = await prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            updatedAt: true
        }
    })

    return res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        user
    })
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    const userExists = await prisma.user.findUnique({
        where: { id }
    })

    if (!userExists) {
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    await prisma.user.delete({
        where: { id }
    })

    return res.status(200).json({ message: 'Usuário deletado com sucesso!' })
}