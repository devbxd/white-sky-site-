const express = require('express');
const router  = express.Router();

const HASDATA_KEY = process.env.HASDATA_API_KEY;

// GET /api/flights?from=CDG&to=DXB&date=2026-08-01&adults=1&cabinClass=ECONOMY
router.get('/', async (req, res) => {
  try {
    const { from, to, date, adults = '1', cabinClass = 'ECONOMY', returnDate } = req.query;

    if (!from || !to || !date)
      return res.status(400).json({ error: 'Missing params: from, to, date' });

    console.log(`[SEARCH] ${from} → ${to} | ${date} | ${adults} pax | ${cabinClass}`);

    // Classe HasData : 1=Economy 2=PremiumEconomy 3=Business 4=First
    const classMap = { ECONOMY:'1', PREMIUM_ECONOMY:'2', BUSINESS:'3', FIRST:'4' };
    const travelClass = classMap[cabinClass] || '1';

    const params = new URLSearchParams({
      departureId:  from,
      arrivalId:    to,
      outboundDate: date,
      adults:       adults,
      travelClass:  travelClass,
      currency:     'KWD',
      hl:           'en',
      ...(returnDate ? { returnDate: returnDate, type: '1' } : { type: '2' })
    });

    const url = `https://api.hasdata.com/scrape/google/flights?${params}`;

    const response = await fetch(url, {
      headers: {
        'x-api-key': HASDATA_KEY,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[HASDATA ERROR]', data);
      return res.status(400).json({ error: data.message || 'HasData error' });
    }

    // HasData retourne best_flights et other_flights
    const rawFlights = [
      ...(data.bestFlights || data.best_flights || []),
      ...(data.otherFlights || data.other_flights || [])
    ];

    if (!rawFlights.length) {
      console.log('[SEARCH] No flights returned from HasData');
      return res.json({ flights: [] });
    }

    // Transformer le format HasData → format frontend
    const flights = rawFlights.map((f, i) => {
      const legs     = f.flights || [];
      const firstLeg = legs[0];
      const lastLeg  = legs[legs.length - 1];

      function parseHasDataTime(timeStr) {
        if (!timeStr) return null;
        // Format: "2026-07-01 10:40" ou "2026-07-02 2:05"
        const [datePart, timePart] = timeStr.split(' ');
        if (!datePart || !timePart) return null;
        const [h, m] = timePart.split(':');
        return `${datePart}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`;
      }

      const depAt = parseHasDataTime(firstLeg?.departureAirport?.time) || date + 'T08:00:00';
      const arrAt = parseHasDataTime(lastLeg?.arrivalAirport?.time)    || date + 'T12:00:00';

      const totalMin = f.totalDuration || 300;
      const durH     = Math.floor(totalMin / 60);
      const durM     = totalMin % 60;

      const price = f.price || 0;
      const taxes = parseFloat((price * 0.18).toFixed(3));

      return {
        id: `HS-${i}-${from}${to}`,
        itineraries: [{
          duration: `PT${durH}H${durM}M`,
          segments: legs.map(leg => ({
            departure: {
              iataCode: leg.departureAirport?.id || from,
              at:       parseHasDataTime(leg.departureAirport?.time) || depAt
            },
            arrival: {
              iataCode: leg.arrivalAirport?.id || to,
              at:       parseHasDataTime(leg.arrivalAirport?.time) || arrAt
            },
            carrierCode: leg.flightNumber?.split(' ')[0] || 'XX',
            number:      leg.flightNumber?.split(' ')[1]  || '000',
            carrierName: leg.airline  || 'Unknown',
            airplane:    leg.airplane || '',
            travelClass: leg.travelClass || cabinClass,
          }))
        }],
        price: {
          total:    price.toString(),
          currency: 'KWD',
          fees: [{ amount: taxes.toString(), type: 'TAXES' }]
        },
        layovers: f.layovers || [],
        extensions: f.extensions || [],
        travelerPricings: [],
        validatingAirlineCodes: [firstLeg?.flightNumber?.split(' ')[0] || 'XX']
      };
    });

    console.log(`[SEARCH] ${flights.length} real flights from HasData`);
    res.json({ flights });

  } catch (err) {
    console.error('[FLIGHTS ERROR]', err.message);
    res.status(500).json({ error: 'Error fetching flights: ' + err.message });
  }
});

// Airports autocomplete handled client-side
router.get('/airports', async (req, res) => {
  res.json({ airports: [] });
});

module.exports = router;