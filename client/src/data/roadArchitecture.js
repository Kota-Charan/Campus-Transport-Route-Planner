// Campus Road Network Architecture for VFSTR Vadlamudi Campus
// Accurately aligned with the Official 3D Isometric Map

export const campusJunctions = {
  J_MAIN_GATE: { id: "J_MAIN_GATE", x: 75.0, y: 86.0, name: "VFSTR Main Entrance Gate" },
  J_AB_HUB: { id: "J_AB_HUB", x: 78.5, y: 73.5, name: "A-Block Shuttle Hub" },
  J_HB_FRONT: { id: "J_HB_FRONT", x: 74.5, y: 62.0, name: "H-Block (Aryabhatta Wing) Forecourt" },
  J_BOYS_HOSTEL: { id: "J_BOYS_HOSTEL", x: 76.0, y: 48.0, name: "Boys Hostel & Pharmacy Way" },
  J_LIB_GATE: { id: "J_LIB_GATE", x: 52.0, y: 82.0, name: "NTR Library Gate Entrance" },
  J_LIB_FRONT: { id: "J_LIB_FRONT", x: 66.5, y: 72.0, name: "NTR Central Library Forecourt" },
  J_ACADEMIC_CROSS: { id: "J_ACADEMIC_CROSS", x: 60.0, y: 64.0, name: "Central Academic Crossroads" },
  J_NB_FRONT: { id: "J_NB_FRONT", x: 55.0, y: 56.5, name: "N-Block (Outreach Wing) Plaza" },
  J_CRICKET_EAST: { id: "J_CRICKET_EAST", x: 56.0, y: 45.0, name: "Sports Arena 1 Junction" },
  J_CRICKET_NORTH: { id: "J_CRICKET_NORTH", x: 44.0, y: 38.0, name: "North Cricket Perimeter Road" },
  J_CRICKET_WEST: { id: "J_CRICKET_WEST", x: 35.0, y: 46.0, name: "Convocation Perimeter Junction" },
  J_UB_FRONT: { id: "J_UB_FRONT", x: 44.0, y: 59.0, name: "U-Block Technology Corridor" },
  J_CONVOCATION: { id: "J_CONVOCATION", x: 33.0, y: 60.0, name: "Convocation Hall Junction" },
  J_FLEA_MARKET: { id: "J_FLEA_MARKET", x: 24.0, y: 46.0, name: "Amusement Arena & Sports Arena 2 Way" },
  J_LAKE_BEND: { id: "J_LAKE_BEND", x: 18.0, y: 52.0, name: "Vignan Pond Promenade" },
  J_RES_HUB: { id: "J_RES_HUB", x: 13.5, y: 41.0, name: "Residential Sectors (Hostels) Terminal" },
  J_LARA_GATE: { id: "J_LARA_GATE", x: 9.0, y: 70.0, name: "Vignan LARA Entrance" }
};

// All physical road segments rendered on the campus map (Google Maps Road Architecture)
export const campusRoadNetwork = [
  // Highway along south boundary
  {
    id: "road-highway-1",
    name: "Guntur - Tenali Highway (SH-112)",
    type: "highway",
    points: [campusJunctions.J_LARA_GATE, campusJunctions.J_LIB_GATE, campusJunctions.J_MAIN_GATE]
  },
  // Main East Boulevard (Entrance to A-Block & H-Block)
  {
    id: "road-east-boulevard",
    name: "Main Campus Boulevard",
    type: "primary",
    points: [campusJunctions.J_MAIN_GATE, campusJunctions.J_AB_HUB, campusJunctions.J_HB_FRONT, campusJunctions.J_BOYS_HOSTEL]
  },
  // Library Walkway connecting Main Entrance, Library and Central Crossroads
  {
    id: "road-lib-promenade",
    name: "NTR Library Promenade",
    type: "primary",
    points: [campusJunctions.J_AB_HUB, campusJunctions.J_LIB_FRONT, campusJunctions.J_ACADEMIC_CROSS]
  },
  // Library Gate link to Library
  {
    id: "road-lib-gate-link",
    name: "Library Access Road",
    type: "secondary",
    points: [campusJunctions.J_LIB_GATE, campusJunctions.J_LIB_FRONT]
  },
  // Central Academic Spine (Library Crossroads -> N-Block)
  {
    id: "road-academic-spine",
    name: "Central Academic Spine",
    type: "primary",
    points: [campusJunctions.J_HB_FRONT, campusJunctions.J_ACADEMIC_CROSS, campusJunctions.J_NB_FRONT]
  },
  // Technology Corridor (N-Block -> U-Block -> Convocation)
  {
    id: "road-tech-corridor",
    name: "Technology Corridor",
    type: "primary",
    points: [campusJunctions.J_NB_FRONT, campusJunctions.J_UB_FRONT, campusJunctions.J_CONVOCATION]
  },
  // Cricket Ground Ring Road (Oval Loop)
  {
    id: "road-cricket-loop",
    name: "Cricket Ground Ring Road",
    type: "ring",
    points: [
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_CRICKET_EAST,
      campusJunctions.J_CRICKET_NORTH,
      campusJunctions.J_CRICKET_WEST,
      campusJunctions.J_CONVOCATION
    ]
  },
  // West Hostel Parkway (Convocation -> Lake Promenade -> Hostels Terminal)
  {
    id: "road-hostel-parkway",
    name: "West Residential Parkway",
    type: "primary",
    points: [
      campusJunctions.J_CONVOCATION,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ]
  },
  // Direct link from LARA Gate to Hostels
  {
    id: "road-lara-link",
    name: "LARA Hostel Access",
    type: "secondary",
    points: [campusJunctions.J_LARA_GATE, campusJunctions.J_LAKE_BEND, campusJunctions.J_RES_HUB]
  }
];

// Pre-computed road navigation path for every origin-destination pair
// Follows actual roads, curves, and turns on campus!
export const precomputedRoadRoutes = {
  // AB Routes
  "AB-HB": {
    waypoints: [
      campusJunctions.J_AB_HUB,
      { x: 77.0, y: 68.0, name: "Aryabhatta Connecting Lane" },
      campusJunctions.J_HB_FRONT
    ],
    turns: [
      { instruction: "Depart from A-Block Shuttle Hub", distanceM: "0 m", icon: "start" },
      { instruction: "Head north on Main Campus Boulevard", distanceM: "120 m", icon: "straight" },
      { instruction: "Turn slight left into H-Block Aryabhatta Wing forecourt", distanceM: "130 m", icon: "turn-left" },
      { instruction: "Arrive at destination: H-Block (Aryabhatta Wing)", distanceM: "250 m", icon: "destination" }
    ]
  },

  "AB-CL": {
    waypoints: [
      campusJunctions.J_AB_HUB,
      { x: 72.5, y: 73.0, name: "NTR Walkway" },
      campusJunctions.J_LIB_FRONT
    ],
    turns: [
      { instruction: "Depart from A-Block Shuttle Hub", distanceM: "0 m", icon: "start" },
      { instruction: "Head west on the shaded pedestrian NTR Walkway", distanceM: "50 m", icon: "straight" },
      { instruction: "Arrive at destination: NTR Central Library (Automated Library)", distanceM: "80 m", icon: "destination" }
    ]
  },

  "AB-NB": {
    waypoints: [
      campusJunctions.J_AB_HUB,
      campusJunctions.J_LIB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT
    ],
    turns: [
      { instruction: "Depart from A-Block Shuttle Hub", distanceM: "0 m", icon: "start" },
      { instruction: "Follow NTR Walkway west past the Central Library", distanceM: "90 m", icon: "straight" },
      { instruction: "Turn right onto Central Academic Spine", distanceM: "110 m", icon: "turn-right" },
      { instruction: "Continue straight past MHP Workshops", distanceM: "100 m", icon: "straight" },
      { instruction: "Arrive at destination: N-Block (Outreach Wing)", distanceM: "300 m", icon: "destination" }
    ]
  },

  "AB-UB": {
    waypoints: [
      campusJunctions.J_AB_HUB,
      campusJunctions.J_LIB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT,
      { x: 49.5, y: 58.0, name: "Technology Boulevard" },
      campusJunctions.J_UB_FRONT
    ],
    turns: [
      { instruction: "Board Campus Shuttle / Depart A-Block Shuttle Hub", distanceM: "0 m", icon: "start" },
      { instruction: "Proceed west on Main Boulevard past NTR Central Library", distanceM: "120 m", icon: "straight" },
      { instruction: "Continue onto Central Academic Spine past N-Block", distanceM: "240 m", icon: "straight" },
      { instruction: "Turn left onto Technology Corridor facing Cricket Ground", distanceM: "180 m", icon: "turn-left" },
      { instruction: "Arrive at destination: U-Block (Technology & Lab Complex)", distanceM: "600 m", icon: "destination" }
    ]
  },

  "AB-RES": {
    waypoints: [
      campusJunctions.J_AB_HUB,
      campusJunctions.J_LIB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_UB_FRONT,
      campusJunctions.J_CONVOCATION,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ],
    turns: [
      { instruction: "Board Express Campus Shuttle at A-Block Hub Terminal", distanceM: "0 m", icon: "start" },
      { instruction: "Travel west along Central Academic Corridor", distanceM: "280 m", icon: "straight" },
      { instruction: "Pass U-Block and Convocation Hall on your left", distanceM: "220 m", icon: "straight" },
      { instruction: "Curve right onto West Residential Parkway past Vignan Pond", distanceM: "250 m", icon: "curve-right" },
      { instruction: "Arrive at destination: Residential Sectors (Boys & Girls Hostels)", distanceM: "850 m", icon: "destination" }
    ]
  },

  // HB Routes
  "HB-UB": {
    waypoints: [
      campusJunctions.J_HB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT,
      { x: 49.5, y: 58.0, name: "Technology Boulevard" },
      campusJunctions.J_UB_FRONT
    ],
    turns: [
      { instruction: "Depart from H-Block (Aryabhatta Wing)", distanceM: "0 m", icon: "start" },
      { instruction: "Walk west through the Central Quadrangle", distanceM: "140 m", icon: "straight" },
      { instruction: "Pass N-Block and connect to Technology Corridor", distanceM: "160 m", icon: "straight" },
      { instruction: "Arrive at destination: U-Block (Technology Complex)", distanceM: "400 m", icon: "destination" }
    ]
  },

  "HB-NB": {
    waypoints: [
      campusJunctions.J_HB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT
    ],
    turns: [
      { instruction: "Depart from H-Block (Aryabhatta Wing)", distanceM: "0 m", icon: "start" },
      { instruction: "Walk directly west along Academic Cross lane", distanceM: "80 m", icon: "straight" },
      { instruction: "Arrive at destination: N-Block (Outreach Wing)", distanceM: "150 m", icon: "destination" }
    ]
  },

  "HB-CL": {
    waypoints: [
      campusJunctions.J_HB_FRONT,
      campusJunctions.J_AB_HUB,
      campusJunctions.J_LIB_FRONT
    ],
    turns: [
      { instruction: "Depart from H-Block (Aryabhatta Wing)", distanceM: "0 m", icon: "start" },
      { instruction: "Head south toward A-Block entrance", distanceM: "90 m", icon: "straight" },
      { instruction: "Turn right onto NTR Library Walkway", distanceM: "90 m", icon: "turn-right" },
      { instruction: "Arrive at destination: NTR Central Library", distanceM: "180 m", icon: "destination" }
    ]
  },

  "HB-RES": {
    waypoints: [
      campusJunctions.J_HB_FRONT,
      campusJunctions.J_CRICKET_EAST,
      campusJunctions.J_CRICKET_NORTH,
      campusJunctions.J_CRICKET_WEST,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ],
    turns: [
      { instruction: "Depart from H-Block / Board North Campus Shuttle", distanceM: "0 m", icon: "start" },
      { instruction: "Take North Cricket Ring Road around the stadium", distanceM: "260 m", icon: "curve-left" },
      { instruction: "Pass Sports Arena 2 & Amusement Flea Market", distanceM: "210 m", icon: "straight" },
      { instruction: "Continue along Vignan Pond Promenade", distanceM: "180 m", icon: "straight" },
      { instruction: "Arrive at destination: Residential Sectors", distanceM: "650 m", icon: "destination" }
    ]
  },

  // UB Routes
  "UB-NB": {
    waypoints: [
      campusJunctions.J_UB_FRONT,
      { x: 49.5, y: 58.0, name: "Technology Boulevard" },
      campusJunctions.J_NB_FRONT
    ],
    turns: [
      { instruction: "Depart from U-Block Technology Corridor", distanceM: "0 m", icon: "start" },
      { instruction: "Head east on Technology Boulevard facing Cricket Ground", distanceM: "220 m", icon: "straight" },
      { instruction: "Continue straight into N-Block Outreach Plaza", distanceM: "230 m", icon: "straight" },
      { instruction: "Arrive at destination: N-Block (Outreach Wing)", distanceM: "450 m", icon: "destination" }
    ]
  },

  "UB-CL": {
    waypoints: [
      campusJunctions.J_UB_FRONT,
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_LIB_FRONT
    ],
    turns: [
      { instruction: "Depart from U-Block (Technology & Lab Complex)", distanceM: "0 m", icon: "start" },
      { instruction: "Head east along Technology Boulevard past N-Block", distanceM: "240 m", icon: "straight" },
      { instruction: "Turn right onto Central Academic Spine", distanceM: "160 m", icon: "turn-right" },
      { instruction: "Follow NTR Walkway into Central Library Forecourt", distanceM: "150 m", icon: "straight" },
      { instruction: "Arrive at destination: NTR Central Library", distanceM: "550 m", icon: "destination" }
    ]
  },

  "UB-RES": {
    waypoints: [
      campusJunctions.J_UB_FRONT,
      campusJunctions.J_CONVOCATION,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ],
    turns: [
      { instruction: "Depart from U-Block Technology Corridor", distanceM: "0 m", icon: "start" },
      { instruction: "Walk west toward Convocation Hall Arena", distanceM: "110 m", icon: "straight" },
      { instruction: "Turn right onto West Residential Parkway", distanceM: "120 m", icon: "turn-right" },
      { instruction: "Follow shaded lakeside walkway to Hostels", distanceM: "120 m", icon: "straight" },
      { instruction: "Arrive at destination: Residential Sectors", distanceM: "350 m", icon: "destination" }
    ]
  },

  // NB Routes
  "NB-CL": {
    waypoints: [
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_LIB_FRONT
    ],
    turns: [
      { instruction: "Depart from N-Block (Outreach Wing)", distanceM: "0 m", icon: "start" },
      { instruction: "Head south along Central Academic Spine", distanceM: "110 m", icon: "straight" },
      { instruction: "Turn left onto NTR Library Promenade", distanceM: "110 m", icon: "turn-left" },
      { instruction: "Arrive at destination: NTR Central Library", distanceM: "220 m", icon: "destination" }
    ]
  },

  "NB-RES": {
    waypoints: [
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_UB_FRONT,
      campusJunctions.J_CONVOCATION,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ],
    turns: [
      { instruction: "Depart from N-Block / Board Westbound Bicycle Share", distanceM: "0 m", icon: "start" },
      { instruction: "Ride west along Technology Corridor past U-Block", distanceM: "260 m", icon: "straight" },
      { instruction: "Pass Convocation Hall and Flea Market Arena", distanceM: "220 m", icon: "straight" },
      { instruction: "Follow paved bike lane past Vignan Pond", distanceM: "220 m", icon: "straight" },
      { instruction: "Arrive at destination: Residential Sectors", distanceM: "700 m", icon: "destination" }
    ]
  },

  // CL Routes
  "CL-RES": {
    waypoints: [
      campusJunctions.J_LIB_FRONT,
      campusJunctions.J_ACADEMIC_CROSS,
      campusJunctions.J_NB_FRONT,
      campusJunctions.J_UB_FRONT,
      campusJunctions.J_CONVOCATION,
      campusJunctions.J_FLEA_MARKET,
      campusJunctions.J_LAKE_BEND,
      campusJunctions.J_RES_HUB
    ],
    turns: [
      { instruction: "Depart from NTR Central Library / Board Campus Shuttle", distanceM: "0 m", icon: "start" },
      { instruction: "Follow Central Promenade northwest to Academic Spine", distanceM: "160 m", icon: "straight" },
      { instruction: "Pass N-Block and turn onto Technology Corridor", distanceM: "240 m", icon: "turn-left" },
      { instruction: "Continue past Convocation Hall onto West Parkway", distanceM: "210 m", icon: "straight" },
      { instruction: "Proceed past Vignan Lake Promenade to Hostels Terminal", distanceM: "190 m", icon: "straight" },
      { instruction: "Arrive at destination: Residential Sectors", distanceM: "800 m", icon: "destination" }
    ]
  }
};

/**
 * Gets the actual road waypoints and turn instructions between two locations.
 * Automatically mirrors the route if queried in reverse.
 */
export function getRoadNavigationRoute(startId, destId) {
  if (!startId || !destId || startId === destId) return null;

  const key = `${startId}-${destId}`;
  const reverseKey = `${destId}-${startId}`;

  if (precomputedRoadRoutes[key]) {
    return precomputedRoadRoutes[key];
  }

  if (precomputedRoadRoutes[reverseKey]) {
    const rev = precomputedRoadRoutes[reverseKey];
    return {
      waypoints: [...rev.waypoints].reverse(),
      turns: [
        { instruction: `Depart from ${startId}`, distanceM: "0 m", icon: "start" },
        ...rev.turns.slice(1, -1).reverse().map((t) => ({
          ...t,
          instruction: t.instruction.replace("Turn left", "TEMP").replace("Turn right", "Turn left").replace("TEMP", "Turn right")
        })),
        { instruction: `Arrive at destination: ${destId}`, distanceM: `${rev.turns[rev.turns.length - 1].distanceM}`, icon: "destination" }
      ]
    };
  }

  return null;
}

