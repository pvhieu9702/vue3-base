const express = require('express')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret'

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Kết nối SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
	if (err) console.error('Lỗi kết nối DB:', err.message)
	else console.log('Kết nối SQLite thành công!')
})

// Tạo bảng users
db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      gender TEXT CHECK(gender IN ('male', 'female', 'other')) NOT NULL,
      age INTEGER NOT NULL CHECK(age > 0),
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

// Middleware: Xác thực token
const authenticateToken = (req, res, next) => {
	const token = req.header('Authorization')
	if (!token) return res.status(401).json({ message: 'Token không hợp lệ' })

	jwt.verify(token.replace('Bearer ', ''), ACCESS_SECRET, (err, user) => {
		if (err) return res.status(401).json({ message: 'Token hết hạn hoặc sai' })
		req.user = user
		next()
	})
}

// Tạo access token và refresh token
const generateTokens = (user) => {
	const accessToken = jwt.sign(
		{ id: user.id, username: user.username },
		ACCESS_SECRET,
		{ expiresIn: '10s' },
	)
	const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
		expiresIn: '10s',
	})

	return { accessToken, refreshToken }
}

// API: Đăng ký
app.post('/api/register', async (req, res) => {
	const { username, email, gender, age, password } = req.body
	if (!username || !email || !gender || !age || !password) {
		return res.status(400).json({ message: 'Thiếu thông tin' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	db.run(
		'INSERT INTO users (username, email, gender, age, password) VALUES (?, ?, ?, ?, ?)',
		[username, email, gender, age, hashedPassword],
		function (err) {
			if (err) return res.status(500).json({ error: err.message })
			res.json({ message: 'Đăng ký thành công', userId: this.lastID })
		},
	)
})

// API: Đăng nhập
app.post('/api/login', (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({ message: 'Vui lòng nhập email và password' })
	}

	db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
		if (err) return res.status(500).json({ error: err.message })
		if (!user)
			return res.status(400).json({ message: 'Tài khoản không tồn tại' })

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' })

		const tokens = generateTokens(user)
		res.json(tokens)
	})
})

// API: Refresh token
app.post('/api/refresh', (req, res) => {
	const { refreshToken } = req.body
	if (!refreshToken)
		return res.status(401).json({ message: 'Refresh token không hợp lệ' })

	jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({ message: 'Refresh token hết hạn hoặc sai' })

		const tokens = generateTokens(user)
		res.json(tokens)
	})
})

// API: Đăng xuất
app.post('/api/logout', (req, res) => {
	res.json({ message: 'Đăng xuất thành công' })
})

// API: Lấy danh sách users với bộ lọc và phân trang
app.get('/api/users', authenticateToken, (req, res) => {
	const { username, email, gender, age, limit = 10, page = 1 } = req.query

	const perPage = parseInt(limit) || 10
	const currentPage = parseInt(page) || 1
	const offset = (currentPage - 1) * perPage

	let query = `SELECT id, username, email, gender, age, created_at FROM users WHERE 1=1`
	let countQuery = `SELECT COUNT(*) as total FROM users WHERE 1=1`
	let params = []
	let countParams = []

	// Tìm kiếm theo username hoặc email
	if (username) {
		query += ` AND username LIKE ?`
		countQuery += ` AND username LIKE ?`
		params.push(`%${username}%`)
		countParams.push(`%${username}%`)
	}

	if (email) {
		query += ` AND email LIKE ?`
		countQuery += ` AND email LIKE ?`
		params.push(`%${email}%`)
		countParams.push(`%${email}%`)
	}

	// Lọc theo giới tính
	if (gender) {
		query += ` AND gender = ?`
		countQuery += ` AND gender = ?`
		params.push(gender)
		countParams.push(gender)
	}

	// Lọc theo tuổi
	if (age) {
		query += ` AND age = ?`
		params.push(age)
		countParams.push(age)
	}

	// Sắp xếp theo ngày tạo mới nhất
	query += ` ORDER BY created_at DESC`

	// Phân trang
	query += ` LIMIT ? OFFSET ?`
	console.log(query)

	params.push(perPage, offset)

	// Lấy tổng số bản ghi trước khi lấy dữ liệu
	db.get(countQuery, countParams, (err, result) => {
		if (err) return res.status(500).json({ error: err.message })

		const total = result?.total || 0
		const totalPages = Math.ceil(total / perPage)

		// Lấy dữ liệu users
		db.all(query, params, (err, rows) => {
			if (err) return res.status(500).json({ error: err.message })

			res.json({
				data: rows,
				page: currentPage,
				per_page: perPage,
				total: total,
				total_pages: totalPages,
			})
		})
	})
})

// API: Lấy user theo ID
app.get('/api/users/:id', authenticateToken, (req, res) => {
	const { id } = req.params
	db.get(
		'SELECT id, username, email, gender, age, created_at FROM users WHERE id = ?',
		[id],
		(err, user) => {
			if (err) return res.status(500).json({ error: err.message })
			if (!user) return res.status(404).json({ message: 'User không tồn tại' })
			res.json(user)
		},
	)
})

// API: Cập nhật user
app.put('/api/users/:id', authenticateToken, (req, res) => {
	const { id } = req.params
	const { username, email, gender, age } = req.body
	db.run(
		'UPDATE users SET username = ?, email = ?, gender = ?, age = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
		[username, email, gender, age, id],
		function (err) {
			if (err) return res.status(500).json({ error: err.message })
			if (this.changes === 0)
				return res.status(404).json({ message: 'User không tồn tại' })
			res.json({ message: 'Cập nhật thành công' })
		},
	)
})

// API: Xóa user
app.delete('/api/users/:id', authenticateToken, (req, res) => {
	const { id } = req.params
	db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
		if (err) return res.status(500).json({ error: err.message })
		if (this.changes === 0)
			return res.status(404).json({ message: 'User không tồn tại' })
		res.json({ message: 'Xóa thành công' })
	})
})

// Khởi động server
app.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`)
})
