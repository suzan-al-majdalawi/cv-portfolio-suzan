const express = require('express')

try {
  process.loadEnvFile()
} catch {
  // .env används lokalt.
  // I Render kommer variablerna från environment.
}

const app = express()

app.use(express.json())


// =========================================
// CORS
// =========================================

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  )

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})


// =========================================
// Health check
// =========================================

app.get('/healthz', (req, res) => {
  res.json({
    status: 'ok',
    service: 'portfolio-api'
  })
})


// =========================================
// API authentication
// =========================================

const apiKey = process.env.API_KEY

if (!apiKey) {
  console.error('API_KEY saknas')
  process.exit(1)
}

app.use('/api', (req, res, next) => {

  const receivedKey = req.get('X-Api-Key')

  if (!receivedKey || receivedKey !== apiKey) {

    console.log(
      `401 ${req.method} ${req.originalUrl}`
    )

    return res.status(401).json({
      error: 'Saknad eller ogiltig API-nyckel'
    })
  }

  next()
})


// =========================================
// API routes
// =========================================

// Exempel
app.get('/api/v1/test', (req, res) => {
  res.json({
    message: 'Portfolio API fungerar'
  })
})


// Lägg dina riktiga routes här:
// app.use('/api/v1/profile', profileRoutes)
// app.use('/api/v1/projects', projectRoutes)
// app.use('/api/v1/contact', contactRoutes)


// =========================================
// Error handler
// =========================================

app.use((err, req, res, next) => {

  console.error(err)

  res.status(500).json({
    error: 'Internal server error'
  })
})


// =========================================
// Server
// =========================================

const port = process.env.PORT || 4000

app.listen(port, () => {

  console.log(
    `Portfolio API running on port ${port}`
  )

})