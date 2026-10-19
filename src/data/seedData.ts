export interface SeedProvince {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  touristSpots: string[];
}

export interface SeedCity {
  id: number;
  name: string;
  slug: string;
  provinceId: number;
  provinceSlug: string;
  provinceName: string;
  imageUrl: string;
  hubType: 'airport' | 'seaport' | 'city_center';
  description: string;
  popularDestinations: string[];
}

export interface SeedVehicle {
  id: number;
  name: string;
  slug: string;
  type: 'sedan' | 'suv' | 'van' | 'pickup' | 'mpv';
  seats: number;
  transmission: 'manual' | 'automatic';
  dailyRatePhp: number;
  imageUrl: string;
  withDriverAvailable: boolean;
  status: 'available' | 'unavailable';
  features: string[];
  specs: {
    engine: string;
    power: string;
    torque: string;
    transmissionDetail: string;
    groundClearance: string;
    fuelEconomy: string;
  };
  luggageCapacity: string;
}

export const REGION_8_NOTICE = "We currently serve Region 8 (Eastern Visayas) only.";

// Logo path provided by user in workspace
export const ALBETH_LOGO_SRC = "/assets/aistudio/alnew_9fa0dae2.jpg";

export const SEED_PROVINCES: SeedProvince[] = [
  {
    id: 1,
    name: 'Leyte',
    slug: 'leyte',
    description: 'Iconic gateway of Eastern Visayas featuring the majestic San Juanico Bridge spanning Leyte to Samar, Kalanggaman Island sandbar in Palompon, MacArthur Landing Memorial in Palo, and Lake Danao National Park in Ormoc.',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    touristSpots: [
      'San Juanico Bridge (Tacloban to Samar)',
      'Kalanggaman Island Sandbar (Palompon)',
      'MacArthur Landing Memorial Park (Palo)',
      'Lake Danao National Park (Ormoc City)',
      'Lintaon Peak 16,000 Blossoms (Baybay)',
    ],
  },
  {
    id: 2,
    name: 'Southern Leyte',
    slug: 'southern-leyte',
    description: 'Home to the soaring Agas-Agas Bridge in Sogod (tallest bridge in the Philippines at 84m), the whale shark sanctuaries of Sogod Bay, historic Limasawa Island, and Monte Cueva Shrine in Maasin.',
    imageUrl: '/src/assets/images/southern_leyte_bridge_1792452720072.jpg',
    touristSpots: [
      'Agas-Agas Bridge (Tallest in Philippines)',
      'Sogod Bay Whale Shark Sanctuary',
      'Historic Limasawa Island',
      'Monte Cueva Shrine (Maasin City)',
      'Liloan Ferry RORO Port to Mindanao',
    ],
  },
  {
    id: 3,
    name: 'Biliran',
    slug: 'biliran',
    description: 'The island wonderland famous for world-renowned Sambawan Island with its panoramic volcanic grassy ridge, white coral sandbars, crystal turquoise waters, and multi-tier Tinago Falls in Caibiran.',
    imageUrl: '/src/assets/images/biliran_sambawan_island_1792452720734.jpg',
    touristSpots: [
      'Sambawan Island Tropical Ridge & Sandbar',
      'Tinago Falls (Caibiran)',
      'Ulan-Ulan Falls & Iyusan Terraces',
      'Naval Commercial Seaport',
      'Higatangan Island Shifting Sandbar',
    ],
  },
  {
    id: 4,
    name: 'Samar (Western Samar)',
    slug: 'samar',
    description: 'The spelunking capital of the Philippines featuring Sohoton Natural Bridge National Park & Caves in Basey, Langun-Gobingob Caves, and the multi-tiered waterfalls of Calbayog City (Tarangban & Bangon Falls).',
    imageUrl: '/src/assets/images/samar_sohoton_caves_1792452721791.jpg',
    touristSpots: [
      'Sohoton Natural Bridge & Caves (Basey)',
      'Tarangban Falls & Bangon Falls (Calbayog)',
      'Langun-Gobingob Cave System (Calbiga)',
      'San Juanico Bridge (Samar Entrance)',
      'Catbalogan City Harbor & Capitol',
    ],
  },
  {
    id: 5,
    name: 'Eastern Samar',
    slug: 'eastern-samar',
    description: 'The premier Pacific surfing haven featuring Guiuan and Calicoan Island’s ABCD surf beach, crystal-clear Linao Cave in Sulangan, pristine Divinubo Island Lighthouse, and lush coastal boulevard drives in Borongan.',
    imageUrl: '/src/assets/images/eastern_samar_coast_1792452721763.jpg',
    touristSpots: [
      'Calicoan Island & ABCD Surf Beach (Guiuan)',
      'Linao Cave Natural Pool (Sulangan)',
      'Divinubo Island Lighthouse (Borongan)',
      'Balangiga Historical Shrine',
      'Minanut Island Marine Sanctuary',
    ],
  },
  {
    id: 6,
    name: 'Northern Samar',
    slug: 'northern-samar',
    description: 'Home to the colossal Biri Island Rock Formations carved by the surging Pacific Ocean waves, ancient Capul Island Spanish Lighthouse, Catarman airport corridor, and the busy Allen RORO gateway to Luzon.',
    imageUrl: '/src/assets/images/northern_samar_rocks_1792452723089.jpg',
    touristSpots: [
      'Biri Island Colossal Rock Formations',
      'Capul Island Historic Spanish Lighthouse',
      'Bel-at Natural Tidal Saltwater Pool',
      'Catarman National Airport (CRM)',
      'Allen RORO Ferry Port (Luzon Gateway)',
    ],
  },
];

export const SEED_CITIES: SeedCity[] = [
  {
    id: 1,
    name: 'Tacloban City',
    slug: 'tacloban-city',
    provinceId: 1,
    provinceSlug: 'leyte',
    provinceName: 'Leyte',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    hubType: 'airport',
    description: 'The bustling regional capital and economic gateway of Eastern Visayas. Home to Daniel Z. Romualdez Airport (TAC), MacArthur Landing Memorial, and the Leyte landing of the San Juanico Bridge.',
    popularDestinations: ['Daniel Z. Romualdez Airport (TAC)', 'San Juanico Bridge Leyte Side', 'MacArthur Landing Memorial Park', 'Robinsons Place Tacloban'],
  },
  {
    id: 2,
    name: 'Ormoc City',
    slug: 'ormoc-city',
    provinceId: 1,
    provinceSlug: 'leyte',
    provinceName: 'Leyte',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    hubType: 'seaport',
    description: 'The City of Beautiful People. Key seaport hub for FastCat and OceanJet ferries to Cebu, plus jumping point to Lake Danao National Park.',
    popularDestinations: ['Ormoc City Port Terminal', 'Lake Danao National Park', 'Alto Peak trailhead', 'Ormoc Airport (OMC)'],
  },
  {
    id: 3,
    name: 'Baybay City',
    slug: 'baybay-city',
    provinceId: 1,
    provinceSlug: 'leyte',
    provinceName: 'Leyte',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    hubType: 'seaport',
    description: 'Home to Visayas State University (VSU), Lintaon Peak 16,000 Blossoms, and ferry connections to Camotes and Cebu.',
    popularDestinations: ['VSU Eco-Tourism Park', 'Lintaon Peak 16,000 Blossoms', 'Baybay Seaport'],
  },
  {
    id: 4,
    name: 'Palo',
    slug: 'palo',
    provinceId: 1,
    provinceSlug: 'leyte',
    provinceName: 'Leyte',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    hubType: 'city_center',
    description: 'Historic municipality hosting the MacArthur Landing Memorial National Park, regional government center, and Palo Cathedral.',
    popularDestinations: ['MacArthur Memorial Beach', 'Palo Metropolitan Cathedral', 'Government Center Hub'],
  },
  {
    id: 5,
    name: 'Carigara',
    slug: 'carigara',
    provinceId: 1,
    provinceSlug: 'leyte',
    provinceName: 'Leyte',
    imageUrl: '/src/assets/images/leyte_san_juanico_1792452719242.jpg',
    hubType: 'city_center',
    description: 'Charming coastal town along Carigara Bay, famous for pastillas de leche, traditional Spanish church heritage, and highway junctions.',
    popularDestinations: ['Carigara Bayfront', 'Holy Cross Parish Church', 'Pastillas Food Trail'],
  },
  {
    id: 6,
    name: 'Maasin City',
    slug: 'maasin-city',
    provinceId: 2,
    provinceSlug: 'southern-leyte',
    provinceName: 'Southern Leyte',
    imageUrl: '/src/assets/images/southern_leyte_bridge_1792452720072.jpg',
    hubType: 'seaport',
    description: 'Capital of Southern Leyte. Renowned for Monte Cueva Shrine, Cathedral of Our Lady of Assumption, and coastal routes to Sogod Bay and Agas-Agas Bridge.',
    popularDestinations: ['Monte Cueva Shrine', 'Maasin Seaport', 'Agas-Agas Bridge Access'],
  },
  {
    id: 7,
    name: 'Naval',
    slug: 'naval',
    provinceId: 3,
    provinceSlug: 'biliran',
    provinceName: 'Biliran',
    imageUrl: '/src/assets/images/biliran_sambawan_island_1792452720734.jpg',
    hubType: 'seaport',
    description: 'Capital port municipality of Biliran Island. Primary jump-off point for pumpboats to Sambawan Island, Tinago Falls, and Caibiran hot springs.',
    popularDestinations: ['Naval Port Terminal', 'Sambawan Island Pumpboat Jump-off', 'Tinago Falls'],
  },
  {
    id: 8,
    name: 'Catbalogan City',
    slug: 'catbalogan-city',
    provinceId: 4,
    provinceSlug: 'samar',
    provinceName: 'Samar (Western Samar)',
    imageUrl: '/src/assets/images/samar_sohoton_caves_1792452721791.jpg',
    hubType: 'seaport',
    description: 'Provincial capital of Samar. Hub for travelers heading to Sohoton caves, Catbalogan pier, and scenic coastal highway drives.',
    popularDestinations: ['Samar Provincial Capitol', 'Catbalogan Pier', 'Buri Island Beach'],
  },
  {
    id: 9,
    name: 'Calbayog City',
    slug: 'calbayog-city',
    provinceId: 4,
    provinceSlug: 'samar',
    provinceName: 'Samar (Western Samar)',
    imageUrl: '/src/assets/images/samar_sohoton_caves_1792452721791.jpg',
    hubType: 'airport',
    description: 'City of Waterfalls. Commercial aviation center featuring Calbayog Airport (CYP), Tarangban Falls, Bangon Falls, and Nijaga Park.',
    popularDestinations: ['Calbayog Airport (CYP)', 'Tarangban Falls', 'Bangon Falls', 'Nijaga Park'],
  },
  {
    id: 10,
    name: 'Borongan City',
    slug: 'borongan-city',
    provinceId: 5,
    provinceSlug: 'eastern-samar',
    provinceName: 'Eastern Samar',
    imageUrl: '/src/assets/images/eastern_samar_coast_1792452721763.jpg',
    hubType: 'city_center',
    description: 'Capital of Eastern Samar facing the Pacific Ocean. Famous for Baybay Boulevard, surfing breaks, and green mountain pass highways.',
    popularDestinations: ['Baybay Boulevard', 'Divinubo Island Lighthouse', 'Calicoan Surf Gateway'],
  },
  {
    id: 11,
    name: 'Catarman',
    slug: 'catarman',
    provinceId: 6,
    provinceSlug: 'northern-samar',
    provinceName: 'Northern Samar',
    imageUrl: '/src/assets/images/northern_samar_rocks_1792452723089.jpg',
    hubType: 'airport',
    description: 'Capital of Northern Samar with Catarman National Airport (CRM). The transportation nexus connecting Biri Rock Formations and Allen RORO port.',
    popularDestinations: ['Catarman National Airport (CRM)', 'Biri Island Rock Formations jump-off', 'Allen Port Gateway'],
  },
];

// REPLACED FLEET: Exactly the 4 cars requested by the user
export const SEED_VEHICLES: SeedVehicle[] = [
  {
    id: 1,
    name: 'Mitsubishi Mirage G4 (AT)',
    slug: 'mitsubishi-mirage-g4-at',
    type: 'sedan',
    seats: 5,
    transmission: 'automatic',
    dailyRatePhp: 1650,
    imageUrl: '/src/assets/images/mirage_g4_sedan_1792452723642.jpg',
    withDriverAvailable: true,
    status: 'available',
    specs: {
      engine: '1.2L 3-Cylinder DOHC 12V MIVEC',
      power: '78 PS @ 6,000 rpm',
      torque: '100 Nm @ 4,000 rpm',
      transmissionDetail: 'INVECS-III Continuously Variable Transmission (CVT)',
      groundClearance: '170 mm (Subcompact City & Highway)',
      fuelEconomy: 'Up to 21 km/L highway economy',
    },
    features: [
      'Fuel Efficient 1.2L MIVEC Engine',
      'Smooth Automatic CVT Transmission',
      '7-inch Touchscreen with Apple CarPlay & Android Auto',
      'Keyless Entry with Push-Start Engine Button',
      'Cold Dual Air Conditioning',
      'Dual SRS Front Airbags & ABS with EBD',
      '450 Liters Spacious Trunk Capacity',
      'Rear Parking Camera & Sensors',
    ],
    luggageCapacity: '2 Large Suitcases + 2 Backpacks',
  },
  {
    id: 2,
    name: 'Ford Ecosport Titanium 1.5 (AT)',
    slug: 'ford-ecosport-titanium-at',
    type: 'suv',
    seats: 5,
    transmission: 'automatic',
    dailyRatePhp: 2600,
    imageUrl: '/src/assets/images/ford_ecosport_suv_1792452723999.jpg',
    withDriverAvailable: true,
    status: 'available',
    specs: {
      engine: '1.5L Ti-VCT 3-Cylinder Gasoline',
      power: '123 PS @ 6,500 rpm',
      torque: '150 Nm @ 4,500 rpm',
      transmissionDetail: '6-Speed Automatic with SelectShift',
      groundClearance: '200 mm (High Clearance for rough roads & 550mm water wading)',
      fuelEconomy: '14-16 km/L blended provincial highway',
    },
    features: [
      '200mm High Ground Clearance for Provincial Asphalt & Rain',
      'Power Electric Tilt/Slide Sunroof',
      '8-inch SYNC 3 Touchscreen with Apple CarPlay',
      'Premium Leather-Trimmed 5-Seater Cabin',
      'Automatic Climate Control Aircon',
      'Rear View Camera with Ultrasonic Distance Sensors',
      '6 Airbags (Dual Front, Side, Curtain)',
      'Hill Launch Assist (HLA) & Electronic Stability Control',
    ],
    luggageCapacity: '3 Large Suitcases + 2 Carry-on Bags',
  },
  {
    id: 3,
    name: 'Toyota Tamaraw 2.4 GL (AT)',
    slug: 'toyota-tamaraw-2-4-gl-at',
    type: 'mpv',
    seats: 7,
    transmission: 'automatic',
    dailyRatePhp: 2800,
    imageUrl: '/src/assets/images/toyota_tamaraw_mpv_1792452725295.jpg',
    withDriverAvailable: true,
    status: 'available',
    specs: {
      engine: '2.4L 2GD-FTV 4-Cylinder DOHC 16V Turbo Diesel with Intercooler',
      power: '150 PS @ 3,400 rpm',
      torque: '400 Nm @ 1,600 - 2,000 rpm',
      transmissionDetail: '6-Speed Automatic Transmission with Sport Sequential Mode',
      groundClearance: '215 mm (Heavy-Duty Ladder Frame All-Terrain)',
      fuelEconomy: '15 km/L Diesel Economy',
    },
    features: [
      'Heavy-Duty 2.4L Turbo Diesel (High Torque for Eastern Visayas mountain passes)',
      '6-Speed Automatic Transmission',
      'Versatile 7-Seater Passenger Configuration',
      'Heavy-Duty IMV Ladder-Frame Chassis',
      'High-Output Dual Blower Air Conditioning',
      'Digital Touchscreen Infotainment with Bluetooth Audio',
      'Reinforced Suspension Built for Provincial Payloads',
      'Full Fleet Comprehensive Insurance with Roadside Rescue',
    ],
    luggageCapacity: '4 Large Travel Bags + 4 Backpacks',
  },
  {
    id: 4,
    name: 'Mitsubishi L300 FB (MT)',
    slug: 'mitsubishi-l300-fb-mt',
    type: 'van',
    seats: 15,
    transmission: 'manual',
    dailyRatePhp: 3500,
    imageUrl: '/src/assets/images/mitsubishi_l300_van_1792452724888.jpg',
    withDriverAvailable: true,
    status: 'available',
    specs: {
      engine: '2.2L 4N14 Euro-4 Common Rail Turbo Diesel with Intercooler',
      power: '99.25 PS @ 3,500 rpm',
      torque: '200 Nm @ 1,000 - 3,500 rpm',
      transmissionDetail: '5-Speed Manual Floor-Shift Transmission',
      groundClearance: '195 mm (Heavy-Duty Leaf Spring Commercial Suspension)',
      fuelEconomy: '13-15 km/L Diesel Economy',
    },
    features: [
      '15-Seater FB Deluxe Passenger Enclosure with Folding Bench Rows',
      '2.2L Euro-4 Turbo Diesel Engine (40% More Torque & Power)',
      'Heavy-Duty Dual Air Conditioning System (Front Cab & Rear Cabin)',
      'Reinforced Rear Leaf Spring Suspension for Large Tour Groups',
      'Unmatched Cargo & Luggage Volume for Airport Transfers',
      'Rugged Floor-Shift 5-Speed Manual for Full Control',
      'Ideal for Tacloban Airport Group Pickups, Weddings & Company Tours',
      'Compliant with Philippine LTFRB & LTO Commercial Safety Standards',
    ],
    luggageCapacity: 'Up to 12 Large Tour Bags + Equipment',
  },
];
