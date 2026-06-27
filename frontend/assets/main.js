// ═══════════════════════════════════════
//  WHITE SKY — main.js
// ═══════════════════════════════════════

const API = 'http://localhost:3001';

// ── Local airport database ──
const AIRPORTS = [
  {iata:'CDG',city:'Paris',name:'Charles de Gaulle',country:'France'},
  {iata:'ORY',city:'Paris',name:'Orly',country:'France'},
  {iata:'LHR',city:'London',name:'Heathrow',country:'United Kingdom'},
  {iata:'LGW',city:'London',name:'Gatwick',country:'United Kingdom'},
  {iata:'JFK',city:'New York',name:'John F. Kennedy',country:'United States'},
  {iata:'EWR',city:'New York',name:'Newark Liberty',country:'United States'},
  {iata:'LAX',city:'Los Angeles',name:'Los Angeles Intl',country:'United States'},
  {iata:'ORD',city:'Chicago',name:"O'Hare Intl",country:'United States'},
  {iata:'ATL',city:'Atlanta',name:'Hartsfield-Jackson',country:'United States'},
  {iata:'MIA',city:'Miami',name:'Miami Intl',country:'United States'},
  {iata:'SFO',city:'San Francisco',name:'San Francisco Intl',country:'United States'},
  {iata:'BOS',city:'Boston',name:'Logan Intl',country:'United States'},
  {iata:'DFW',city:'Dallas',name:'Dallas Fort Worth',country:'United States'},
  {iata:'DXB',city:'Dubai',name:'Dubai Intl',country:'UAE'},
  {iata:'AUH',city:'Abu Dhabi',name:'Zayed Intl',country:'UAE'},
  {iata:'SHJ',city:'Sharjah',name:'Sharjah Intl',country:'UAE'},
  {iata:'KWI',city:'Kuwait',name:'Kuwait Intl',country:'Kuwait'},
  {iata:'DOH',city:'Doha',name:'Hamad Intl',country:'Qatar'},
  {iata:'BAH',city:'Bahrain',name:'Bahrain Intl',country:'Bahrain'},
  {iata:'RUH',city:'Riyadh',name:'King Khalid Intl',country:'Saudi Arabia'},
  {iata:'JED',city:'Jeddah',name:'King Abdulaziz Intl',country:'Saudi Arabia'},
  {iata:'MCT',city:'Muscat',name:'Muscat Intl',country:'Oman'},
  {iata:'BEY',city:'Beirut',name:'Rafic Hariri Intl',country:'Lebanon'},
  {iata:'AMM',city:'Amman',name:'Queen Alia Intl',country:'Jordan'},
  {iata:'CAI',city:'Cairo',name:'Cairo Intl',country:'Egypt'},
  {iata:'HRG',city:'Hurghada',name:'Hurghada Intl',country:'Egypt'},
  {iata:'SSH',city:'Sharm el-Sheikh',name:'Sharm el-Sheikh Intl',country:'Egypt'},
  {iata:'TUN',city:'Tunis',name:'Tunis Carthage',country:'Tunisia'},
  {iata:'ALG',city:'Algiers',name:'Houari Boumediene',country:'Algeria'},
  {iata:'CMN',city:'Casablanca',name:'Mohammed V Intl',country:'Morocco'},
  {iata:'RAK',city:'Marrakech',name:'Menara',country:'Morocco'},
  {iata:'FEZ',city:'Fez',name:'Fez-Saiss',country:'Morocco'},
  {iata:'TNG',city:'Tangier',name:'Ibn Batouta',country:'Morocco'},
  {iata:'IST',city:'Istanbul',name:'Istanbul Airport',country:'Turkey'},
  {iata:'SAW',city:'Istanbul',name:'Sabiha Gokcen',country:'Turkey'},
  {iata:'AYT',city:'Antalya',name:'Antalya Intl',country:'Turkey'},
  {iata:'FRA',city:'Frankfurt',name:'Frankfurt Intl',country:'Germany'},
  {iata:'MUC',city:'Munich',name:'Munich Intl',country:'Germany'},
  {iata:'AMS',city:'Amsterdam',name:'Schiphol',country:'Netherlands'},
  {iata:'MAD',city:'Madrid',name:'Adolfo Suarez Barajas',country:'Spain'},
  {iata:'BCN',city:'Barcelona',name:'El Prat',country:'Spain'},
  {iata:'FCO',city:'Rome',name:'Leonardo da Vinci',country:'Italy'},
  {iata:'MXP',city:'Milan',name:'Malpensa',country:'Italy'},
  {iata:'ZRH',city:'Zurich',name:'Zurich Airport',country:'Switzerland'},
  {iata:'GVA',city:'Geneva',name:'Geneva Airport',country:'Switzerland'},
  {iata:'BRU',city:'Brussels',name:'Brussels Airport',country:'Belgium'},
  {iata:'VIE',city:'Vienna',name:'Vienna Intl',country:'Austria'},
  {iata:'ATH',city:'Athens',name:'Eleftherios Venizelos',country:'Greece'},
  {iata:'LIS',city:'Lisbon',name:'Humberto Delgado',country:'Portugal'},
  {iata:'CPH',city:'Copenhagen',name:'Copenhagen Airport',country:'Denmark'},
  {iata:'ARN',city:'Stockholm',name:'Arlanda',country:'Sweden'},
  {iata:'OSL',city:'Oslo',name:'Gardermoen',country:'Norway'},
  {iata:'WAW',city:'Warsaw',name:'Chopin Airport',country:'Poland'},
  {iata:'PRG',city:'Prague',name:'Vaclav Havel',country:'Czech Republic'},
  {iata:'NRT',city:'Tokyo',name:'Narita Intl',country:'Japan'},
  {iata:'HND',city:'Tokyo',name:'Haneda',country:'Japan'},
  {iata:'ICN',city:'Seoul',name:'Incheon Intl',country:'South Korea'},
  {iata:'PEK',city:'Beijing',name:'Capital Intl',country:'China'},
  {iata:'PVG',city:'Shanghai',name:'Pudong Intl',country:'China'},
  {iata:'HKG',city:'Hong Kong',name:'Hong Kong Intl',country:'Hong Kong'},
  {iata:'SIN',city:'Singapore',name:'Changi Airport',country:'Singapore'},
  {iata:'BKK',city:'Bangkok',name:'Suvarnabhumi',country:'Thailand'},
  {iata:'KUL',city:'Kuala Lumpur',name:'KLIA',country:'Malaysia'},
  {iata:'CGK',city:'Jakarta',name:'Soekarno-Hatta',country:'Indonesia'},
  {iata:'MNL',city:'Manila',name:'Ninoy Aquino Intl',country:'Philippines'},
  {iata:'DEL',city:'Delhi',name:'Indira Gandhi Intl',country:'India'},
  {iata:'BOM',city:'Mumbai',name:'Chhatrapati Shivaji',country:'India'},
  {iata:'SYD',city:'Sydney',name:'Kingsford Smith',country:'Australia'},
  {iata:'MEL',city:'Melbourne',name:'Tullamarine',country:'Australia'},
  {iata:'YYZ',city:'Toronto',name:'Pearson Intl',country:'Canada'},
  {iata:'YVR',city:'Vancouver',name:'Vancouver Intl',country:'Canada'},
  {iata:'GRU',city:'Sao Paulo',name:'Guarulhos Intl',country:'Brazil'},
  {iata:'EZE',city:'Buenos Aires',name:'Ministro Pistarini',country:'Argentina'},
  {iata:'MEX',city:'Mexico City',name:'Benito Juarez Intl',country:'Mexico'},
  {iata:'CUN',city:'Cancun',name:'Cancun Intl',country:'Mexico'},
  {iata:'JNB',city:'Johannesburg',name:'OR Tambo Intl',country:'South Africa'},
  {iata:'CPT',city:'Cape Town',name:'Cape Town Intl',country:'South Africa'},
  {iata:'NBO',city:'Nairobi',name:'Jomo Kenyatta Intl',country:'Kenya'},
  {iata:'ADD',city:'Addis Ababa',name:'Bole Intl',country:'Ethiopia'},
  {iata:'MRU',city:'Mauritius',name:'Sir Seewoosagur Ramgoolam',country:'Mauritius'},
  {iata:'BEG',city:'Belgrade',name:'Nikola Tesla',country:'Serbia'},
  {iata:'SKG',city:'Thessaloniki',name:'Macedonia Airport',country:'Greece'},
  {iata:'TLV',city:'Tel Aviv',name:'Ben Gurion',country:'Israel'},
  {iata:'GYD',city:'Baku',name:'Heydar Aliyev Intl',country:'Azerbaijan'},
  {iata:'TBS',city:'Tbilisi',name:'Shota Rustaveli',country:'Georgia'},
  {iata:'EVN',city:'Yerevan',name:'Zvartnots Intl',country:'Armenia'},
];

function searchAirports(query) {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return AIRPORTS.filter(a =>
    a.city.toLowerCase().includes(q) ||
    a.iata.toLowerCase().startsWith(q) ||
    a.country.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q)
  ).slice(0, 6);
}

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('qs-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min   = tomorrow.toISOString().split('T')[0];
  }
  startIntroSequence();

  // Close autocomplete on outside click
  document.addEventListener('click', e => {
    document.querySelectorAll('.autocomplete-list').forEach(l => {
      if (!l.contains(e.target)) l.style.display = 'none';
    });
  });
});

// ── Intro animation ──
function startIntroSequence() {
  const intro = document.getElementById('intro-screen');
  const main  = document.getElementById('main-site');
  if (!intro || !main) return;

  // Plane takeoff starts at 1s, lasts 3.2s, logo at 3.8s → total ~5.5s
  setTimeout(() => {
    intro.classList.add('closing');
    setTimeout(() => {
      intro.style.display = 'none';
      main.classList.remove('hidden');
      document.body.style.overflow = 'auto';
    }, 800);
  }, 5500);
}

// ── Autocomplete (local, instant) ──
function autocomplete(input, listId) {
  const query   = input.value.trim();
  const list    = document.getElementById(listId);
  const results = searchAirports(query);

  if (!results.length) { list.innerHTML = ''; list.style.display = 'none'; return; }

  list.innerHTML = results.map(a => `
    <div class="ac-item" onclick="selectAirport('${a.iata}','${a.city}, ${a.country} (${a.iata})','${input.id}','${listId}')">
      <span class="ac-iata">${a.iata}</span>
      <span class="ac-name">${a.city} — ${a.name}, ${a.country}</span>
    </div>`).join('');
  list.style.display = 'block';
}

function selectAirport(iata, label, inputId, listId) {
  document.getElementById(inputId).value = label;
  const codeField = document.getElementById(inputId + '-code');
  if (codeField) codeField.value = iata;
  document.getElementById(listId).style.display = 'none';
}

// ── Quick search submit ──
function handleQuickSearch(e) {
  e.preventDefault();
  const fromCode = document.getElementById('qs-from-code')?.value || extractIATA(document.getElementById('qs-from').value);
  const toCode   = document.getElementById('qs-to-code')?.value   || extractIATA(document.getElementById('qs-to').value);
  const date     = document.getElementById('qs-date').value;
  const pax      = document.getElementById('qs-pax').value;
  const fromText = document.getElementById('qs-from').value.trim();
  const toText   = document.getElementById('qs-to').value.trim();

  if (!fromText || !toText || !date) { showToast('Please fill in all fields.', 'error'); return; }
  if (!fromCode || !toCode)          { showToast('Please select a city from the suggestions.', 'error'); return; }

  window.location.href = `search.html?from=${fromCode}&to=${toCode}&date=${date}&pax=${pax}&fromCity=${encodeURIComponent(fromText)}&toCity=${encodeURIComponent(toText)}`;
}

function extractIATA(str) {
  const match = str.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : null;
}

// ── Swap cities ──
function swapCities() {
  const fromInput = document.getElementById('qs-from');
  const toInput   = document.getElementById('qs-to');
  const fromCode  = document.getElementById('qs-from-code');
  const toCode    = document.getElementById('qs-to-code');
  const tmpVal  = fromInput.value;
  const tmpCode = fromCode?.value;
  fromInput.value = toInput.value;
  toInput.value   = tmpVal;
  if (fromCode && toCode) { fromCode.value = toCode.value; toCode.value = tmpCode; }
}

// ── Destination card click ──
function searchDest(iata, cityName) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 30);
  const date = tomorrow.toISOString().split('T')[0];
  window.location.href = `search.html?to=${iata}&date=${date}&pax=1&toCity=${encodeURIComponent(cityName)}`;
}

// ── Toast ──
function showToast(msg, type = 'info') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── Navbar scroll ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.background = window.scrollY > 50 ? 'rgba(13,31,53,0.98)' : 'rgba(13,31,53,0.85)';
});
