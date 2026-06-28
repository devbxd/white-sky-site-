// ═══════════════════════════════════════
//  WHITE SKY — main.js
// ═══════════════════════════════════════

const API = 'http://localhost:3001';

// ── Comprehensive Airport Database (300+ airports) ──
const AIRPORTS = [
  // MIDDLE EAST & GULF
  {iata:'KWI',city:'Kuwait City',name:'Kuwait Intl',country:'Kuwait'},
  {iata:'DXB',city:'Dubai',name:'Dubai Intl',country:'UAE'},
  {iata:'AUH',city:'Abu Dhabi',name:'Zayed Intl',country:'UAE'},
  {iata:'SHJ',city:'Sharjah',name:'Sharjah Intl',country:'UAE'},
  {iata:'DOH',city:'Doha',name:'Hamad Intl',country:'Qatar'},
  {iata:'BAH',city:'Bahrain',name:'Bahrain Intl',country:'Bahrain'},
  {iata:'RUH',city:'Riyadh',name:'King Khalid Intl',country:'Saudi Arabia'},
  {iata:'JED',city:'Jeddah',name:'King Abdulaziz Intl',country:'Saudi Arabia'},
  {iata:'DMM',city:'Dammam',name:'King Fahd Intl',country:'Saudi Arabia'},
  {iata:'MED',city:'Medina',name:'Prince Mohammed Bin Abdulaziz',country:'Saudi Arabia'},
  {iata:'TIF',city:'Taif',name:'Taif Regional',country:'Saudi Arabia'},
  {iata:'AHB',city:'Abha',name:'Abha Intl',country:'Saudi Arabia'},
  {iata:'GIZ',city:'Jizan',name:'Jizan Regional',country:'Saudi Arabia'},
  {iata:'MCT',city:'Muscat',name:'Muscat Intl',country:'Oman'},
  {iata:'SLL',city:'Salalah',name:'Salalah Airport',country:'Oman'},
  {iata:'BEY',city:'Beirut',name:'Rafic Hariri Intl',country:'Lebanon'},
  {iata:'AMM',city:'Amman',name:'Queen Alia Intl',country:'Jordan'},
  {iata:'AQJ',city:'Aqaba',name:'King Hussein Intl',country:'Jordan'},
  {iata:'DAM',city:'Damascus',name:'Damascus Intl',country:'Syria'},
  {iata:'BGW',city:'Baghdad',name:'Baghdad Intl',country:'Iraq'},
  {iata:'BSR',city:'Basra',name:'Basra Intl',country:'Iraq'},
  {iata:'EBL',city:'Erbil',name:'Erbil Intl',country:'Iraq'},
  {iata:'TLV',city:'Tel Aviv',name:'Ben Gurion',country:'Israel'},
  {iata:'GYD',city:'Baku',name:'Heydar Aliyev Intl',country:'Azerbaijan'},
  {iata:'TBS',city:'Tbilisi',name:'Shota Rustaveli',country:'Georgia'},
  {iata:'EVN',city:'Yerevan',name:'Zvartnots Intl',country:'Armenia'},
  {iata:'IKA',city:'Tehran',name:'Imam Khomeini Intl',country:'Iran'},
  {iata:'MHD',city:'Mashhad',name:'Shahid Hashemi Nejad',country:'Iran'},
  // AFRICA
  {iata:'CAI',city:'Cairo',name:'Cairo Intl',country:'Egypt'},
  {iata:'HRG',city:'Hurghada',name:'Hurghada Intl',country:'Egypt'},
  {iata:'SSH',city:'Sharm el-Sheikh',name:'Sharm el-Sheikh Intl',country:'Egypt'},
  {iata:'LXR',city:'Luxor',name:'Luxor Intl',country:'Egypt'},
  {iata:'ASW',city:'Aswan',name:'Aswan Intl',country:'Egypt'},
  {iata:'ALY',city:'Alexandria',name:'El Nouzha',country:'Egypt'},
  {iata:'TUN',city:'Tunis',name:'Tunis Carthage',country:'Tunisia'},
  {iata:'DJE',city:'Djerba',name:'Djerba-Zarzis',country:'Tunisia'},
  {iata:'MIR',city:'Monastir',name:'Habib Bourguiba',country:'Tunisia'},
  {iata:'ALG',city:'Algiers',name:'Houari Boumediene',country:'Algeria'},
  {iata:'ORN',city:'Oran',name:'Ahmed Ben Bella',country:'Algeria'},
  {iata:'AAE',city:'Annaba',name:'Rabah Bitat',country:'Algeria'},
  {iata:'CMN',city:'Casablanca',name:'Mohammed V Intl',country:'Morocco'},
  {iata:'RAK',city:'Marrakech',name:'Menara',country:'Morocco'},
  {iata:'FEZ',city:'Fez',name:'Fez-Saiss',country:'Morocco'},
  {iata:'TNG',city:'Tangier',name:'Ibn Batouta',country:'Morocco'},
  {iata:'AGA',city:'Agadir',name:'Al Massira',country:'Morocco'},
  {iata:'OUD',city:'Oujda',name:'Angad',country:'Morocco'},
  {iata:'NDR',city:'Nador',name:'El Arroui',country:'Morocco'},
  {iata:'JNB',city:'Johannesburg',name:'OR Tambo Intl',country:'South Africa'},
  {iata:'CPT',city:'Cape Town',name:'Cape Town Intl',country:'South Africa'},
  {iata:'DUR',city:'Durban',name:'King Shaka Intl',country:'South Africa'},
  {iata:'NBO',city:'Nairobi',name:'Jomo Kenyatta Intl',country:'Kenya'},
  {iata:'MBA',city:'Mombasa',name:'Moi Intl',country:'Kenya'},
  {iata:'ADD',city:'Addis Ababa',name:'Bole Intl',country:'Ethiopia'},
  {iata:'LOS',city:'Lagos',name:'Murtala Muhammed Intl',country:'Nigeria'},
  {iata:'ABV',city:'Abuja',name:'Nnamdi Azikiwe Intl',country:'Nigeria'},
  {iata:'ACC',city:'Accra',name:'Kotoka Intl',country:'Ghana'},
  {iata:'DKR',city:'Dakar',name:'Blaise Diagne Intl',country:'Senegal'},
  {iata:'MRU',city:'Mauritius',name:'Sir Seewoosagur Ramgoolam',country:'Mauritius'},
  {iata:'RUN',city:'Reunion',name:'Roland Garros',country:'Reunion'},
  {iata:'TNR',city:'Antananarivo',name:'Ivato Intl',country:'Madagascar'},
  // EUROPE - UK
  {iata:'LHR',city:'London',name:'Heathrow',country:'United Kingdom'},
  {iata:'LGW',city:'London',name:'Gatwick',country:'United Kingdom'},
  {iata:'STN',city:'London',name:'Stansted',country:'United Kingdom'},
  {iata:'LTN',city:'London',name:'Luton',country:'United Kingdom'},
  {iata:'LCY',city:'London',name:'City Airport',country:'United Kingdom'},
  {iata:'MAN',city:'Manchester',name:'Manchester Airport',country:'United Kingdom'},
  {iata:'BHX',city:'Birmingham',name:'Birmingham Airport',country:'United Kingdom'},
  {iata:'EDI',city:'Edinburgh',name:'Edinburgh Airport',country:'United Kingdom'},
  {iata:'GLA',city:'Glasgow',name:'Glasgow Airport',country:'United Kingdom'},
  {iata:'BRS',city:'Bristol',name:'Bristol Airport',country:'United Kingdom'},
  {iata:'NCL',city:'Newcastle',name:'Newcastle Airport',country:'United Kingdom'},
  // EUROPE - FRANCE
  {iata:'CDG',city:'Paris',name:'Charles de Gaulle',country:'France'},
  {iata:'ORY',city:'Paris',name:'Orly',country:'France'},
  {iata:'NCE',city:'Nice',name:'Cote d Azur',country:'France'},
  {iata:'MRS',city:'Marseille',name:'Provence',country:'France'},
  {iata:'LYS',city:'Lyon',name:'Saint-Exupery',country:'France'},
  {iata:'TLS',city:'Toulouse',name:'Blagnac',country:'France'},
  {iata:'BOD',city:'Bordeaux',name:'Merignac',country:'France'},
  {iata:'NTE',city:'Nantes',name:'Atlantique',country:'France'},
  {iata:'SXB',city:'Strasbourg',name:'Strasbourg Airport',country:'France'},
  {iata:'LIL',city:'Lille',name:'Lesquin',country:'France'},
  // EUROPE - GERMANY
  {iata:'FRA',city:'Frankfurt',name:'Frankfurt Intl',country:'Germany'},
  {iata:'MUC',city:'Munich',name:'Munich Intl',country:'Germany'},
  {iata:'BER',city:'Berlin',name:'Brandenburg',country:'Germany'},
  {iata:'HAM',city:'Hamburg',name:'Hamburg Airport',country:'Germany'},
  {iata:'DUS',city:'Dusseldorf',name:'Dusseldorf Intl',country:'Germany'},
  {iata:'CGN',city:'Cologne',name:'Cologne Bonn',country:'Germany'},
  {iata:'STR',city:'Stuttgart',name:'Stuttgart Airport',country:'Germany'},
  {iata:'NUE',city:'Nuremberg',name:'Nuremberg Airport',country:'Germany'},
  // EUROPE - SPAIN
  {iata:'MAD',city:'Madrid',name:'Adolfo Suarez Barajas',country:'Spain'},
  {iata:'BCN',city:'Barcelona',name:'El Prat',country:'Spain'},
  {iata:'AGP',city:'Malaga',name:'Costa del Sol',country:'Spain'},
  {iata:'PMI',city:'Palma de Mallorca',name:'Son Sant Joan',country:'Spain'},
  {iata:'ALC',city:'Alicante',name:'Alicante-Elche',country:'Spain'},
  {iata:'VLC',city:'Valencia',name:'Valencia Airport',country:'Spain'},
  {iata:'SVQ',city:'Seville',name:'San Pablo',country:'Spain'},
  {iata:'BIO',city:'Bilbao',name:'Loiu Airport',country:'Spain'},
  {iata:'TFN',city:'Tenerife',name:'Tenerife Norte',country:'Spain'},
  {iata:'TFS',city:'Tenerife',name:'Tenerife Sur',country:'Spain'},
  {iata:'LPA',city:'Gran Canaria',name:'Gran Canaria Airport',country:'Spain'},
  {iata:'IBZ',city:'Ibiza',name:'Ibiza Airport',country:'Spain'},
  // EUROPE - ITALY
  {iata:'FCO',city:'Rome',name:'Leonardo da Vinci',country:'Italy'},
  {iata:'CIA',city:'Rome',name:'Ciampino',country:'Italy'},
  {iata:'MXP',city:'Milan',name:'Malpensa',country:'Italy'},
  {iata:'LIN',city:'Milan',name:'Linate',country:'Italy'},
  {iata:'BGY',city:'Bergamo',name:'Orio al Serio',country:'Italy'},
  {iata:'VCE',city:'Venice',name:'Marco Polo',country:'Italy'},
  {iata:'NAP',city:'Naples',name:'Capodichino',country:'Italy'},
  {iata:'BLQ',city:'Bologna',name:'Guglielmo Marconi',country:'Italy'},
  {iata:'CTA',city:'Catania',name:'Fontanarossa',country:'Italy'},
  {iata:'PMO',city:'Palermo',name:'Falcone Borsellino',country:'Italy'},
  {iata:'FLR',city:'Florence',name:'Peretola',country:'Italy'},
  {iata:'BRI',city:'Bari',name:'Palese Airport',country:'Italy'},
  // EUROPE - OTHER
  {iata:'ZRH',city:'Zurich',name:'Zurich Airport',country:'Switzerland'},
  {iata:'GVA',city:'Geneva',name:'Geneva Airport',country:'Switzerland'},
  {iata:'BSL',city:'Basel',name:'EuroAirport',country:'Switzerland'},
  {iata:'BRU',city:'Brussels',name:'Brussels Airport',country:'Belgium'},
  {iata:'CRL',city:'Brussels',name:'Charleroi',country:'Belgium'},
  {iata:'AMS',city:'Amsterdam',name:'Schiphol',country:'Netherlands'},
  {iata:'EIN',city:'Eindhoven',name:'Eindhoven Airport',country:'Netherlands'},
  {iata:'VIE',city:'Vienna',name:'Vienna Intl',country:'Austria'},
  {iata:'SZG',city:'Salzburg',name:'Salzburg Airport',country:'Austria'},
  {iata:'ATH',city:'Athens',name:'Eleftherios Venizelos',country:'Greece'},
  {iata:'SKG',city:'Thessaloniki',name:'Macedonia Airport',country:'Greece'},
  {iata:'HER',city:'Heraklion',name:'Nikos Kazantzakis',country:'Greece'},
  {iata:'RHO',city:'Rhodes',name:'Diagoras Airport',country:'Greece'},
  {iata:'CFU',city:'Corfu',name:'Ioannis Kapodistrias',country:'Greece'},
  {iata:'JMK',city:'Mykonos',name:'Mykonos Airport',country:'Greece'},
  {iata:'JTR',city:'Santorini',name:'Santorini Airport',country:'Greece'},
  {iata:'LIS',city:'Lisbon',name:'Humberto Delgado',country:'Portugal'},
  {iata:'OPO',city:'Porto',name:'Francisco Sa Carneiro',country:'Portugal'},
  {iata:'FAO',city:'Faro',name:'Faro Airport',country:'Portugal'},
  {iata:'CPH',city:'Copenhagen',name:'Copenhagen Airport',country:'Denmark'},
  {iata:'ARN',city:'Stockholm',name:'Arlanda',country:'Sweden'},
  {iata:'GOT',city:'Gothenburg',name:'Landvetter',country:'Sweden'},
  {iata:'OSL',city:'Oslo',name:'Gardermoen',country:'Norway'},
  {iata:'HEL',city:'Helsinki',name:'Helsinki-Vantaa',country:'Finland'},
  {iata:'WAW',city:'Warsaw',name:'Chopin Airport',country:'Poland'},
  {iata:'KRK',city:'Krakow',name:'John Paul II Intl',country:'Poland'},
  {iata:'PRG',city:'Prague',name:'Vaclav Havel',country:'Czech Republic'},
  {iata:'BUD',city:'Budapest',name:'Ferenc Liszt Intl',country:'Hungary'},
  {iata:'OTP',city:'Bucharest',name:'Henri Coanda Intl',country:'Romania'},
  {iata:'SOF',city:'Sofia',name:'Sofia Airport',country:'Bulgaria'},
  {iata:'IST',city:'Istanbul',name:'Istanbul Airport',country:'Turkey'},
  {iata:'SAW',city:'Istanbul',name:'Sabiha Gokcen',country:'Turkey'},
  {iata:'AYT',city:'Antalya',name:'Antalya Intl',country:'Turkey'},
  {iata:'ADB',city:'Izmir',name:'Adnan Menderes',country:'Turkey'},
  {iata:'ESB',city:'Ankara',name:'Esenboga',country:'Turkey'},
  {iata:'DLM',city:'Dalaman',name:'Dalaman Airport',country:'Turkey'},
  {iata:'BJV',city:'Bodrum',name:'Milas-Bodrum',country:'Turkey'},
  {iata:'SVO',city:'Moscow',name:'Sheremetyevo',country:'Russia'},
  {iata:'DME',city:'Moscow',name:'Domodedovo',country:'Russia'},
  {iata:'LED',city:'St Petersburg',name:'Pulkovo',country:'Russia'},
  {iata:'DUB',city:'Dublin',name:'Dublin Airport',country:'Ireland'},
  {iata:'OSL',city:'Oslo',name:'Gardermoen',country:'Norway'},
  {iata:'HEL',city:'Helsinki',name:'Helsinki-Vantaa',country:'Finland'},
  {iata:'KEF',city:'Reykjavik',name:'Keflavik Intl',country:'Iceland'},
  {iata:'LUX',city:'Luxembourg',name:'Luxembourg Airport',country:'Luxembourg'},
  {iata:'GVA',city:'Geneva',name:'Geneva Airport',country:'Switzerland'},
  {iata:'SKP',city:'Skopje',name:'Alexander the Great',country:'North Macedonia'},
  {iata:'TIA',city:'Tirana',name:'Mother Teresa Airport',country:'Albania'},
  {iata:'BEG',city:'Belgrade',name:'Nikola Tesla',country:'Serbia'},
  {iata:'ZAG',city:'Zagreb',name:'Zagreb Airport',country:'Croatia'},
  {iata:'SPU',city:'Split',name:'Split Airport',country:'Croatia'},
  {iata:'DBV',city:'Dubrovnik',name:'Dubrovnik Airport',country:'Croatia'},
  {iata:'LJU',city:'Ljubljana',name:'Joze Pucnik',country:'Slovenia'},
  {iata:'SJJ',city:'Sarajevo',name:'Sarajevo Intl',country:'Bosnia'},
  {iata:'OHD',city:'Ohrid',name:'Ohrid St Paul the Apostle',country:'North Macedonia'},
  // AMERICAS - USA
  {iata:'JFK',city:'New York',name:'John F. Kennedy',country:'United States'},
  {iata:'EWR',city:'New York',name:'Newark Liberty',country:'United States'},
  {iata:'LGA',city:'New York',name:'LaGuardia',country:'United States'},
  {iata:'LAX',city:'Los Angeles',name:'Los Angeles Intl',country:'United States'},
  {iata:'ORD',city:'Chicago',name:"O'Hare Intl",country:'United States'},
  {iata:'ATL',city:'Atlanta',name:'Hartsfield-Jackson',country:'United States'},
  {iata:'MIA',city:'Miami',name:'Miami Intl',country:'United States'},
  {iata:'SFO',city:'San Francisco',name:'San Francisco Intl',country:'United States'},
  {iata:'BOS',city:'Boston',name:'Logan Intl',country:'United States'},
  {iata:'DFW',city:'Dallas',name:'Dallas Fort Worth',country:'United States'},
  {iata:'IAH',city:'Houston',name:'George Bush Intl',country:'United States'},
  {iata:'LAS',city:'Las Vegas',name:'Harry Reid Intl',country:'United States'},
  {iata:'SEA',city:'Seattle',name:'Seattle-Tacoma Intl',country:'United States'},
  {iata:'DEN',city:'Denver',name:'Denver Intl',country:'United States'},
  {iata:'IAD',city:'Washington',name:'Dulles Intl',country:'United States'},
  {iata:'DCA',city:'Washington',name:'Reagan National',country:'United States'},
  {iata:'MCO',city:'Orlando',name:'Orlando Intl',country:'United States'},
  {iata:'PHX',city:'Phoenix',name:'Sky Harbor Intl',country:'United States'},
  // AMERICAS - CANADA
  {iata:'YYZ',city:'Toronto',name:'Pearson Intl',country:'Canada'},
  {iata:'YVR',city:'Vancouver',name:'Vancouver Intl',country:'Canada'},
  {iata:'YUL',city:'Montreal',name:'Trudeau Intl',country:'Canada'},
  {iata:'YYC',city:'Calgary',name:'Calgary Intl',country:'Canada'},
  {iata:'YEG',city:'Edmonton',name:'Edmonton Intl',country:'Canada'},
  // AMERICAS - LATIN
  {iata:'GRU',city:'Sao Paulo',name:'Guarulhos Intl',country:'Brazil'},
  {iata:'GIG',city:'Rio de Janeiro',name:'Galeao Intl',country:'Brazil'},
  {iata:'EZE',city:'Buenos Aires',name:'Ministro Pistarini',country:'Argentina'},
  {iata:'SCL',city:'Santiago',name:'Arturo Merino Benitez',country:'Chile'},
  {iata:'BOG',city:'Bogota',name:'El Dorado Intl',country:'Colombia'},
  {iata:'LIM',city:'Lima',name:'Jorge Chavez Intl',country:'Peru'},
  {iata:'MEX',city:'Mexico City',name:'Benito Juarez Intl',country:'Mexico'},
  {iata:'CUN',city:'Cancun',name:'Cancun Intl',country:'Mexico'},
  {iata:'PTY',city:'Panama City',name:'Tocumen Intl',country:'Panama'},
  {iata:'HAV',city:'Havana',name:'Jose Marti Intl',country:'Cuba'},
  // ASIA - JAPAN
  {iata:'NRT',city:'Tokyo',name:'Narita Intl',country:'Japan'},
  {iata:'HND',city:'Tokyo',name:'Haneda',country:'Japan'},
  {iata:'KIX',city:'Osaka',name:'Kansai Intl',country:'Japan'},
  {iata:'NGO',city:'Nagoya',name:'Chubu Centrair',country:'Japan'},
  {iata:'CTS',city:'Sapporo',name:'New Chitose',country:'Japan'},
  {iata:'FUK',city:'Fukuoka',name:'Fukuoka Airport',country:'Japan'},
  // ASIA - KOREA & CHINA
  {iata:'ICN',city:'Seoul',name:'Incheon Intl',country:'South Korea'},
  {iata:'GMP',city:'Seoul',name:'Gimpo Intl',country:'South Korea'},
  {iata:'PUS',city:'Busan',name:'Gimhae Intl',country:'South Korea'},
  {iata:'PEK',city:'Beijing',name:'Capital Intl',country:'China'},
  {iata:'PKX',city:'Beijing',name:'Daxing Intl',country:'China'},
  {iata:'PVG',city:'Shanghai',name:'Pudong Intl',country:'China'},
  {iata:'SHA',city:'Shanghai',name:'Hongqiao',country:'China'},
  {iata:'CAN',city:'Guangzhou',name:'Baiyun Intl',country:'China'},
  {iata:'HKG',city:'Hong Kong',name:'Hong Kong Intl',country:'Hong Kong'},
  {iata:'TPE',city:'Taipei',name:'Taoyuan Intl',country:'Taiwan'},
  // ASIA - SOUTHEAST
  {iata:'SIN',city:'Singapore',name:'Changi Airport',country:'Singapore'},
  {iata:'BKK',city:'Bangkok',name:'Suvarnabhumi',country:'Thailand'},
  {iata:'DMK',city:'Bangkok',name:'Don Mueang',country:'Thailand'},
  {iata:'HKT',city:'Phuket',name:'Phuket Intl',country:'Thailand'},
  {iata:'CNX',city:'Chiang Mai',name:'Chiang Mai Intl',country:'Thailand'},
  {iata:'KUL',city:'Kuala Lumpur',name:'KLIA',country:'Malaysia'},
  {iata:'PEN',city:'Penang',name:'Penang Intl',country:'Malaysia'},
  {iata:'CGK',city:'Jakarta',name:'Soekarno-Hatta',country:'Indonesia'},
  {iata:'DPS',city:'Bali',name:'Ngurah Rai Intl',country:'Indonesia'},
  {iata:'MNL',city:'Manila',name:'Ninoy Aquino Intl',country:'Philippines'},
  {iata:'CEB',city:'Cebu',name:'Mactan-Cebu Intl',country:'Philippines'},
  {iata:'SGN',city:'Ho Chi Minh City',name:'Tan Son Nhat Intl',country:'Vietnam'},
  {iata:'HAN',city:'Hanoi',name:'Noi Bai Intl',country:'Vietnam'},
  {iata:'DAD',city:'Da Nang',name:'Da Nang Intl',country:'Vietnam'},
  {iata:'REP',city:'Siem Reap',name:'Siem Reap Intl',country:'Cambodia'},
  {iata:'RGN',city:'Yangon',name:'Yangon Intl',country:'Myanmar'},
  // ASIA - SOUTH
  {iata:'DEL',city:'Delhi',name:'Indira Gandhi Intl',country:'India'},
  {iata:'BOM',city:'Mumbai',name:'Chhatrapati Shivaji',country:'India'},
  {iata:'BLR',city:'Bangalore',name:'Kempegowda Intl',country:'India'},
  {iata:'MAA',city:'Chennai',name:'Chennai Intl',country:'India'},
  {iata:'HYD',city:'Hyderabad',name:'Rajiv Gandhi Intl',country:'India'},
  {iata:'CCU',city:'Kolkata',name:'Netaji Subhas Chandra Bose',country:'India'},
  {iata:'AMD',city:'Ahmedabad',name:'Sardar Vallabhbhai Patel',country:'India'},
  {iata:'COK',city:'Kochi',name:'Cochin Intl',country:'India'},
  {iata:'TRV',city:'Trivandrum',name:'Trivandrum Intl',country:'India'},
  {iata:'GOI',city:'Goa',name:'Dabolim Airport',country:'India'},
  {iata:'JAI',city:'Jaipur',name:'Jaipur Intl',country:'India'},
  {iata:'CMB',city:'Colombo',name:'Bandaranaike Intl',country:'Sri Lanka'},
  {iata:'DAC',city:'Dhaka',name:'Hazrat Shahjalal Intl',country:'Bangladesh'},
  {iata:'KTM',city:'Kathmandu',name:'Tribhuvan Intl',country:'Nepal'},
  {iata:'KHI',city:'Karachi',name:'Jinnah Intl',country:'Pakistan'},
  {iata:'LHE',city:'Lahore',name:'Allama Iqbal Intl',country:'Pakistan'},
  {iata:'ISB',city:'Islamabad',name:'Islamabad Intl',country:'Pakistan'},
  // AUSTRALIA & OCEANIA
  {iata:'SYD',city:'Sydney',name:'Kingsford Smith',country:'Australia'},
  {iata:'MEL',city:'Melbourne',name:'Tullamarine',country:'Australia'},
  {iata:'BNE',city:'Brisbane',name:'Brisbane Airport',country:'Australia'},
  {iata:'PER',city:'Perth',name:'Perth Airport',country:'Australia'},
  {iata:'ADL',city:'Adelaide',name:'Adelaide Airport',country:'Australia'},
  {iata:'OOL',city:'Gold Coast',name:'Gold Coast Airport',country:'Australia'},
  {iata:'AKL',city:'Auckland',name:'Auckland Airport',country:'New Zealand'},
  {iata:'CHC',city:'Christchurch',name:'Christchurch Airport',country:'New Zealand'},
  {iata:'WLG',city:'Wellington',name:'Wellington Airport',country:'New Zealand'},
  {iata:'PPT',city:'Papeete',name:"Faa'a Intl",country:'French Polynesia'},
  {iata:'NAN',city:'Nadi',name:'Nadi Intl',country:'Fiji'},
  // CARIBBEAN
  {iata:'MBJ',city:'Montego Bay',name:'Sangster Intl',country:'Jamaica'},
  {iata:'PUJ',city:'Punta Cana',name:'Punta Cana Intl',country:'Dominican Republic'},
  {iata:'SJU',city:'San Juan',name:'Luis Munoz Marin Intl',country:'Puerto Rico'},
  {iata:'NAS',city:'Nassau',name:'Lynden Pindling Intl',country:'Bahamas'},
  {iata:'BGI',city:'Bridgetown',name:'Grantley Adams Intl',country:'Barbados'},
  {iata:'HAV',city:'Havana',name:'Jose Marti Intl',country:'Cuba'},
  {iata:'GUA',city:'Guatemala City',name:'La Aurora Intl',country:'Guatemala'},
  {iata:'SAL',city:'San Salvador',name:'El Salvador Intl',country:'El Salvador'},
  {iata:'PTY',city:'Panama City',name:'Tocumen Intl',country:'Panama'},
  {iata:'SJO',city:'San Jose',name:'Juan Santamaria',country:'Costa Rica'},
  // SOUTH AMERICA EXTRA
  {iata:'CUZ',city:'Cusco',name:'Alejandro Velasco Astete',country:'Peru'},
  {iata:'MVD',city:'Montevideo',name:'Carrasco Intl',country:'Uruguay'},
  {iata:'ASU',city:'Asuncion',name:'Silvio Pettirossi Intl',country:'Paraguay'},
  {iata:'LPB',city:'La Paz',name:'El Alto Intl',country:'Bolivia'},
  {iata:'CCS',city:'Caracas',name:'Simon Bolivar Intl',country:'Venezuela'},
  {iata:'GYE',city:'Guayaquil',name:'Jose Joaquin de Olmedo',country:'Ecuador'},
  {iata:'UIO',city:'Quito',name:'Mariscal Sucre',country:'Ecuador'},
  {iata:'MDE',city:'Medellin',name:'Jose Maria Cordova',country:'Colombia'},
  {iata:'CTG',city:'Cartagena',name:'Rafael Nunez Intl',country:'Colombia'},
  {iata:'CLO',city:'Cali',name:'Alfonso Bonilla Aragon',country:'Colombia'},
  // MEXICO EXTRA
  {iata:'GDL',city:'Guadalajara',name:'Miguel Hidalgo Intl',country:'Mexico'},
  {iata:'MTY',city:'Monterrey',name:'General Mariano Escobedo',country:'Mexico'},
  {iata:'PVR',city:'Puerto Vallarta',name:'Gustavo Diaz Ordaz',country:'Mexico'},
  {iata:'SJD',city:'Los Cabos',name:'Los Cabos Intl',country:'Mexico'},
  {iata:'MID',city:'Merida',name:'Manuel Crescencio Rejon',country:'Mexico'},
  // EAST AFRICA
  {iata:'DAR',city:'Dar es Salaam',name:'Julius Nyerere Intl',country:'Tanzania'},
  {iata:'ZNZ',city:'Zanzibar',name:'Abeid Amani Karume Intl',country:'Tanzania'},
  {iata:'EBB',city:'Entebbe',name:'Entebbe Intl',country:'Uganda'},
  {iata:'KGL',city:'Kigali',name:'Kigali Intl',country:'Rwanda'},
  {iata:'LUN',city:'Lusaka',name:'Kenneth Kaunda Intl',country:'Zambia'},
  {iata:'HRE',city:'Harare',name:'Robert Gabriel Mugabe Intl',country:'Zimbabwe'},
  {iata:'MRU',city:'Mauritius',name:'Sir Seewoosagur Ramgoolam',country:'Mauritius'},
  {iata:'SEZ',city:'Mahe',name:'Seychelles Intl',country:'Seychelles'},
  {iata:'RUN',city:'Reunion',name:'Roland Garros',country:'Reunion'},
  // WEST AFRICA
  {iata:'ABJ',city:'Abidjan',name:'Felix Houphouet-Boigny Intl',country:'Ivory Coast'},
  {iata:'ACC',city:'Accra',name:'Kotoka Intl',country:'Ghana'},
  {iata:'DKR',city:'Dakar',name:'Blaise Diagne Intl',country:'Senegal'},
  {iata:'LOS',city:'Lagos',name:'Murtala Muhammed Intl',country:'Nigeria'},
  {iata:'ABV',city:'Abuja',name:'Nnamdi Azikiwe Intl',country:'Nigeria'},
  {iata:'ADD',city:'Addis Ababa',name:'Bole Intl',country:'Ethiopia'},
  // CENTRAL ASIA
  {iata:'GYD',city:'Baku',name:'Heydar Aliyev Intl',country:'Azerbaijan'},
  {iata:'TBS',city:'Tbilisi',name:'Shota Rustaveli',country:'Georgia'},
  {iata:'EVN',city:'Yerevan',name:'Zvartnots Intl',country:'Armenia'},
  {iata:'TAS',city:'Tashkent',name:'Islam Karimov Intl',country:'Uzbekistan'},
  {iata:'ALA',city:'Almaty',name:'Almaty Intl',country:'Kazakhstan'},
  {iata:'NQZ',city:'Astana',name:'Nursultan Nazarbayev Intl',country:'Kazakhstan'},
  {iata:'FRU',city:'Bishkek',name:'Manas Intl',country:'Kyrgyzstan'},
  {iata:'ASB',city:'Ashgabat',name:'Ashgabat Intl',country:'Turkmenistan'},
  {iata:'DYU',city:'Dushanbe',name:'Dushanbe Intl',country:'Tajikistan'},
  // BALKANS
  {iata:'BEG',city:'Belgrade',name:'Nikola Tesla',country:'Serbia'},
  {iata:'ZAG',city:'Zagreb',name:'Zagreb Airport',country:'Croatia'},
  {iata:'DBV',city:'Dubrovnik',name:'Dubrovnik Airport',country:'Croatia'},
  {iata:'SPU',city:'Split',name:'Split Airport',country:'Croatia'},
  {iata:'TGD',city:'Podgorica',name:'Podgorica Airport',country:'Montenegro'},
  {iata:'TIV',city:'Tivat',name:'Tivat Airport',country:'Montenegro'},
  {iata:'SJJ',city:'Sarajevo',name:'Sarajevo Intl',country:'Bosnia'},
  {iata:'LJU',city:'Ljubljana',name:'Joze Pucnik',country:'Slovenia'},
  {iata:'SKP',city:'Skopje',name:'Alexander the Great',country:'North Macedonia'},
  {iata:'TIA',city:'Tirana',name:'Mother Teresa Airport',country:'Albania'},
  // BALTIC & EASTERN EUROPE
  {iata:'TLL',city:'Tallinn',name:'Lennart Meri Tallinn',country:'Estonia'},
  {iata:'RIX',city:'Riga',name:'Riga Intl',country:'Latvia'},
  {iata:'VNO',city:'Vilnius',name:'Vilnius Intl',country:'Lithuania'},
  {iata:'BTS',city:'Bratislava',name:'Milan Rastislav Stefanik',country:'Slovakia'},
  {iata:'OTP',city:'Bucharest',name:'Henri Coanda Intl',country:'Romania'},
  {iata:'CLJ',city:'Cluj-Napoca',name:'Avram Iancu Cluj',country:'Romania'},
  {iata:'SOF',city:'Sofia',name:'Sofia Airport',country:'Bulgaria'},
  {iata:'VAR',city:'Varna',name:'Varna Airport',country:'Bulgaria'},
  {iata:'BOJ',city:'Burgas',name:'Burgas Airport',country:'Bulgaria'},
  // UK EXTRA
  {iata:'MAN',city:'Manchester',name:'Manchester Airport',country:'United Kingdom'},
  {iata:'BHX',city:'Birmingham',name:'Birmingham Airport',country:'United Kingdom'},
  {iata:'EDI',city:'Edinburgh',name:'Edinburgh Airport',country:'United Kingdom'},
  {iata:'GLA',city:'Glasgow',name:'Glasgow Airport',country:'United Kingdom'},
  {iata:'BRS',city:'Bristol',name:'Bristol Airport',country:'United Kingdom'},
  {iata:'LPL',city:'Liverpool',name:'John Lennon Airport',country:'United Kingdom'},
  {iata:'NCL',city:'Newcastle',name:'Newcastle Airport',country:'United Kingdom'},
  {iata:'DUB',city:'Dublin',name:'Dublin Airport',country:'Ireland'},
  {iata:'SNN',city:'Shannon',name:'Shannon Airport',country:'Ireland'},
  {iata:'KEF',city:'Reykjavik',name:'Keflavik Intl',country:'Iceland'},
  // SCANDINAVIA EXTRA  
  {iata:'GOT',city:'Gothenburg',name:'Landvetter',country:'Sweden'},
  {iata:'MMX',city:'Malmo',name:'Malmoe Airport',country:'Sweden'},
  {iata:'BGO',city:'Bergen',name:'Flesland',country:'Norway'},
  {iata:'SVG',city:'Stavanger',name:'Sola Airport',country:'Norway'},
  {iata:'TOS',city:'Tromso',name:'Langnes Airport',country:'Norway'},
  {iata:'TRD',city:'Trondheim',name:'Vaernes Airport',country:'Norway'},
  {iata:'TMP',city:'Tampere',name:'Tampere-Pirkkala',country:'Finland'},
  {iata:'RVN',city:'Rovaniemi',name:'Rovaniemi Airport',country:'Finland'},
  // PORTUGAL EXTRA
  {iata:'PDL',city:'Ponta Delgada',name:'Joao Paulo II',country:'Portugal'},
  {iata:'FNC',city:'Funchal',name:'Madeira Airport',country:'Portugal'},
  {iata:'FAO',city:'Faro',name:'Faro Airport',country:'Portugal'},
  // SPAIN EXTRA
  {iata:'TFN',city:'Tenerife',name:'Tenerife Norte',country:'Spain'},
  {iata:'TFS',city:'Tenerife',name:'Tenerife Sur',country:'Spain'},
  {iata:'LPA',city:'Gran Canaria',name:'Gran Canaria Airport',country:'Spain'},
  {iata:'ACE',city:'Lanzarote',name:'Cesar Manrique',country:'Spain'},
  {iata:'FUE',city:'Fuerteventura',name:'Fuerteventura Airport',country:'Spain'},
  {iata:'IBZ',city:'Ibiza',name:'Ibiza Airport',country:'Spain'},
  {iata:'MAH',city:'Menorca',name:'Mahon Airport',country:'Spain'},
  // GREECE EXTRA
  {iata:'JMK',city:'Mykonos',name:'Mykonos Airport',country:'Greece'},
  {iata:'JTR',city:'Santorini',name:'Santorini Airport',country:'Greece'},
  {iata:'KGS',city:'Kos',name:'Ippokratis Airport',country:'Greece'},
  {iata:'ZTH',city:'Zakynthos',name:'Dionysios Solomos',country:'Greece'},
  {iata:'KLX',city:'Kalamata',name:'Kalamata Airport',country:'Greece'},
  {iata:'PVK',city:'Preveza',name:'Aktion National Airport',country:'Greece'},
  {iata:'AOK',city:'Karpathos',name:'Karpathos Airport',country:'Greece'},
  // NORTH AFRICA EXTRA
  {iata:'TIP',city:'Tripoli',name:'Mitiga Intl',country:'Libya'},
  {iata:'KRT',city:'Khartoum',name:'Khartoum Intl',country:'Sudan'},
  {iata:'JIB',city:'Djibouti City',name:'Ambouli Intl',country:'Djibouti'},
  // PACIFIC & ISLAND
  {iata:'APW',city:'Apia',name:'Faleolo Intl',country:'Samoa'},
  {iata:'SUV',city:'Suva',name:'Nausori Intl',country:'Fiji'},
  {iata:'IPC',city:'Easter Island',name:'Mataveri Intl',country:'Chile'},
  {iata:'GAN',city:'Addu Atoll',name:'Gan Airport',country:'Maldives'},
  {iata:'MLE',city:'Male',name:'Velana Intl',country:'Maldives'},
  {iata:'HAQ',city:'Hanimaadhoo',name:'Hanimaadhoo Intl',country:'Maldives'},
  // INDIA EXTRA
  {iata:'LKO',city:'Lucknow',name:'Chaudhary Charan Singh',country:'India'},
  {iata:'IXC',city:'Chandigarh',name:'Chandigarh Airport',country:'India'},
  {iata:'PAT',city:'Patna',name:'Lok Nayak Jayaprakash',country:'India'},
  {iata:'BBI',city:'Bhubaneswar',name:'Biju Patnaik Intl',country:'India'},
  {iata:'GAU',city:'Guwahati',name:'Lokpriya Gopinath Bordoloi',country:'India'},
  {iata:'IXB',city:'Bagdogra',name:'Bagdogra Airport',country:'India'},
  {iata:'VTZ',city:'Vizag',name:'Visakhapatnam Airport',country:'India'},
  {iata:'STV',city:'Surat',name:'Surat Airport',country:'India'},
  {iata:'NAG',city:'Nagpur',name:'Dr Babasaheb Ambedkar',country:'India'},
  {iata:'PNQ',city:'Pune',name:'Pune Airport',country:'India'},
  {iata:'IDR',city:'Indore',name:'Devi Ahilya Bai Holkar',country:'India'},
  {iata:'BHO',city:'Bhopal',name:'Raja Bhoj Airport',country:'India'},
  {iata:'JDH',city:'Jodhpur',name:'Jodhpur Airport',country:'India'},
  {iata:'UDR',city:'Udaipur',name:'Maharana Pratap Airport',country:'India'},
  {iata:'SXR',city:'Srinagar',name:'Sheikh ul Alam Intl',country:'India'},
  {iata:'ATQ',city:'Amritsar',name:'Sri Guru Ram Dass Jee',country:'India'},
  {iata:'IXL',city:'Leh',name:'Kushok Bakula Rimpochee',country:'India'},
  // INDONESIA EXTRA
  {iata:'SUB',city:'Surabaya',name:'Juanda Intl',country:'Indonesia'},
  {iata:'UPG',city:'Makassar',name:'Sultan Hasanuddin Intl',country:'Indonesia'},
  {iata:'MDC',city:'Manado',name:'Sam Ratulangi Intl',country:'Indonesia'},
  {iata:'PLM',city:'Palembang',name:'Sultan Mahmud Badaruddin II',country:'Indonesia'},
  {iata:'PKU',city:'Pekanbaru',name:'Sultan Syarif Kasim II',country:'Indonesia'},
  {iata:'BPN',city:'Balikpapan',name:'Sultan Aji Muhammad Sulaiman',country:'Indonesia'},
  // MALAYSIA EXTRA
  {iata:'KBR',city:'Kota Bharu',name:'Sultan Ismail Petra',country:'Malaysia'},
  {iata:'KUA',city:'Kuantan',name:'Sultan Ahmad Shah',country:'Malaysia'},
  {iata:'IPH',city:'Ipoh',name:'Sultan Azlan Shah',country:'Malaysia'},
  {iata:'LGK',city:'Langkawi',name:'Langkawi Intl',country:'Malaysia'},
  {iata:'BKI',city:'Kota Kinabalu',name:'Kota Kinabalu Intl',country:'Malaysia'},
  {iata:'KCH',city:'Kuching',name:'Kuching Intl',country:'Malaysia'},
  // CHINA EXTRA
  {iata:'CTU',city:'Chengdu',name:'Tianfu Intl',country:'China'},
  {iata:'XIY',city:'Xian',name:'Xianyang Intl',country:'China'},
  {iata:'WUH',city:'Wuhan',name:'Tianhe Intl',country:'China'},
  {iata:'NKG',city:'Nanjing',name:'Lukou Intl',country:'China'},
  {iata:'TSN',city:'Tianjin',name:'Binhai Intl',country:'China'},
  {iata:'CGO',city:'Zhengzhou',name:'Xinzheng Intl',country:'China'},
  {iata:'CSX',city:'Changsha',name:'Huanghua Intl',country:'China'},
  {iata:'KMG',city:'Kunming',name:'Changshui Intl',country:'China'},
  {iata:'URC',city:'Urumqi',name:'Diwopu Intl',country:'China'},
  {iata:'HRB',city:'Harbin',name:'Taiping Intl',country:'China'},
  {iata:'SHE',city:'Shenyang',name:'Taoxian Intl',country:'China'},
  {iata:'DLC',city:'Dalian',name:'Zhoushuizi Intl',country:'China'},
  {iata:'TAO',city:'Qingdao',name:'Jiaodong Intl',country:'China'},
  {iata:'XMN',city:'Xiamen',name:'Gaoqi Intl',country:'China'},
  {iata:'SZX',city:'Shenzhen',name:"Bao'an Intl",country:'China'},
  {iata:'HAK',city:'Haikou',name:'Meilan Intl',country:'China'},
  {iata:'SYX',city:'Sanya',name:'Phoenix Intl',country:'China'},
  {iata:'LXA',city:'Lhasa',name:'Gonggar Airport',country:'China'},
  // VIETNAM EXTRA
  {iata:'VCS',city:'Con Dao',name:'Con Dao Airport',country:'Vietnam'},
  {iata:'PQC',city:'Phu Quoc',name:'Phu Quoc Intl',country:'Vietnam'},
  {iata:'VII',city:'Vinh',name:'Vinh Airport',country:'Vietnam'},
  {iata:'HUI',city:'Hue',name:'Phu Bai Intl',country:'Vietnam'},
  {iata:'DIN',city:'Dien Bien Phu',name:'Dien Bien Phu Airport',country:'Vietnam'},
  // THAILAND EXTRA
  {iata:'USM',city:'Koh Samui',name:'Samui Airport',country:'Thailand'},
  {iata:'KBV',city:'Krabi',name:'Krabi Airport',country:'Thailand'},
  {iata:'HKT',city:'Phuket',name:'Phuket Intl',country:'Thailand'},
  {iata:'UTH',city:'Udon Thani',name:'Udon Thani Intl',country:'Thailand'},
  {iata:'CEI',city:'Chiang Rai',name:'Mae Fah Luang Intl',country:'Thailand'},
  // PHILIPPINES EXTRA
  {iata:'DVO',city:'Davao',name:'Francisco Bangoy Intl',country:'Philippines'},
  {iata:'ILO',city:'Iloilo',name:'Iloilo Intl',country:'Philippines'},
  {iata:'BCD',city:'Bacolod',name:'Silay Airport',country:'Philippines'},
  {iata:'ZAM',city:'Zamboanga',name:'Zamboanga Intl',country:'Philippines'},
  {iata:'GES',city:'General Santos',name:'Francisco B Reyes Intl',country:'Philippines'},
  // USA EXTRA
  {iata:'ORD',city:'Chicago',name:"O'Hare Intl",country:'United States'},
  {iata:'MDW',city:'Chicago',name:'Midway',country:'United States'},
  {iata:'PHX',city:'Phoenix',name:'Sky Harbor Intl',country:'United States'},
  {iata:'LAS',city:'Las Vegas',name:'Harry Reid Intl',country:'United States'},
  {iata:'SEA',city:'Seattle',name:'Seattle-Tacoma Intl',country:'United States'},
  {iata:'DEN',city:'Denver',name:'Denver Intl',country:'United States'},
  {iata:'IAD',city:'Washington DC',name:'Dulles Intl',country:'United States'},
  {iata:'DCA',city:'Washington DC',name:'Reagan National',country:'United States'},
  {iata:'MCO',city:'Orlando',name:'Orlando Intl',country:'United States'},
  {iata:'TPA',city:'Tampa',name:'Tampa Intl',country:'United States'},
  {iata:'MSP',city:'Minneapolis',name:'Minneapolis-St. Paul Intl',country:'United States'},
  {iata:'DTW',city:'Detroit',name:'Detroit Metropolitan',country:'United States'},
  {iata:'PHL',city:'Philadelphia',name:'Philadelphia Intl',country:'United States'},
  {iata:'CLT',city:'Charlotte',name:'Douglas Intl',country:'United States'},
  {iata:'BWI',city:'Baltimore',name:'BWI Marshall',country:'United States'},
  {iata:'IAH',city:'Houston',name:'George Bush Intl',country:'United States'},
  {iata:'HOU',city:'Houston',name:'William P Hobby',country:'United States'},
  {iata:'MSY',city:'New Orleans',name:'Louis Armstrong Intl',country:'United States'},
  {iata:'MEM',city:'Memphis',name:'Memphis Intl',country:'United States'},
  {iata:'BNA',city:'Nashville',name:'Nashville Intl',country:'United States'},
  {iata:'DAL',city:'Dallas',name:'Love Field',country:'United States'},
  {iata:'AUS',city:'Austin',name:'Austin-Bergstrom Intl',country:'United States'},
  {iata:'SAT',city:'San Antonio',name:'San Antonio Intl',country:'United States'},
  {iata:'PDX',city:'Portland',name:'Portland Intl',country:'United States'},
  {iata:'SLC',city:'Salt Lake City',name:'Salt Lake City Intl',country:'United States'},
  {iata:'SAN',city:'San Diego',name:'San Diego Intl',country:'United States'},
  {iata:'OAK',city:'Oakland',name:'Oakland Intl',country:'United States'},
  {iata:'SJC',city:'San Jose',name:'Norman Y. Mineta',country:'United States'},
  {iata:'SMF',city:'Sacramento',name:'Sacramento Intl',country:'United States'},
  {iata:'RDU',city:'Raleigh-Durham',name:'Raleigh-Durham Intl',country:'United States'},
  {iata:'MCI',city:'Kansas City',name:'Kansas City Intl',country:'United States'},
  {iata:'STL',city:'St. Louis',name:'Lambert-St Louis Intl',country:'United States'},
  {iata:'CVG',city:'Cincinnati',name:'Cincinnati/Northern Kentucky',country:'United States'},
  {iata:'CLE',city:'Cleveland',name:'Hopkins Intl',country:'United States'},
  {iata:'CMH',city:'Columbus',name:'John Glenn Columbus Intl',country:'United States'},
  {iata:'IND',city:'Indianapolis',name:'Indianapolis Intl',country:'United States'},
  {iata:'MKE',city:'Milwaukee',name:'Mitchell Intl',country:'United States'},
  {iata:'PIT',city:'Pittsburgh',name:'Pittsburgh Intl',country:'United States'},
  {iata:'BUF',city:'Buffalo',name:'Niagara Falls Intl',country:'United States'},
  {iata:'ALB',city:'Albany',name:'Albany Intl',country:'United States'},
  {iata:'HNL',city:'Honolulu',name:'Daniel K. Inouye Intl',country:'United States'},
  {iata:'OGG',city:'Maui',name:'Kahului Airport',country:'United States'},
  {iata:'KOA',city:'Kona',name:'Ellison Onizuka Kona Intl',country:'United States'},
  {iata:'LIH',city:'Kauai',name:'Lihue Airport',country:'United States'},
  {iata:'ANC',city:'Anchorage',name:'Ted Stevens Anchorage Intl',country:'United States'},
  {iata:'FAI',city:'Fairbanks',name:'Fairbanks Intl',country:'United States'},
];


function searchAirports(query) {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return AIRPORTS.filter(a =>
    a.city.toLowerCase().includes(q) ||
    a.iata.toLowerCase().startsWith(q) ||
    a.country.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q)
  ).slice(0, 8);
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

  document.addEventListener('click', e => {
    document.querySelectorAll('.autocomplete-list').forEach(l => {
      if (!l.contains(e.target)) l.style.display = 'none';
    });
  });
});

// ── Intro — only show once ──
function startIntroSequence() {
  const intro = document.getElementById('intro-screen');
  const main  = document.getElementById('main-site');
  if (!intro || !main) return;

  if (localStorage.getItem('ws_introSeen')) {
    intro.style.display = 'none';
    main.classList.remove('hidden');
    document.body.style.overflow = 'auto';
    return;
  }
}

// ── Autocomplete ──
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

function searchDest(iata, cityName) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 30);
  const date = tomorrow.toISOString().split('T')[0];
  window.location.href = `search.html?to=${iata}&date=${date}&pax=1&toCity=${encodeURIComponent(cityName)}`;
}

function showToast(msg, type = 'info') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => t.classList.remove('show'), 4000);
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.background = window.scrollY > 50 ? 'rgba(13,31,53,0.98)' : 'rgba(13,31,53,0.85)';
});
