// Configuration Object for Vignan University Pilot Project
export const vignanUniversityData = {
  profile: {
    officialName: "Vignan's Foundation for Science, Technology & Research (VFSTR)",
    status: "Deemed-to-be University (UGC Approved Section 3)",
    accreditation: "NAAC 'A+' Grade",
    academicModel: "Choice Based Credit System (CBCS) & NEP 2020 Aligned",
    greenFootprint: "1-MW Rooftop Solar PV Plant, Rainwater Harvesting, Campus Sewage Treatment Plant"
  },
  
  campusLocations: [
    { 
      id: "AB", 
      name: "A-Block (Administrative Block)", 
      details: "Spans 15,991 sq.m. Houses VC Office, Registrar, Exam Cell, and Mathematics Dept. Primary Campus Shuttle Hub.",
      category: "Administration & Hub",
      iconType: "admin",
      color: "#2563eb",
      badge: "Main Shuttle Hub",
      mapNumber: 2
    },
    { 
      id: "HB", 
      name: "H-Block (Aryabhatta Wing)", 
      details: "Main academic domain for ECE, EEE, and Chemistry departments. Equipped with upgraded smart classrooms.",
      category: "Academic Domain",
      iconType: "academic",
      color: "#7c3aed",
      badge: "Smart Classrooms",
      mapNumber: 4
    },
    { 
      id: "UB", 
      name: "U-Block (Technology & Lab Complex)", 
      details: "Academic center for Mechanical & Civil Engineering. Houses the Center of Excellence for Composite Materials.",
      category: "Labs & Technology",
      iconType: "labs",
      color: "#d97706",
      badge: "Center of Excellence",
      mapNumber: 10
    },
    { 
      id: "NB", 
      name: "N-Block (Outreach Wing)", 
      details: "Houses International Relations and student outreach coordination divisions.",
      category: "Outreach & Global",
      iconType: "outreach",
      color: "#0891b2",
      badge: "International Affairs",
      mapNumber: 8
    },
    { 
      id: "CL", 
      name: "NTR Central Library", 
      details: "Fully automated library with digital e-ShodhSindhu access networks.",
      category: "Library & Research",
      iconType: "library",
      color: "#059669",
      badge: "e-ShodhSindhu",
      mapNumber: 3
    },
    { 
      id: "RES", 
      name: "Residential Sectors", 
      details: "Includes Boys Hostel Complex, Girls Hostel Complex, and the dedicated International Student Hostel.",
      category: "Student Housing",
      iconType: "residential",
      color: "#e11d48",
      badge: "Hostels & Dining",
      mapNumber: "Hostels"
    }
  ],

  contacts: {
    mainCampusAddress: {
      street: "Guntur - Tenali Road",
      village: "Vadlamudi",
      mandal: "Chebrolu Mandal",
      district: "Guntur District",
      state: "Andhra Pradesh",
      country: "India",
      pincode: "522213"
    },
    helplines: {
      centralEpabx: "+91-863-2344700",
      admissionDesk1: "+91-863-2344777",
      admissionDesk2: "+91-863-2344786",
      nationalHotline: "+91-7093144415",
      tollFree: "1800-425-2529",
      fax: "+91-863-2344707"
    },
    emails: {
      admissions: "dean_admissions@vignanuniversity.org",
      itServices: "dean_its@vignanuniversity.org",
      internationalAffairs: "ufs@vignanuniversity.org"
    },
    corporateOffice: {
      branch: "Vijayawada City Branch",
      address: "Vijaya Complex, Kala Nagar, Acharya Ranga Nagar, Benz Circle, Vijayawada, Andhra Pradesh - 520010"
    }
  }
};

export const campusRouteDatabase = {
  // Routes originating from Main Gate / A-Block (AB) area
  'AB-HB': { distance: 0.25, time: 3, options: ['Walk'] },
  'AB-UB': { distance: 0.60, time: 7, options: ['Campus Shuttle', 'Bicycle Share'] },
  'AB-NB': { distance: 0.30, time: 4, options: ['Walk'] },
  'AB-CL': { distance: 0.08, time: 1, options: ['Walk'] },
  'AB-RES': { distance: 0.85, time: 10, options: ['Campus Shuttle', 'Bicycle Share'] },

  // Routes originating from H-Block (HB)
  'HB-UB': { distance: 0.40, time: 5, options: ['Walk', 'Bicycle Share'] },
  'HB-NB': { distance: 0.15, time: 2, options: ['Walk'] },
  'HB-CL': { distance: 0.18, time: 2, options: ['Walk'] },
  'HB-RES': { distance: 0.65, time: 8, options: ['Bicycle Share', 'Campus Shuttle'] },

  // Routes originating from U-Block (UB)
  'UB-NB': { distance: 0.45, time: 6, options: ['Walk'] },
  'UB-CL': { distance: 0.55, time: 7, options: ['Campus Shuttle', 'Bicycle Share'] },
  'UB-RES': { distance: 0.35, time: 4, options: ['Walk'] },

  // Routes originating from N-Block (NB)
  'NB-CL': { distance: 0.22, time: 3, options: ['Walk'] },
  'NB-RES': { distance: 0.70, time: 9, options: ['Bicycle Share'] },

  // Routes originating from NTR Central Library (CL)
  'CL-RES': { distance: 0.80, time: 10, options: ['Campus Shuttle', 'Bicycle Share'] }
};

/**
 * Calculates the campus route metrics based on two location IDs.
 * @param {string} start - The ID of the starting location (e.g., 'AB')
 * @param {string} end - The ID of the destination location (e.g., 'UB')
 * @returns {Object|null} Route object containing distance, time, and options, or null if not found.
 */
export function calculateCampusRoute(start, end) {
  // Edge Case: If inputs are invalid or the same location
  if (!start || !end || start === end) {
    return null;
  }

  // Create standard lookups keys for both directions
  const forwardKey = `${start}-${end}`;
  const reverseKey = `${end}-${start}`;

  // Query the database matrix and return the match
  return campusRouteDatabase[forwardKey] || campusRouteDatabase[reverseKey] || null;
}

// Exact Spatial positions matching the Official Vignan University Campus Map image
export const campusMapCoordinates = {
  AB: { x: 78.5, y: 73.5, shortName: "A-Block", title: "A-Block (Admin & Shuttle Hub)", mapNumber: "2" },
  HB: { x: 74.5, y: 62.0, shortName: "H-Block", title: "H-Block (Aryabhatta Wing)", mapNumber: "4" },
  CL: { x: 66.5, y: 72.0, shortName: "NTR Library", title: "NTR Central Library", mapNumber: "3" },
  NB: { x: 55.0, y: 56.5, shortName: "N-Block", title: "N-Block (Outreach Wing)", mapNumber: "8" },
  UB: { x: 44.0, y: 59.0, shortName: "U-Block", title: "U-Block (Tech & Labs)", mapNumber: "10" },
  RES: { x: 13.5, y: 41.0, shortName: "Hostels", title: "Residential Sectors (Hostels)", mapNumber: "Hostels" }
};

// Preset quick routes for students
export const presetRoutes = [
  { id: "p1", start: "AB", destination: "UB", label: "A-Block → U-Block Labs", note: "Primary shuttle commute" },
  { id: "p2", start: "RES", destination: "CL", label: "Hostels → NTR Library", note: "Popular evening study route" },
  { id: "p3", start: "AB", destination: "CL", label: "A-Block → NTR Library", note: "Short 80m walk" },
  { id: "p4", start: "HB", destination: "UB", label: "H-Block → U-Block Labs", note: "ECE to Mech/Civil lab transit" },
  { id: "p5", start: "UB", destination: "RES", label: "U-Block → Hostels", note: "Post-lab return path" },
  { id: "p6", start: "AB", destination: "RES", label: "Main Entrance → Hostels", note: "Full campus shuttle run" }
];
