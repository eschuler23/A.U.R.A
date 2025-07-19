const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const DATA_FILE = path.join(__dirname, 'logs.json')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

app.get('/logs', (req, res) => {
  const data = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : []
  res.json(data)
})

app.post('/logs', (req, res) => {
  const log = req.body
  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : []
  existing.push(log)
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2))
  res.status(201).json({ success: true })
})

app.post('/upload', upload.single('image'), (req, res) => {
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`
  res.status(201).json({ imageUrl: fileUrl })
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
