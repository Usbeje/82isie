import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Exp } from './index.js' // ini WA socket kamu dari index.js

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Endpoint kirim pesan dari frontend
app.post('/send-message', async (req, res) => {
  const { number, message } = req.body
  try {
    await Exp.sendMessage(number + '@s.whatsapp.net', { text: message })
    res.json({ message: 'Pesan berhasil dikirim!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengirim pesan.' })
  }
})

app.listen(PORT, () => {
  console.log(`Frontend jalan di http://localhost:${PORT}`)
})
