const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/authMiddleware')

// anyone logged in
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Your profile', user: req.user })
})

// only admin can access
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin panel access granted' })
})

// multiple roles
router.get('/manager-section', authenticate, authorize('admin','manager'), (req,res)=>{
  res.json({ message: 'Manager section access granted' })
})

module.exports = router