const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const DATA_FILE = path.join(__dirname, '../data/bookings.json');
const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
if (!fs.existsSync(SETTINGS_FILE)) fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ discount: 0, password: 'whitesky2025' }));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'whitesky2025';

// Helper
function readBookings() { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
function readSettings() { return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')); }
function saveSettings(s) { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(s)); }

// GET /api/admin/discount — public, used by search
router.get('/discount', (req, res) => {
  const s = readSettings();
  res.json({ discount: s.discount || 0 });
});

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: Buffer.from(ADMIN_PASSWORD).toString('base64') });
  } else {
    res.status(401).json({ error: 'Wrong password' });
  }
});

// Middleware — check token
function auth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || Buffer.from(token, 'base64').toString() !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/admin/bookings
router.get('/bookings', auth, (req, res) => {
  res.json(readBookings());
});

// POST /api/admin/settings — update discount %
router.post('/settings', auth, (req, res) => {
  const { discount } = req.body;
  const s = readSettings();
  s.discount = parseFloat(discount) || 0;
  saveSettings(s);
  res.json({ success: true, discount: s.discount });
});

module.exports = router;
module.exports.readBookings = readBookings;
module.exports.readSettings = readSettings;
