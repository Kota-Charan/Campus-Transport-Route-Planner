import React, { useState, useMemo } from "react";
import {
  Navigation,
  MapPin,
  Compass,
  Bus,
  Camera,
  Layers,
  Sparkles,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Eye,
  Info,
  Maximize2,
  Minimize2,
  Shield,
  Car,
  Sun,
  Trophy,
  BookOpen,
  Building,
  CornerDownRight
} from "lucide-react";
import { campusBuildingDetails } from "../data/buildingDetails.js";
import { campusRoadNetwork, getRoadNavigationRoute } from "../data/roadArchitecture.js";
import BuildingPlaceModal from "./BuildingPlaceModal.jsx";
import vignanCampusMap from "../assets/vignan-campus-map.jpg";

// Guided Virtual Campus Tour Waypoints
const campusTourStops = [
  {
    id: "GATE_1",
    buildingId: "AB",
    title: "VFSTR Main Entrance & Highway Gate",
    subtitle: "Guntur - Tenali Road (SH-112)",
    desc: "The primary ceremonial entrance to Vignan University. Features central security booths, automated boom barriers, student visitor parking, and the main shuttle boarding terminal.",
    x: 820,
    y: 545,
    tag: "Primary Entrance"
  },
  {
    id: "AB",
    buildingId: "AB",
    title: "A-Block (Administrative Block & Shuttle Hub)",
    subtitle: "VC Office & Central Administration",
    desc: "Spans 15,991 sq.m. The administrative core of the university housing the Vice-Chancellor's Secretariat, Registrar, Examination Cell, Mathematics Department, and Primary Campus Shuttle Hub.",
    x: 820,
    y: 430,
    tag: "Admin & Transit"
  },
  {
    id: "HB",
    buildingId: "HB",
    title: "H-Block (Aryabhatta Wing)",
    subtitle: "ECE, EEE & Chemistry Domain",
    desc: "State-of-the-art academic domain equipped with interactive smart classrooms, VLSI design labs, microelectronics centers, and spectroscopy testing bays.",
    x: 780,
    y: 340,
    tag: "Smart Classrooms"
  },
  {
    id: "CL",
    buildingId: "CL",
    title: "NTR Central Library & Knowledge Center",
    subtitle: "Automated Digital Research Pavilion",
    desc: "Iconic octagonal architectural center with RFID automated checkout, e-ShodhSindhu digital network, 100,000+ volumes, IEEE digital terminals, and 24/7 exam reading halls.",
    x: 660,
    y: 440,
    tag: "Central Library"
  },
  {
    id: "CRICKET",
    buildingId: "UB",
    title: "University International Cricket Ground",
    subtitle: "Athletic Stadium & Convocation Arena",
    desc: "Full international-sized turf cricket pitch with perimeter floodlights, 400m running tracks, adjoining convocation pavilion, tennis courts, and basketball arenas.",
    x: 440,
    y: 250,
    tag: "Sports Complex"
  },
  {
    id: "UB",
    buildingId: "UB",
    title: "U-Block (Technology & Lab Complex)",
    subtitle: "Center of Excellence & Engineering Labs",
    desc: "Houses the Center of Excellence for Composite Materials, Mechanical & Civil Engineering departments, heavy structures workshops, and prototyping studios.",
    x: 440,
    y: 340,
    tag: "Engineering Labs"
  },
  {
    id: "RES",
    buildingId: "RES",
    title: "West Residential Sectors (Hostels)",
    subtitle: "Student Accommodations & Dining Halls",
    desc: "Lush residential quarters alongside Vignan Eco-Pond. Features Boys Hostel Complex, Girls Hostel Complex, International Student Wing, dining mess, and gyms.",
    x: 130,
    y: 240,
    tag: "Student Housing"
  }
];

// Interactive Aerial Map Hotspots (percentage coordinates calibrated to the masterplan)
const aerialHotspots = [
  {
    id: "AB",
    buildingId: "AB",
    num: "2",
    name: "A-Block",
    subtitle: "Admin & Shuttle Hub",
    xPercent: 77.5,
    yPercent: 73.9,
    color: "#2563eb"
  },
  {
    id: "CL",
    buildingId: "CL",
    num: "3",
    name: "NTR Central Library",
    subtitle: "Knowledge Resource Centre",
    xPercent: 64.2,
    yPercent: 73.2,
    color: "#0284c7"
  },
  {
    id: "HB",
    buildingId: "HB",
    num: "4",
    name: "H-Block",
    subtitle: "Aryabhatta Wing (ECE/EEE)",
    xPercent: 72.4,
    yPercent: 59.8,
    color: "#16a34a"
  },
  {
    id: "NB",
    buildingId: "NB",
    num: "8",
    name: "N-Block",
    subtitle: "Outreach & Admissions",
    xPercent: 56.5,
    yPercent: 59.6,
    color: "#d97706"
  },
  {
    id: "UB",
    buildingId: "UB",
    num: "10",
    name: "U-Block",
    subtitle: "Tech & Labs (Mech/Civil)",
    xPercent: 44.0,
    yPercent: 61.6,
    color: "#ea580c"
  },
  {
    id: "RES",
    buildingId: "RES",
    num: "H",
    name: "Residential Hostels",
    subtitle: "Boys & Girls Complex",
    xPercent: 13.3,
    yPercent: 39.7,
    color: "#9333ea"
  },
  {
    id: "CRICKET",
    buildingId: "UB",
    num: "11",
    name: "Cricket Ground",
    subtitle: "Sports & Convocation",
    xPercent: 43.8,
    yPercent: 50.0,
    color: "#059669"
  },
  {
    id: "GATE_1",
    buildingId: "AB",
    num: "G1",
    name: "Gate 1: Main Entrance",
    subtitle: "Highway Access & Security",
    xPercent: 76.1,
    yPercent: 87.8,
    color: "#16a34a"
  },
  {
    id: "GATE_2",
    buildingId: "CL",
    num: "G2",
    name: "Gate 2: Library Gate",
    subtitle: "Promenade & Parking",
    xPercent: 51.3,
    yPercent: 77.9,
    color: "#0284c7"
  },
  {
    id: "GATE_3",
    buildingId: "RES",
    num: "G3",
    name: "Gate 3: LARA Gate",
    subtitle: "Hostels & Pharmacy Access",
    xPercent: 8.8,
    yPercent: 66.6,
    color: "#475569"
  }
];

export default function ThematicCampusMap({
  locations,
  coordinates,
  start,
  destination,
  route,
  onSelectStart,
  onSelectDestination
}) {
  const [mapStyle, setMapStyle] = useState("thematic"); // 'thematic' | 'satellite'
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'academic' | 'gates' | 'sports' | 'green'
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [tourIndex, setTourIndex] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);
  const [showTurnSteps, setShowTurnSteps] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Turn-by-Turn Route Navigation
  const roadNavRoute = useMemo(() => {
    return getRoadNavigationRoute(start, destination);
  }, [start, destination]);

  // Scaled Polyline for the 1000x620 Thematic SVG ViewBox
  const thematicNavPolyline = useMemo(() => {
    if (!roadNavRoute || !roadNavRoute.waypoints) return null;
    return roadNavRoute.waypoints
      .map((p) => `${p.x * 10},${p.y * 6.2}`)
      .join(" ");
  }, [roadNavRoute]);

  // Current tour stop
  const currentTourStop = campusTourStops[tourIndex];

  const handleNextTourStop = () => {
    setTourIndex((prev) => (prev + 1) % campusTourStops.length);
  };

  const handlePrevTourStop = () => {
    setTourIndex((prev) => (prev - 1 + campusTourStops.length) % campusTourStops.length);
  };

  const selectedBuilding = selectedBuildingId
    ? campusBuildingDetails[selectedBuildingId]
    : null;

  return (
    <div className="thematic-map-card">
      {/* Top Controls Header */}
      <div className="thematic-topbar">
        <div className="thematic-title-area">
          <div className="thematic-badge-row">
            <span className="badge-official">VFSTR MASTERPLAN</span>
            <span className="badge-theme">Thematic Cartography</span>
          </div>
          <h3>Vignan University Campus Architectural Map</h3>
        </div>

        <div className="thematic-actions-row">
          {/* Style Switcher */}
          <div className="style-switch-group">
            <button
              type="button"
              className={`btn-style-pill ${mapStyle === "thematic" ? "active" : ""}`}
              onClick={() => setMapStyle("thematic")}
              title="Architectural Vector Masterplan with Gates & Road Architecture"
            >
              <Layers size={13} />
              <span>Thematic Map</span>
            </button>
            <button
              type="button"
              className={`btn-style-pill ${mapStyle === "satellite" ? "active" : ""}`}
              onClick={() => setMapStyle("satellite")}
              title="Official 3D Venue & Aerial View"
            >
              <Eye size={13} />
              <span>Aerial 3D View</span>
            </button>
          </div>

          {/* Tour Toggle */}
          <button
            type="button"
            className={`btn-tour-pill ${isTourActive ? "active" : ""}`}
            onClick={() => setIsTourActive(!isTourActive)}
            title="Start Virtual Campus Tour"
          >
            <Compass size={14} />
            <span>{isTourActive ? "Exit Tour" : "Campus Tour"}</span>
          </button>
        </div>
      </div>

      {/* Layer Filter Toolbar */}
      {mapStyle === "thematic" && (
        <div className="thematic-filter-bar">
          <span className="filter-title">MAP LAYERS:</span>
          <div className="filter-chips-row">
            <button
              type="button"
              className={`chip-layer ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <span>All Infrastructure</span>
            </button>
            <button
              type="button"
              className={`chip-layer ${activeFilter === "academic" ? "active" : ""}`}
              onClick={() => setActiveFilter("academic")}
            >
              <Building size={12} />
              <span>Academic Blocks</span>
            </button>
            <button
              type="button"
              className={`chip-layer ${activeFilter === "gates" ? "active" : ""}`}
              onClick={() => setActiveFilter("gates")}
            >
              <Shield size={12} />
              <span>Entries &amp; Exits</span>
            </button>
            <button
              type="button"
              className={`chip-layer ${activeFilter === "sports" ? "active" : ""}`}
              onClick={() => setActiveFilter("sports")}
            >
              <Trophy size={12} />
              <span>Sports &amp; Arenas</span>
            </button>
            <button
              type="button"
              className={`chip-layer ${activeFilter === "green" ? "active" : ""}`}
              onClick={() => setActiveFilter("green")}
            >
              <Sun size={12} />
              <span>Solar &amp; Green Footprint</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Display Canvas */}
      <div className="thematic-canvas-wrapper" aria-label="VFSTR Campus Thematic Masterplan">
        {mapStyle === "thematic" ? (
          /* =================================================================
             1. THEMATIC VECTOR MAP (SVG MASTERPLAN)
             ================================================================= */
          <svg
            className="thematic-svg"
            viewBox="0 0 1000 620"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Patterns & Gradients */}
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>

              <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>

              <linearGradient id="cricketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>

              <linearGradient id="highwayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="navFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <filter id="buildingDropShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.22" />
              </filter>

              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Base Campus Terrain Background */}
            <rect x="0" y="0" width="1000" height="620" fill="url(#grassGrad)" />

            {/* Campus Boundary Wall Outline */}
            <rect
              x="20"
              y="20"
              width="960"
              height="570"
              rx="24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Green Quads, Botanical Gardens & Parks */}
            <rect x="680" y="320" width="80" height="90" rx="16" fill="#a7f3d0" opacity="0.6" />
            <circle cx="440" cy="400" r="35" fill="#a7f3d0" opacity="0.5" />
            <rect x="520" y="380" width="90" height="60" rx="12" fill="#bbf7d0" opacity="0.5" />
            <rect x="230" y="380" width="70" height="90" rx="14" fill="#a7f3d0" opacity="0.5" />

            {/* 1-MW Solar PV Plant Zone */}
            <g className={`map-layer-group ${activeFilter === "sports" || activeFilter === "academic" ? "dimmed" : ""}`}>
              <rect x="490" y="50" width="160" height="70" rx="8" fill="url(#solarGrad)" filter="url(#buildingDropShadow)" />
              {/* Solar cell grid lines */}
              <line x1="490" y1="73" x2="650" y2="73" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              <line x1="490" y1="96" x2="650" y2="96" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              <line x1="530" y1="50" x2="530" y2="120" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              <line x1="570" y1="50" x2="570" y2="120" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              <line x1="610" y1="50" x2="610" y2="120" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              <text x="570" y="90" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.05em">
                ☀️ 1-MW ROOFTOP SOLAR PV PLANT
              </text>
            </g>

            {/* Vignan Eco-Pond & Rainwater Harvesting Lake */}
            <g className={`map-layer-group ${activeFilter === "sports" || activeFilter === "academic" ? "dimmed" : ""}`}>
              <ellipse cx="160" cy="340" rx="65" ry="45" fill="url(#pondGrad)" filter="url(#buildingDropShadow)" />
              <ellipse cx="160" cy="340" rx="50" ry="32" fill="#7dd3fc" opacity="0.4" />
              <text x="160" y="343" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
                💧 VIGNAN ECO-POND
              </text>
            </g>

            {/* International Cricket Stadium & Grounds */}
            <g className={`map-layer-group ${activeFilter === "green" ? "dimmed" : ""}`}>
              {/* Outfield Oval */}
              <ellipse cx="440" cy="245" rx="100" ry="68" fill="url(#cricketGrad)" stroke="#22c55e" strokeWidth="2.5" />
              {/* Boundary rope */}
              <ellipse cx="440" cy="245" rx="88" ry="58" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="4 3" />
              {/* Pitch */}
              <rect x="432" y="225" width="16" height="40" rx="2" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
              <text x="440" y="210" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="800">
                🏏 CRICKET STADIUM (#11)
              </text>
            </g>

            {/* Sports Courts & Fields */}
            <g className={`map-layer-group ${activeFilter === "academic" || activeFilter === "green" ? "dimmed" : ""}`}>
              {/* Hockey Field (East) */}
              <rect x="830" y="360" width="75" height="95" rx="6" fill="#6ee7b7" stroke="#059669" strokeWidth="1.5" />
              <text x="867" y="412" textAnchor="middle" fill="#065f46" fontSize="7.5" fontWeight="700">
                🏑 HOCKEY FIELD (#6)
              </text>

              {/* Sports Arena 1 (Kabaddi, Kho-Kho) */}
              <rect x="560" y="180" width="85" height="60" rx="6" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <text x="602" y="214" textAnchor="middle" fill="#9a3412" fontSize="7.5" fontWeight="700">
                🏐 SPORTS ARENA 1 (#9)
              </text>

              {/* Sports Arena 2 & Tennis (West) */}
              <rect x="235" y="180" width="75" height="65" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
              <text x="272" y="216" textAnchor="middle" fill="#1e40af" fontSize="7.5" fontWeight="700">
                🏀 SPORTS ARENA 2 (#13)
              </text>

              {/* Flea Market & Amusement Arena */}
              <rect x="235" y="260" width="75" height="55" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="272" y="292" textAnchor="middle" fill="#854d0e" fontSize="7.5" fontWeight="700">
                🎪 FLEA MARKET (#14)
              </text>
            </g>

            {/* =============================================================
               ROAD ARCHITECTURE (ROADS, HIGHWAYS, AND AVENUES)
               ============================================================= */}
            <g className="roads-layer">
              {/* South Highway (Guntur - Tenali Road) */}
              <line x1="40" y1="540" x2="960" y2="560" stroke="#1e293b" strokeWidth="32" strokeLinecap="round" />
              <line x1="40" y1="540" x2="960" y2="560" stroke="#475569" strokeWidth="26" strokeLinecap="round" />
              {/* Highway Yellow Center Divider */}
              <line x1="45" y1="540" x2="955" y2="560" stroke="#facc15" strokeWidth="1.8" strokeDasharray="9 6" />

              {/* Main Campus Boulevard (Gate 1 -> A-Block -> H-Block -> Boys Hostel -> Gate 4) */}
              <polyline
                points="820,555 820,430 780,340 800,240 820,70"
                stroke="#1e293b"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="820,555 820,430 780,340 800,240 820,70"
                stroke="#f8fafc"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* NTR Library Promenade (A-Block to Library & Central Crossroads) */}
              <polyline
                points="820,430 660,440 600,380"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="820,430 660,440 600,380"
                stroke="#f8fafc"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gate 2 Access Road */}
              <polyline
                points="520,545 660,440"
                stroke="#1e293b"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <polyline
                points="520,545 660,440"
                stroke="#f8fafc"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Central Academic Spine (Library -> N-Block Plaza) */}
              <polyline
                points="780,340 600,380 560,320"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="780,340 600,380 560,320"
                stroke="#f8fafc"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Technology Corridor (N-Block -> U-Block -> Convocation) */}
              <polyline
                points="560,320 440,340 330,350"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="560,320 440,340 330,350"
                stroke="#f8fafc"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Cricket Ground Ring Road (Perimeter Oval Loop) */}
              <polyline
                points="560,320 580,250 560,165 440,150 330,175 330,350"
                stroke="#1e293b"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="560,320 580,250 560,165 440,150 330,175 330,350"
                stroke="#f1f5f9"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* West Residential Parkway (Convocation -> Lake -> Hostels) */}
              <polyline
                points="330,350 240,280 180,320 130,240"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="330,350 240,280 180,320 130,240"
                stroke="#f8fafc"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gate 3 Link to West Campus */}
              <polyline
                points="120,535 120,430 130,240"
                stroke="#1e293b"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <polyline
                points="120,535 120,430 130,240"
                stroke="#f8fafc"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>

            {/* Pedestrian Zebra Crossings at Major Intersections */}
            <g className="crosswalks">
              <line x1="810" y1="460" x2="830" y2="460" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="645" y1="435" x2="645" y2="450" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="550" y1="320" x2="570" y2="320" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="430" y1="340" x2="450" y2="340" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 2" />
            </g>

            {/* Active Turn-by-Turn Route Navigation Polyline */}
            {thematicNavPolyline && (
              <g className="active-nav-route">
                {/* Glowing halo */}
                <polyline
                  points={thematicNavPolyline}
                  fill="none"
                  stroke="#1a73e8"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />
                {/* Main animated directional stroke */}
                <polyline
                  points={thematicNavPolyline}
                  fill="none"
                  stroke="url(#navFlowGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="9 5"
                  className="nav-active-animated"
                  filter="url(#routeGlow)"
                />
              </g>
            )}

            {/* =============================================================
               CAMPUS BUILDINGS (ARCHITECTURAL FOOTPRINTS & ROOFS)
               ============================================================= */}
            <g className="buildings-layer">
              {/* 1. A-Block (Administrative Block) */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("AB")}
                onMouseEnter={() => setHoveredNode("AB")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect x="765" y="410" width="110" height="60" rx="8" fill="#1e3a8a" filter="url(#buildingDropShadow)" />
                <rect x="770" y="415" width="100" height="50" rx="5" fill="#3b82f6" />
                {/* Pillared Entrance Core */}
                <rect x="805" y="445" width="30" height="20" rx="3" fill="#1d4ed8" />
                <text x="820" y="438" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                  A-BLOCK (#2)
                </text>
                <text x="820" y="450" textAnchor="middle" fill="#dbeafe" fontSize="7" fontWeight="600">
                  VC Office &amp; Shuttle Hub
                </text>
              </g>

              {/* 2. H-Block (Aryabhatta Wing) */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("HB")}
                onMouseEnter={() => setHoveredNode("HB")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect x="730" y="315" width="100" height="55" rx="8" fill="#4c1d95" filter="url(#buildingDropShadow)" />
                <rect x="735" y="320" width="90" height="45" rx="5" fill="#7c3aed" />
                <text x="780" y="342" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                  H-BLOCK (#4)
                </text>
                <text x="780" y="354" textAnchor="middle" fill="#ede9fe" fontSize="7" fontWeight="600">
                  Aryabhatta / ECE &amp; EEE
                </text>
              </g>

              {/* 3. NTR Central Library (Octagonal Building) */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("CL")}
                onMouseEnter={() => setHoveredNode("CL")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <polygon
                  points="660,405 695,420 705,455 680,485 640,485 615,455 625,420"
                  fill="#064e3b"
                  filter="url(#buildingDropShadow)"
                />
                <polygon
                  points="660,412 690,425 698,452 676,478 644,478 622,452 630,425"
                  fill="#059669"
                />
                <circle cx="660" cy="445" r="16" fill="#10b981" />
                <text x="660" y="443" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
                  NTR LIB
                </text>
                <text x="660" y="454" textAnchor="middle" fill="#d1fae5" fontSize="6.5" fontWeight="700">
                  e-Shodh (#3)
                </text>
              </g>

              {/* 4. N-Block (Outreach Wing & MHP) */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("NB")}
                onMouseEnter={() => setHoveredNode("NB")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* U-Shaped Complex */}
                <path
                  d="M515,295 L605,295 L605,345 L580,345 L580,320 L540,320 L540,345 L515,345 Z"
                  fill="#155e75"
                  filter="url(#buildingDropShadow)"
                />
                <path
                  d="M520,300 L600,300 L600,340 L585,340 L585,315 L535,315 L535,340 L520,340 Z"
                  fill="#0891b2"
                />
                <text x="560" y="310" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                  N-BLOCK (#8)
                </text>
                <text x="560" y="335" textAnchor="middle" fill="#cffafe" fontSize="6.5" fontWeight="600">
                  Outreach &amp; Int'l
                </text>
              </g>

              {/* 5. U-Block (Technology & Lab Complex) */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("UB")}
                onMouseEnter={() => setHoveredNode("UB")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect x="390" y="315" width="105" height="60" rx="8" fill="#78350f" filter="url(#buildingDropShadow)" />
                <rect x="395" y="320" width="95" height="50" rx="5" fill="#d97706" />
                <text x="442" y="342" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
                  U-BLOCK (#10)
                </text>
                <text x="442" y="355" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="600">
                  Composite Materials CoE
                </text>
              </g>

              {/* Convocation Hall (#12) */}
              <g className="building-block" onClick={() => setSelectedBuildingId("UB")}>
                <polygon points="305,335 355,325 365,365 315,375" fill="#7f1d1d" filter="url(#buildingDropShadow)" />
                <polygon points="310,338 350,330 360,362 320,370" fill="#dc2626" />
                <text x="335" y="352" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700">
                  CONVOCATION (#12)
                </text>
              </g>

              {/* 6. Residential Sectors (Boys Hostel & Girls Hostel Complexes) */}
              {/* West Girls Hostel Complex */}
              <g
                className="building-block"
                onClick={() => setSelectedBuildingId("RES")}
                onMouseEnter={() => setHoveredNode("RES")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect x="80" y="210" width="95" height="65" rx="8" fill="#881337" filter="url(#buildingDropShadow)" />
                <rect x="85" y="215" width="85" height="55" rx="5" fill="#e11d48" />
                <text x="127" y="240" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
                  GIRLS HOSTEL
                </text>
                <text x="127" y="252" textAnchor="middle" fill="#ffe4e6" fontSize="6.5" fontWeight="600">
                  West Residence Sector
                </text>
              </g>

              {/* East Boys Hostel Complex */}
              <g className="building-block" onClick={() => setSelectedBuildingId("RES")}>
                <rect x="760" y="210" width="85" height="55" rx="8" fill="#881337" filter="url(#buildingDropShadow)" />
                <rect x="765" y="215" width="75" height="45" rx="5" fill="#be123c" />
                <text x="802" y="238" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
                  BOYS HOSTEL
                </text>
                <text x="802" y="250" textAnchor="middle" fill="#ffe4e6" fontSize="6.5" fontWeight="600">
                  East Residence Sector
                </text>
              </g>

              {/* Vignan LARA Technology Complex (Far West) */}
              <g className="building-block">
                <rect x="60" y="380" width="90" height="50" rx="6" fill="#334155" filter="url(#buildingDropShadow)" />
                <rect x="65" y="385" width="80" height="40" rx="4" fill="#64748b" />
                <text x="105" y="408" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700">
                  VIGNAN LARA
                </text>
              </g>

              {/* Pharmacy College Complex */}
              <g className="building-block">
                <rect x="740" y="140" width="75" height="45" rx="6" fill="#1e293b" filter="url(#buildingDropShadow)" />
                <rect x="745" y="145" width="65" height="35" rx="4" fill="#475569" />
                <text x="777" y="166" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="700">
                  PHARMACY COLL
                </text>
              </g>
            </g>

            {/* =============================================================
               ALL ENTRIES, EXITS, CHECKPOINTS & PARKING BAYS
               ============================================================= */}
            <g className={`gates-layer ${activeFilter === "academic" ? "dimmed" : ""}`}>
              {/* Gate 1: VFSTR MAIN ENTRANCE (Highway South-East) */}
              <g className="gate-marker" onClick={() => setSelectedBuildingId("AB")}>
                <rect x="770" y="535" width="100" height="26" rx="6" fill="#15803d" stroke="#ffffff" strokeWidth="1.5" />
                <text x="820" y="552" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
                  🚪 GATE 1: VFSTR MAIN ENTRANCE
                </text>
                {/* Security Barrier Icon */}
                <circle cx="820" cy="522" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                <text x="820" y="525" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="800">
                  IN
                </text>
              </g>

              {/* Gate 2: NTR LIBRARY ENTRANCE (Highway South-Center) */}
              <g className="gate-marker" onClick={() => setSelectedBuildingId("CL")}>
                <rect x="470" y="530" width="105" height="24" rx="6" fill="#0369a1" stroke="#ffffff" strokeWidth="1.5" />
                <text x="522" y="546" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
                  🚪 GATE 2: NTR LIBRARY GATE
                </text>
              </g>

              {/* Gate 3: VIGNAN LARA ENTRANCE (Highway South-West) */}
              <g className="gate-marker" onClick={() => setSelectedBuildingId("RES")}>
                <rect x="70" y="520" width="100" height="24" rx="6" fill="#475569" stroke="#ffffff" strokeWidth="1.5" />
                <text x="120" y="536" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
                  🚪 GATE 3: LARA &amp; HOSTEL GATE
                </text>
              </g>

              {/* Gate 4: NORTH SERVICE & RESIDENTIAL EXIT */}
              <g className="gate-marker">
                <rect x="770" y="55" width="100" height="22" rx="5" fill="#b91c1c" stroke="#ffffff" strokeWidth="1.5" />
                <text x="820" y="70" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">
                  🚪 GATE 4: NORTH EXIT
                </text>
              </g>

              {/* PARKING BAY 1: Visitor & Four-Wheeler Parking (Near Gate 1) */}
              <g className="parking-bay">
                <rect x="880" y="475" width="65" height="45" rx="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
                <text x="912" y="495" textAnchor="middle" fill="#1e293b" fontSize="7.5" fontWeight="700">
                  🅿️ VISITOR
                </text>
                <text x="912" y="507" textAnchor="middle" fill="#64748b" fontSize="6.5">
                  PARKING
                </text>
              </g>

              {/* PARKING BAY 2: Student 2-Wheeler Parking (Near Gate 2) */}
              <g className="parking-bay">
                <rect x="420" y="480" width="65" height="40" rx="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
                <text x="452" y="498" textAnchor="middle" fill="#1e293b" fontSize="7" fontWeight="700">
                  🛵 2-WHEELER
                </text>
                <text x="452" y="509" textAnchor="middle" fill="#64748b" fontSize="6.5">
                  PARKING
                </text>
              </g>

              {/* Central Electric Shuttle Terminal (At A-Block) */}
              <g className="shuttle-terminal">
                <rect x="840" y="415" width="45" height="22" rx="4" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.2" />
                <text x="862" y="430" textAnchor="middle" fill="#1d4ed8" fontSize="6.5" fontWeight="800">
                  🚌 SHUTTLE
                </text>
              </g>
            </g>

            {/* Tour Focus Pulse Ring on Current Tour Stop */}
            {isTourActive && currentTourStop && (
              <g className="tour-focus-ring">
                <circle cx={currentTourStop.x} cy={currentTourStop.y} r="28" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 2">
                  <animate attributeName="r" values="20;34;20" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* Location Navigation Pins (Origin & Destination) */}
            {locations.map((loc) => {
              const coord = coordinates[loc.id];
              if (!coord) return null;

              const isStart = loc.id === start;
              const isDest = loc.id === destination;
              const svgX = coord.x * 10;
              const svgY = coord.y * 6.2;

              if (!isStart && !isDest) return null;

              return (
                <g key={loc.id} className="active-nav-pin" transform={`translate(${svgX}, ${svgY})`}>
                  <circle r="18" fill={isStart ? "#2563eb" : "#dc2626"} filter="url(#routeGlow)" />
                  <circle r="14" fill="#ffffff" />
                  <text y="4" textAnchor="middle" fill={isStart ? "#2563eb" : "#dc2626"} fontSize="9" fontWeight="900">
                    {isStart ? "A" : "B"}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          /* =================================================================
             2. SATELLITE / ENHANCED CLEAN 3D VENUE MASTERPLAN
             ================================================================= */
          <div className="satellite-map-container" aria-label="Enhanced Vignan Campus Aerial 3D View">
            <img
              src={vignanCampusMap}
              alt="Enhanced Clean Vignan University 3D Venue Map"
              className="thematic-satellite-img"
            />

            {/* Interactive SVG route line connecting Origin and Destination on Aerial Map */}
            {start && destination && (
              <svg className="aerial-route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="aerialRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <filter id="aerialGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {(() => {
                  const sSpot = aerialHotspots.find((h) => h.id === start);
                  const dSpot = aerialHotspots.find((h) => h.id === destination);
                  if (!sSpot || !dSpot) return null;
                  return (
                    <g>
                      <line
                        x1={sSpot.xPercent}
                        y1={sSpot.yPercent}
                        x2={dSpot.xPercent}
                        y2={dSpot.yPercent}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeDasharray="2, 1.5"
                        strokeLinecap="round"
                        opacity="0.95"
                      />
                      <line
                        x1={sSpot.xPercent}
                        y1={sSpot.yPercent}
                        x2={dSpot.xPercent}
                        y2={dSpot.yPercent}
                        stroke="url(#aerialRouteGradient)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        filter="url(#aerialGlow)"
                      />
                    </g>
                  );
                })()}
              </svg>
            )}

            {/* Interactive Hotspot Badges on Aerial Map */}
            <div className="aerial-hotspots-layer">
              {aerialHotspots.map((spot) => {
                const isStart = spot.id === start;
                const isDest = spot.id === destination;
                const isActive = isStart || isDest;

                return (
                  <div
                    key={spot.id}
                    className={`aerial-hotspot-pin ${isActive ? "active-route" : ""} ${isStart ? "is-start" : ""} ${isDest ? "is-dest" : ""}`}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    onMouseEnter={() => setHoveredNode(spot.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      if (spot.buildingId) {
                        setSelectedBuildingId(spot.buildingId);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${spot.name} - View Google Maps Photos & Details`}
                  >
                    {/* Pulsing Beacon Ring for Origin or Destination */}
                    {isActive && (
                      <div
                        className="aerial-beacon-pulse"
                        style={{ borderColor: isStart ? "#2563eb" : "#dc2626" }}
                      />
                    )}

                    {/* Circular Pin Icon */}
                    <button
                      type="button"
                      className="aerial-pin-btn"
                      style={{
                        backgroundColor: isStart
                          ? "#2563eb"
                          : isDest
                          ? "#dc2626"
                          : spot.color
                      }}
                      title={`${spot.name}: Click to view photos & departments`}
                    >
                      {isStart ? "A" : isDest ? "B" : spot.num}
                    </button>

                    {/* Floating Pill Label */}
                    <div className="aerial-pin-pill">
                      <span className="aerial-pin-title">{spot.name}</span>
                      {isStart && <span className="aerial-role-badge start-badge">Origin</span>}
                      {isDest && <span className="aerial-role-badge dest-badge">Destination</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Guided Campus Tour Card Overlay */}
        {isTourActive && currentTourStop && (
          <div className="tour-walkthrough-card">
            <div className="tour-card-header">
              <span className="tour-stop-badge">
                Stop {tourIndex + 1} of {campusTourStops.length} · {currentTourStop.tag}
              </span>
              <button
                type="button"
                className="btn-tour-close"
                onClick={() => setIsTourActive(false)}
              >
                &times;
              </button>
            </div>
            <h4>{currentTourStop.title}</h4>
            <span className="tour-sub">{currentTourStop.subtitle}</span>
            <p className="tour-text">{currentTourStop.desc}</p>

            <div className="tour-footer">
              <button
                type="button"
                className="btn-tour-nav"
                onClick={handlePrevTourStop}
                title="Previous Stop"
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <button
                type="button"
                className="btn-tour-view-photo"
                onClick={() => setSelectedBuildingId(currentTourStop.buildingId)}
              >
                <Camera size={13} /> View Photos
              </button>

              <button
                type="button"
                className="btn-tour-nav primary"
                onClick={handleNextTourStop}
                title="Next Stop"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Floating Quick Route Card */}
        {thematicNavPolyline && route && (
          <div className="floating-thematic-route-card">
            <div className="route-pulse-dot" />
            <div className="route-info-text">
              <strong>{route.distance} km via VFSTR Campus Road Network</strong>
              <span>Est. {route.time} min · Recommended: {route.options.join(", ")}</span>
            </div>
            {roadNavRoute && (
              <button
                type="button"
                className="btn-turn-steps-toggle"
                onClick={() => setShowTurnSteps(!showTurnSteps)}
              >
                {showTurnSteps ? "Hide Steps" : "Directions"}
              </button>
            )}
          </div>
        )}

        {/* Turn-by-Turn Guidance Drawer */}
        {showTurnSteps && roadNavRoute && (
          <div className="thematic-turn-drawer">
            <div className="turn-drawer-top">
              <strong>Turn-by-Turn Route Guidance</strong>
              <button type="button" onClick={() => setShowTurnSteps(false)}>&times;</button>
            </div>
            <div className="turn-steps-scroll">
              {roadNavRoute.turns.map((step, idx) => (
                <div key={idx} className="turn-step-row">
                  <CornerDownRight size={14} className="turn-icon" />
                  <div className="step-desc">
                    <p>{step.instruction}</p>
                    <small>{step.distanceM}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thematic Legend & Gate Directory */}
      <div className="thematic-legend-grid">
        <div className="legend-col">
          <span className="legend-header">GATES &amp; ACCESS</span>
          <div className="legend-tags-list">
            <span className="gate-chip gate-green">Gate 1: Main Highway Entrance</span>
            <span className="gate-chip gate-blue">Gate 2: NTR Library Gate</span>
            <span className="gate-chip gate-slate">Gate 3: LARA &amp; Hostels</span>
            <span className="gate-chip gate-red">Gate 4: North Exit</span>
          </div>
        </div>

        <div className="legend-col">
          <span className="legend-header">ACADEMIC &amp; RESEARCH</span>
          <div className="legend-tags-list">
            <span className="block-chip chip-ab" onClick={() => setSelectedBuildingId("AB")}>A-Block (Admin &amp; Hub)</span>
            <span className="block-chip chip-hb" onClick={() => setSelectedBuildingId("HB")}>H-Block (Aryabhatta)</span>
            <span className="block-chip chip-cl" onClick={() => setSelectedBuildingId("CL")}>NTR Central Library</span>
            <span className="block-chip chip-ub" onClick={() => setSelectedBuildingId("UB")}>U-Block (Technology CoE)</span>
            <span className="block-chip chip-nb" onClick={() => setSelectedBuildingId("NB")}>N-Block (Outreach)</span>
            <span className="block-chip chip-res" onClick={() => setSelectedBuildingId("RES")}>Residential Hostels</span>
          </div>
        </div>

        <div className="legend-col">
          <span className="legend-header">GOOGLE MAPS INTERACTION</span>
          <p className="legend-hint-text">
            💡 <strong>Click any building or gate on the map</strong> to open the full Google Maps
            photo gallery, 360 street view, floor directory, and student reviews.
          </p>
        </div>
      </div>

      {/* Google Maps Place Details & Photo Viewer Modal */}
      {selectedBuilding && (
        <BuildingPlaceModal
          building={selectedBuilding}
          onClose={() => setSelectedBuildingId(null)}
          onSetAsStart={(id) => onSelectStart(id)}
          onSetAsDestination={(id) => onSelectDestination(id)}
        />
      )}
    </div>
  );
}

