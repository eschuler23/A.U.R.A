const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

const DATA_FILE = path.join(__dirname, 'logs.json')

// Logs abrufen (GET)
app.get('/logs', (req, res) => {
  const data = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : []
  res.json(data)
})

// Log speichern (POST)
app.post('/logs', (req, res) => {
  const log = req.body
  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : []
  existing.push(log)
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2))
  res.status(201).json({ success: true })
})

// Log aktualisieren (PUT)
app.put('/logs/:date', (req, res) => {
  const { date } = req.params
  const updatedLog = req.body

  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : []

  // Remove all entries with the same date to avoid duplicates
  const filteredLogs = existing.filter(log => log.date !== date)

  // Add the updated log
  filteredLogs.push(updatedLog)

  fs.writeFileSync(DATA_FILE, JSON.stringify(filteredLogs, null, 2))
  res.json({ success: true })
})

app.listen(3001, () => {
  console.log('Server läuft auf http://localhost:3001')
})
