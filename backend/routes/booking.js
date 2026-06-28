// ═══════════════════════════════════════
//  routes/booking.js — Réservation + Emails
// ═══════════════════════════════════════

const express = require('express');
const { Resend } = require('resend');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);
const BOOKINGS_FILE = path.join(__dirname, '../data/bookings.json');

function saveBooking(data) {
  try {
    const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
    bookings.unshift(data); // newest first
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch(e) { console.error('Save booking error:', e.message); }
}

/**
 * POST /api/booking
 * Body : { flight, searchParams, formData, payment }
 * 1. Envoie un email au client (sans PNR)
 * 2. Envoie un email à l'agence (avec toutes les infos pour ajouter le PNR)
 */
router.post('/', async (req, res) => {
  try {
    const { flight, searchParams, formData, payment } = req.body;

    if (!flight || !formData || !payment) {
      return res.status(400).json({ error: 'Données de réservation incomplètes' });
    }

    console.log(`[BOOKING] Nouvelle réservation — ${formData.contact.email} — PayPal ${payment.orderId}`);

    // ── Génération d'un ID de réservation interne ──
    const bookingRef = 'WS' + Date.now().toString(36).toUpperCase();

    // ── Formatage des données ──
    const seg0    = flight.itineraries[0].segments[0];
    const lastSeg = flight.itineraries[0].segments.at(-1);
    const depDate = new Date(seg0.departure.at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const depTime = new Date(seg0.departure.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const arrTime = new Date(lastSeg.arrival.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const stops   = flight.itineraries[0].segments.length - 1;

    const passengersTable = formData.passengers.map((p, i) => `
      <tr style="border-bottom:1px solid #e8ecf0">
        <td style="padding:10px 12px">${i + 1}</td>
        <td style="padding:10px 12px">${p.firstName} ${p.lastName}</td>
        <td style="padding:10px 12px">${p.dateOfBirth}</td>
        <td style="padding:10px 12px">${p.passportNumber}</td>
        <td style="padding:10px 12px">${p.passportExpiry}</td>
        <td style="padding:10px 12px">${p.nationality}</td>
      </tr>`).join('');

    // ══════════════════════════════
    //  EMAIL CLIENT (sans PNR)
    // ══════════════════════════════
    const clientEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:600px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0d1f35,#1e3d5c);padding:40px;text-align:center">
      <h1 style="color:white;margin:0;font-size:28px;font-weight:300;letter-spacing:6px">WHITE <span style="color:#a8cfe8">SKY</span></h1>
      <p style="color:#a8cfe8;margin:8px 0 0;font-size:13px;letter-spacing:2px">TRAVEL AGENCY</p>
    </div>

    <!-- Body -->
    <div style="padding:40px">
      <h2 style="color:#0d1f35;font-size:22px;font-weight:400;margin-bottom:8px">
        ✅ Votre réservation est confirmée !
      </h2>
      <p style="color:#666;font-size:15px;margin-bottom:28px">
        Bonjour <strong>${formData.passengers[0].firstName}</strong>,<br/>
        Nous avons bien reçu votre paiement. Voici le récapitulatif de votre réservation.
      </p>

      <!-- Ref -->
      <div style="background:#f0f7ff;border-left:4px solid #5ba4d4;padding:16px 20px;border-radius:6px;margin-bottom:28px">
        <p style="margin:0;color:#333;font-size:14px">Référence de réservation : <strong style="color:#1e3d5c;font-size:16px">${bookingRef}</strong></p>
        <p style="margin:6px 0 0;color:#888;font-size:12px">Conservez cette référence pour tout contact avec notre équipe.</p>
      </div>

      <!-- Vol -->
      <h3 style="color:#0d1f35;font-size:16px;border-bottom:2px solid #f0f4f8;padding-bottom:12px;margin-bottom:20px">Détails du vol</h3>

      <div style="display:flex;align-items:center;justify-content:space-between;background:#f8fafc;border-radius:8px;padding:20px 24px;margin-bottom:20px">
        <div style="text-align:center">
          <div style="font-size:32px;font-weight:300;color:#0d1f35">${seg0.departure.iataCode}</div>
          <div style="font-size:12px;color:#888;margin-top:4px">${depTime}</div>
        </div>
        <div style="text-align:center;color:#5ba4d4">
          <div style="font-size:20px">✈</div>
          <div style="font-size:11px;color:#aaa;margin-top:4px">${stops === 0 ? 'Direct' : stops + ' escale(s)'}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:32px;font-weight:300;color:#0d1f35">${lastSeg.arrival.iataCode}</div>
          <div style="font-size:12px;color:#888;margin-top:4px">${arrTime}</div>
        </div>
      </div>

      <table style="width:100%;font-size:14px;color:#444;margin-bottom:28px">
        <tr><td style="padding:6px 0;color:#888">Date :</td><td style="padding:6px 0"><strong>${depDate}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#888">Compagnie :</td><td style="padding:6px 0"><strong>${seg0.carrierCode} – Vol ${seg0.number}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#888">Classe :</td><td style="padding:6px 0"><strong>${searchParams?.cabinClass || 'ECONOMY'}</strong></td></tr>
      </table>

      <!-- Passagers -->
      <h3 style="color:#0d1f35;font-size:16px;border-bottom:2px solid #f0f4f8;padding-bottom:12px;margin-bottom:20px">Passagers</h3>
      ${formData.passengers.map(p => `
        <p style="margin:4px 0;font-size:14px;color:#333">• <strong>${p.firstName} ${p.lastName}</strong> — Passeport : ${p.passportNumber}</p>
      `).join('')}

      <!-- Paiement -->
      <div style="margin-top:28px;background:#f0fff4;border-left:4px solid #48bb78;padding:16px 20px;border-radius:6px">
        <p style="margin:0;font-size:14px;color:#333">Paiement reçu : <strong style="color:#276749">${payment.amount?.toFixed(2)} ${payment.currency}</strong></p>
        <p style="margin:6px 0 0;font-size:12px;color:#888">Confirmation PayPal : ${payment.orderId}</p>
      </div>

      <!-- PNR notice -->
      <div style="margin-top:24px;background:#fff8e6;border-left:4px solid #c9a84c;padding:16px 20px;border-radius:6px">
        <p style="margin:0;font-size:14px;color:#7a5c00">
          ⏳ <strong>Votre numéro de dossier (PNR)</strong> vous sera envoyé dans un email séparé 
          dans les <strong>24 heures ouvrées</strong>. Vous pourrez l'utiliser pour gérer votre 
          réservation directement auprès de la compagnie aérienne.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e8ecf0">
      <p style="margin:0;font-size:12px;color:#aaa">White Sky Travel Agency</p>
      <p style="margin:6px 0 0;font-size:12px;color:#aaa">
        Questions ? <a href="mailto:contact@whitesky.travel" style="color:#5ba4d4">contact@whitesky.travel</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    // ══════════════════════════════
    //  EMAIL AGENCE (toutes les infos)
    // ══════════════════════════════
    const agencyEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif">
  <div style="max-width:700px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">

    <div style="background:#c0392b;padding:24px 40px">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:600">🛫 NOUVELLE RÉSERVATION — À TRAITER</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:13px">Ref : <strong>${bookingRef}</strong> | Paiement reçu ✓</p>
    </div>

    <div style="padding:36px">

      <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:16px 20px;margin-bottom:28px">
        <p style="margin:0;font-size:15px;color:#856404">
          ⚠️ <strong>ACTION REQUISE :</strong> Ajouter le PNR manuellement et renvoyer un email au client 
          <strong>${formData.contact.email}</strong>
        </p>
      </div>

      <h3 style="color:#333;border-bottom:2px solid #eee;padding-bottom:10px">Vol réservé</h3>
      <table style="width:100%;font-size:14px;color:#444;margin-bottom:24px">
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Trajet</td><td style="padding:10px">${seg0.departure.iataCode} → ${lastSeg.arrival.iataCode}</td></tr>
        <tr><td style="padding:10px;font-weight:600">Date</td><td style="padding:10px">${depDate}</td></tr>
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Horaires</td><td style="padding:10px">Départ ${depTime} → Arrivée ${arrTime}</td></tr>
        <tr><td style="padding:10px;font-weight:600">Vol</td><td style="padding:10px">${seg0.carrierCode} ${seg0.number}</td></tr>
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Classe</td><td style="padding:10px">${searchParams?.cabinClass || 'ECONOMY'}</td></tr>
        <tr><td style="padding:10px;font-weight:600">Escales</td><td style="padding:10px">${stops === 0 ? 'Direct' : stops + ' escale(s)'}</td></tr>
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Nb passagers</td><td style="padding:10px">${formData.passengers.length}</td></tr>
      </table>

      <h3 style="color:#333;border-bottom:2px solid #eee;padding-bottom:10px">Passagers</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px">
        <thead>
          <tr style="background:#0d1f35;color:white">
            <th style="padding:10px 12px;text-align:left">#</th>
            <th style="padding:10px 12px;text-align:left">Nom</th>
            <th style="padding:10px 12px;text-align:left">Naissance</th>
            <th style="padding:10px 12px;text-align:left">Passeport</th>
            <th style="padding:10px 12px;text-align:left">Expiration</th>
            <th style="padding:10px 12px;text-align:left">Nationalité</th>
          </tr>
        </thead>
        <tbody>${passengersTable}</tbody>
      </table>

      <h3 style="color:#333;border-bottom:2px solid #eee;padding-bottom:10px">Contact client</h3>
      <table style="width:100%;font-size:14px;color:#444;margin-bottom:24px">
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Email</td><td style="padding:10px"><a href="mailto:${formData.contact.email}">${formData.contact.email}</a></td></tr>
        <tr><td style="padding:10px;font-weight:600">Téléphone</td><td style="padding:10px">${formData.contact.phone}</td></tr>
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Pays</td><td style="padding:10px">${formData.contact.country}</td></tr>
        ${formData.remarks ? `<tr><td style="padding:10px;font-weight:600">Remarques</td><td style="padding:10px">${formData.remarks}</td></tr>` : ''}
      </table>

      <h3 style="color:#333;border-bottom:2px solid #eee;padding-bottom:10px">Paiement</h3>
      <table style="width:100%;font-size:14px;color:#444;margin-bottom:24px">
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Montant</td><td style="padding:10px"><strong style="color:#27ae60;font-size:16px">${payment.amount?.toFixed(2)} ${payment.currency}</strong></td></tr>
        <tr><td style="padding:10px;font-weight:600">Statut PayPal</td><td style="padding:10px"><span style="background:#d4edda;color:#155724;padding:3px 10px;border-radius:20px;font-size:12px">${payment.status}</span></td></tr>
        <tr style="background:#f8f9fa"><td style="padding:10px;font-weight:600">Order ID PayPal</td><td style="padding:10px;font-family:monospace">${payment.orderId}</td></tr>
      </table>

      <div style="background:#e8f5e9;border:2px dashed #4caf50;border-radius:8px;padding:24px;text-align:center">
        <p style="margin:0 0 8px;font-size:14px;color:#333;font-weight:600">📋 Étapes suivantes :</p>
        <p style="margin:0;font-size:13px;color:#555">
          1. Émettre le billet dans votre GDS (Galileo / Amadeus / Sabre) avec les informations ci-dessus<br/>
          2. Copier le PNR obtenu<br/>
          3. Répondre au client <strong>${formData.contact.email}</strong> avec le PNR et son e-billet
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // ── Envoi des deux emails en parallèle ──
    const [clientResult, agencyResult] = await Promise.allSettled([
      resend.emails.send({
        from:    process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to:      formData.contact.email,
        subject: `✈ Confirmation White Sky — ${seg0.departure.iataCode} → ${lastSeg.arrival.iataCode} | Réf. ${bookingRef}`,
        html:    clientEmailHtml
      }),
      resend.emails.send({
        from:    process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to:      process.env.AGENCY_EMAIL,
        subject: `🛫 NOUVELLE RÉSERVATION ${bookingRef} — ${seg0.departure.iataCode}→${lastSeg.arrival.iataCode} | ${payment.amount?.toFixed(2)}${payment.currency} ✓`,
        html:    agencyEmailHtml
      })
    ]);

    // Log les résultats
    if (clientResult.status === 'fulfilled') {
      console.log(`[EMAIL] Client OK → ${formData.contact.email}`);
    } else {
      console.error('[EMAIL] Client FAIL:', clientResult.reason);
    }
    if (agencyResult.status === 'fulfilled') {
      console.log(`[EMAIL] Agence OK → ${process.env.AGENCY_EMAIL}`);
    } else {
      console.error('[EMAIL] Agence FAIL:', agencyResult.reason);
    }

    // Save booking to file
    saveBooking({
      ref: bookingRef,
      date: new Date().toISOString(),
      route: `${seg0.departure.iataCode} → ${lastSeg.arrival.iataCode}`,
      flight: `${seg0.carrierCode} ${seg0.number}`,
      depDate,
      passengers: formData.passengers.map(p => `${p.firstName} ${p.lastName}`),
      contact: formData.contact,
      amount: payment.amount,
      currency: payment.currency,
      paypalId: payment.orderId,
      status: payment.status
    });

    res.json({
      success:    true,
      bookingRef,
      message:    'Réservation confirmée. Emails envoyés.'
    });

  } catch (err) {
    console.error('[BOOKING ERROR]', err);
    res.status(500).json({ error: err.message || 'Erreur lors de la réservation' });
  }
});

module.exports = router;

