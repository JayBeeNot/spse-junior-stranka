const express = require('express')
const router = express.Router()
const { verifyUser, createUser } = require('../auth')
const jwt = require('jsonwebtoken')
const { validateEmail, validatePassword } = require('../validators')
const db = require('../db')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'
const JWT_EXPIRES = '2h'

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await verifyUser(email, password)
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    // create token with role
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
    res.json({ token, user: { uuid: user.uuid, full_name: user.full_name, email: user.email, role: user.role } })
})

// register route
router.post('/register', async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body

        if (!full_name || typeof full_name !== 'string') {
            return res.status(400).json({ message: 'Full name is required' })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' })
        }

        const newUser = await createUser({ full_name, email, password, role })
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
        return res.status(201).json({ token, user: { uuid: newUser.uuid, full_name: newUser.full_name, email: newUser.email, role: newUser.role } })
    } catch (err) {
        return res.status(500).json({ message: 'Registration failed', error: err.message })
    }
})

// debug route: check presence and password match without issuing token
router.post('/debug-user', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) return res.status(400).json({ message: 'email required' })

        const { rows } = await db.query('select id,email,password_hash from users where lower(email)=lower($1)', [email])
        if (!rows.length) return res.json({ found: false })

        const user = rows[0]
        const bcrypt = require('bcrypt')
        const ok = await bcrypt.compare(password || '', user.password_hash)
        return res.json({ found: true, passwordMatches: ok, email: user.email })
    } catch (err) {
        return res.status(500).json({ message: 'debug failed', error: err.message })
    }
})

module.exports = router