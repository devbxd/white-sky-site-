// ═══════════════════════════════════════════════
//  WHITE SKY — server.js
//  Express backend : Amadeus + Resend + PayPal
// ═══════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const flightsRouter = require('./routes/flights');
const bookingRouter = require('./routes/booking');
const adminRouter  = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000'
  ]
}));
app.use(express.json({ limit: '5mb' }));

// ── Routes ──
app.use('/api/flights', flightsRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin',  adminRouter);

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'White Sky API', version: '1.0.0' });
});

// ── Erreur 404 ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

// ── Erreur globale ──
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: err.message || 'Erreur serveur' });
});

app.listen(PORT, () => {
  console.log(`\n✈  White Sky Backend démarré sur http://localhost:${PORT}`);
  console.log(`   Amadeus env : ${process.env.AMADEUS_ENV || 'test'}`);
  console.log(`   Resend from : ${process.env.FROM_EMAIL || 'non configuré'}`);
  console.log(`   Agency mail : ${process.env.AGENCY_EMAIL || 'non configuré'}\n`);
});

