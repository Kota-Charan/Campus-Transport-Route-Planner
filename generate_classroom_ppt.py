import sys
import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, "docs")
IMG_DIR = os.path.join(DOCS_DIR, "images")
PPT_OUT = os.path.join(DOCS_DIR, "Campus_Transport_Route_Planner_Classroom_Presentation.pptx")

# Color Palette
NAVY_DARK = RGBColor(15, 23, 42)      # #0f172a
NAVY_PRIMARY = RGBColor(30, 58, 138)  # #1e3a8a
BLUE_ACCENT = RGBColor(37, 99, 235)   # #2563eb
RED_CRIMSON = RGBColor(220, 38, 38)   # #dc2626
GREEN_EMERALD = RGBColor(16, 185, 129)# #10b981
AMBER_WARM = RGBColor(217, 119, 6)    # #d97706
BG_LIGHT = RGBColor(248, 250, 252)    # #f8fafc
WHITE = RGBColor(255, 255, 255)
SLATE_MUTED = RGBColor(100, 116, 139) # #64748b
SLATE_BORDER = RGBColor(226, 232, 240)# #e2e8f0

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

def add_header(slide, title_text, category_text, slide_num):
    # Header bar background
    header_box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.15))
    header_box.fill.solid()
    header_box.fill.fore_color.rgb = NAVY_PRIMARY
    header_box.line.color.rgb = NAVY_PRIMARY
    
    # Gold accent line below header
    accent_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.15), Inches(13.333), Inches(0.06))
    accent_line.fill.solid()
    accent_line.fill.fore_color.rgb = AMBER_WARM
    accent_line.line.color.rgb = AMBER_WARM

    # Category Pill
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.18), Inches(2.8), Inches(0.32))
    pill.fill.solid()
    pill.fill.fore_color.rgb = BLUE_ACCENT
    pill.line.fill.background()
    p_frame = pill.text_frame
    p_frame.word_wrap = True
    p_para = p_frame.paragraphs[0]
    p_para.text = category_text.upper()
    p_para.alignment = PP_ALIGN.CENTER
    p_para.font.size = Pt(10)
    p_para.font.bold = True
    p_para.font.color.rgb = WHITE
    p_para.font.name = "Arial"

    # Slide Title
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.52), Inches(10.5), Inches(0.55))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.font.name = "Arial"

    # Logo on top right of header
    logo_h = os.path.join(IMG_DIR, "vignan-logo-horizontal.png")
    if os.path.exists(logo_h):
        slide.shapes.add_picture(logo_h, Inches(10.5), Inches(0.18), height=Inches(0.8))

    # Footer
    add_footer(slide, slide_num)

def add_footer(slide, slide_num):
    ft_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(7.05), Inches(11.733), Inches(0.02))
    ft_line.fill.solid()
    ft_line.fill.fore_color.rgb = SLATE_BORDER
    ft_line.line.fill.background()

    tb = slide.shapes.add_textbox(Inches(0.8), Inches(7.08), Inches(9.0), Inches(0.35))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "VFSTR Pilot Project · Campus Transport Route Planner · Classroom Presentation"
    p.font.size = Pt(9.5)
    p.font.color.rgb = SLATE_MUTED
    p.font.name = "Arial"

    tb_num = slide.shapes.add_textbox(Inches(11.5), Inches(7.08), Inches(1.0), Inches(0.35))
    tf_num = tb_num.text_frame
    p_num = tf_num.paragraphs[0]
    p_num.text = f"{slide_num} / 14"
    p_num.alignment = PP_ALIGN.RIGHT
    p_num.font.size = Pt(9.5)
    p_num.font.bold = True
    p_num.font.color.rgb = BLUE_ACCENT
    p_num.font.name = "Arial"

def add_card(slide, left, top, width, height, title, subtitle, items, bg_col=WHITE, border_col=SLATE_BORDER, title_col=NAVY_PRIMARY):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_col
    card.line.color.rgb = border_col
    card.line.width = Pt(1.5)

    tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), height - Inches(0.3))
    tf = tb.text_frame
    tf.word_wrap = True

    if title:
        p_title = tf.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(13)
        p_title.font.bold = True
        p_title.font.color.rgb = title_col
        p_title.font.name = "Arial"

    if subtitle:
        p_sub = tf.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.size = Pt(10)
        p_sub.font.italic = True
        p_sub.font.color.rgb = SLATE_MUTED
        p_sub.font.name = "Arial"
        p_sub.space_after = Pt(8)

    for item in items:
        p_item = tf.add_paragraph()
        p_item.text = f"• {item}"
        p_item.font.size = Pt(10.5)
        p_item.font.color.rgb = NAVY_DARK
        p_item.font.name = "Arial"
        p_item.space_after = Pt(4)

# ==============================================================================
# SLIDE 1: Title Slide
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)

# Background gradient simulated with background rectangle
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY_DARK
bg1.line.fill.background()

# Top accent bar
top_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.15))
top_bar.fill.solid()
top_bar.fill.fore_color.rgb = AMBER_WARM
top_bar.line.fill.background()

# University Vertical Logo
logo_v = os.path.join(IMG_DIR, "vignan-logo-vertical.png")
if os.path.exists(logo_v):
    s1.shapes.add_picture(logo_v, Inches(0.9), Inches(1.2), width=Inches(3.2))

# Title box
tb1 = s1.shapes.add_textbox(Inches(4.4), Inches(1.2), Inches(8.0), Inches(4.5))
tf1 = tb1.text_frame
tf1.word_wrap = True

p_inst = tf1.paragraphs[0]
p_inst.text = "VIGNAN'S FOUNDATION FOR SCIENCE, TECHNOLOGY & RESEARCH"
p_inst.font.size = Pt(14)
p_inst.font.bold = True
p_inst.font.color.rgb = AMBER_WARM
p_inst.font.name = "Arial"
p_inst.space_after = Pt(4)

p_inst_sub = tf1.add_paragraph()
p_inst_sub.text = "(Deemed to be University · NAAC 'A+' Grade · Vadlamudi, Guntur AP)"
p_inst_sub.font.size = Pt(11)
p_inst_sub.font.color.rgb = WHITE
p_inst_sub.font.name = "Arial"
p_inst_sub.space_after = Pt(20)

p_main = tf1.add_paragraph()
p_main.text = "Campus Transport Route Planner"
p_main.font.size = Pt(32)
p_main.font.bold = True
p_main.font.color.rgb = WHITE
p_main.font.name = "Arial"
p_main.space_after = Pt(12)

p_tagline = tf1.add_paragraph()
p_tagline.text = "Interactive Multi-Modal Spatial Navigation, Architectural Masterplan & Real-Time Route Calculation System"
p_tagline.font.size = Pt(14)
p_tagline.font.color.rgb = RGBColor(147, 197, 253)
p_tagline.font.name = "Arial"
p_tagline.space_after = Pt(24)

# Badges in title slide
badge_data = [
    ("⚛️ React 18 & Vite", BLUE_ACCENT),
    ("🗺️ Dual Map Engine", GREEN_EMERALD),
    ("📍 Google Maps Place Cards", RED_CRIMSON),
    ("⚡ 1-MW Solar Footprint", AMBER_WARM)
]
for idx, (b_txt, b_col) in enumerate(badge_data):
    b_shape = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.4 + idx * 2.05), Inches(4.5), Inches(1.95), Inches(0.45))
    b_shape.fill.solid()
    b_shape.fill.fore_color.rgb = b_col
    b_shape.line.fill.background()
    bf = b_shape.text_frame
    bp = bf.paragraphs[0]
    bp.text = b_txt
    bp.alignment = PP_ALIGN.CENTER
    bp.font.size = Pt(9.5)
    bp.font.bold = True
    bp.font.color.rgb = WHITE
    bp.font.name = "Arial"

# Presenter / Academic metadata bar
meta_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.6), Inches(11.733), Inches(1.3))
meta_box.fill.solid()
meta_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
meta_box.line.color.rgb = RGBColor(51, 65, 85)
meta_tf = meta_box.text_frame
meta_tf.word_wrap = True

mp1 = meta_tf.paragraphs[0]
mp1.text = "ACADEMIC CLASSROOM PRESENTATION & PROJECT DEFENSE"
mp1.font.size = Pt(11)
mp1.font.bold = True
mp1.font.color.rgb = AMBER_WARM
mp1.font.name = "Arial"
mp1.space_after = Pt(4)

mp2 = meta_tf.add_paragraph()
mp2.text = "Domain: Web Application Development · Pilot Project: Vadlamudi Main Campus Transit System"
mp2.font.size = Pt(11)
mp2.font.color.rgb = WHITE
mp2.font.name = "Arial"
mp2.space_after = Pt(4)

mp3 = meta_tf.add_paragraph()
mp3.text = "Key Concepts: Component Composition • State Management • Event Handling • Lists & Keys • Conditional Rendering"
mp3.font.size = Pt(10)
mp3.font.color.rgb = RGBColor(148, 163, 184)
mp3.font.name = "Arial"

# ==============================================================================
# SLIDE 2: Executive Summary & Motivation
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
add_header(s2, "Project Motivation & Problem Statement", "Campus Navigation Challenges", 2)

add_card(s2, Inches(0.8), Inches(1.5), Inches(3.6), Inches(5.2),
         "The Sprawling Campus", "Scale & Infrastructure of VFSTR", [
             "40+ acres sprawling university campus at Vadlamudi, Guntur District.",
             "15,000+ full-time students, 1,000+ faculty, researchers, and daily visitors.",
             "6 major academic & residential complexes spread across vast distances.",
             "Complex road network with highway access (SH-112) and 4 strategic gates.",
             "High inter-building commute volume between labs, classes, and hostels."
         ], bg_col=RGBColor(239, 246, 255), border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

add_card(s2, Inches(4.866), Inches(1.5), Inches(3.6), Inches(5.2),
         "Navigational Pain Points", "Current Student & Visitor Dilemmas", [
             "Freshers and new visitors frequently get disoriented on campus grounds.",
             "No unified digital tool to estimate transit distance and travel time.",
             "Confusion about available transit modes (Walk vs Campus Shuttle vs Cycle).",
             "Lack of floor-by-floor departmental directories for administrative blocks.",
             "Need for clear visual spatial maps showing entry gates, parking, and stops."
         ], bg_col=RGBColor(254, 242, 242), border_col=RED_CRIMSON, title_col=RED_CRIMSON)

add_card(s2, Inches(8.933), Inches(1.5), Inches(3.6), Inches(5.2),
         "The Proposed Solution", "Campus Transport Route Planner", [
             "High-performance single-page web app built with React 18 and Vite.",
             "Instant O(1) symmetric route lookup across all 15 key campus corridors.",
             "Multi-modal transit recommendations tailored to distance & terrain.",
             "Bespoke Thematic Vector SVG Map with 4 gates, parking, and roads.",
             "Google Maps-style slide-in place cards with verified photos and reviews.",
             "Guided 7-stop Virtual Campus Tour for first-time visitors."
         ], bg_col=RGBColor(236, 253, 245), border_col=GREEN_EMERALD, title_col=GREEN_EMERALD)

# ==============================================================================
# SLIDE 3: Core React Concepts Implemented
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
add_header(s3, "Five Core React Concepts Implemented", "Curriculum Alignment & Architecture", 3)

img_concepts = os.path.join(IMG_DIR, "react_concepts_flow.png")
if os.path.exists(img_concepts):
    s3.shapes.add_picture(img_concepts, Inches(0.8), Inches(1.4), width=Inches(11.733))

# ==============================================================================
# SLIDE 4: System Architecture & Component Hierarchy
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
add_header(s4, "System Architecture & Component Composition", "Component Tree & Data Flow", 4)

img_hierarchy = os.path.join(IMG_DIR, "component_hierarchy.png")
if os.path.exists(img_hierarchy):
    s4.shapes.add_picture(img_hierarchy, Inches(0.8), Inches(1.4), width=Inches(7.2))

add_card(s4, Inches(8.3), Inches(1.4), Inches(4.2), Inches(5.3),
         "Architectural Highlights", "Atomic Modular Breakdown", [
             "State Container (App.jsx): Coordinates origin, destination, and modals via lifted state.",
             "Unidirectional Data Flow: Immutable props flow downwards to presentational components.",
             "Single Responsibility Principle: RouteCard, LocationDirectory, and Map are completely decoupled.",
             "Zero External GIS Bloat: Native SVG + Canvas vector rendering guarantees 60fps without heavy Leaflet/Mapbox bundles.",
             "Modal Overlay Pattern: BuildingPlaceModal isolates photo carousel and reviews within a portals-ready backdrop.",
             "Strict Configuration Objects: Clean separation between raw data (campusData.js) and UI logic."
         ], bg_col=WHITE, border_col=NAVY_PRIMARY, title_col=NAVY_PRIMARY)

# ==============================================================================
# SLIDE 5: Campus Geography & Institutional Masterplan
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
add_header(s5, "VFSTR Campus Geography & Masterplan Facilities", "Spatial Nodes & Locations", 5)

blocks = [
    ("A-Block (Admin Block, #2)", "VC Office, Registrar, Exam Cell", "15,991 sq.m. administrative core. Houses VC Secretariat, Central Epabx, and the Primary Campus Shuttle Hub.", Inches(0.8), Inches(1.4)),
    ("H-Block (Aryabhatta, #4)", "ECE, EEE & Chemistry Domain", "Smart classrooms, VLSI design labs, microelectronics center, and academic lecture theatres.", Inches(4.866), Inches(1.4)),
    ("U-Block (Technology, #10)", "Mech, Civil & Composite CoE", "Advanced workshops, heavy structures testing facility, and Center of Excellence for Composite Materials.", Inches(8.933), Inches(1.4)),
    ("N-Block (Outreach, #8)", "International & Admissions", "International Relations, Student Affairs, cultural auditorium, Taekwondo training hall, and seminar bays.", Inches(0.8), Inches(4.2)),
    ("NTR Central Library (#3)", "Digital Knowledge Center", "Automated RFID circulation, e-ShodhSindhu digital network, 100,000+ volumes, 24/7 reading pavilion.", Inches(4.866), Inches(4.2)),
    ("Residential Sectors (#RES)", "Hostel Accommodations", "West Girls Hostel Complex alongside Vignan Eco-Pond, East Boys Hostel Complex, and International Dorms.", Inches(8.933), Inches(4.2))
]

for title, sub, desc, left, top in blocks:
    add_card(s5, left, top, Inches(3.6), Inches(2.6), title, sub, [desc], bg_col=WHITE, border_col=SLATE_BORDER, title_col=BLUE_ACCENT)

# ==============================================================================
# SLIDE 6: Physical Road Architecture & Campus Gates
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
add_header(s6, "Physical Road Architecture & Entry/Exit Access Gates", "Transit Corridors & Security Logistics", 6)

add_card(s6, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.3),
         "Campus Transit Corridors", "Calibrated Physical Road Network", [
             "Guntur - Tenali Highway (SH-112): 4-lane exterior highway connecting Guntur, Tenali, and Vadlamudi.",
             "VFSTR Main Boulevard: 4-lane median artery connecting Gate 1 directly to A-Block and the Central Shuttle Hub.",
             "Library Promenade: Tree-shaded pedestrian avenue connecting Gate 2 to the NTR Central Library and N-Block.",
             "Central Academic Spine: Dual-lane vehicular & pedestrian corridor connecting A-Block, H-Block, and U-Block.",
             "Technology & CoE Corridor: Connects U-Block, composite labs, and the convocation hall.",
             "West Residential Parkway: Lakeside boulevard serving the Boys and Girls hostel complexes."
         ], bg_col=RGBColor(241, 245, 249), border_col=NAVY_PRIMARY, title_col=NAVY_PRIMARY)

add_card(s6, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.3),
         "Strategic Access Gates & Parking", "Security Checkpoints & Transit Bays", [
             "🚪 Gate 1 (VFSTR Main Entrance): Primary ceremonial highway gate with central security booths, boom barriers, and Visitor 4-Wheeler Parking.",
             "🚪 Gate 2 (NTR Library Gate): Academic entrance with student drop-off zone, pedestrian plaza, and Student 2-Wheeler Parking.",
             "🚪 Gate 3 (Vignan LARA & Hostels Gate): West highway entrance serving Vignan LARA complex, pharmacy wing, and Girls Hostel.",
             "🚪 Gate 4 (North Logistics Exit): Dedicated northern gate connecting sports arenas, eco-pond, and logistics delivery trucks.",
             "🚌 Central Electric Shuttle Terminal: Stationed in front of A-Block, departing every 10 minutes.",
             "🚲 Bicycle Share Docks: Located at A-Block, Library, U-Block, and Hostels."
         ], bg_col=RGBColor(236, 253, 245), border_col=GREEN_EMERALD, title_col=GREEN_EMERALD)

# ==============================================================================
# SLIDE 7: Dual Cartographic Engine
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
add_header(s7, "Dual Cartographic Engine: Thematic Vector & Enhanced Aerial", "Visual Spatial Systems", 7)

# Map image on the right
img_map = os.path.join(IMG_DIR, "vignan-campus-map.jpg")
if os.path.exists(img_map):
    s7.shapes.add_picture(img_map, Inches(6.8), Inches(1.5), width=Inches(5.7))

add_card(s7, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.3),
         "Dual Map Modes & Rendering", "Bespoke Vector + Enhanced 3D Aerial", [
             "Mode 1: Thematic Vector Masterplan (SVG):",
             "  • Rendered in scalable 1000×620 SVG coordinate space.",
             "  • Layer filtering: Academic Blocks, Gates, Sports, Solar Green Footprint.",
             "  • Animated marching-ants SVG polyline for active routes.",
             "  • Visual road corridors, eco-pond, solar PV arrays, and stadium.",
             "",
             "Mode 2: Enhanced Clean Aerial 3D View:",
             "  • High-resolution 1130×706 raster with Lanczos upscaling.",
             "  • Mahotsav temporary festival logos & banners completely eliminated.",
             "  • Interactive hotspot badges with building numbers [2, 3, 4, 8, 10, H].",
             "  • Pulsing Origin 'A' and Destination 'B' beacons over aerial view."
         ], bg_col=WHITE, border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

# ==============================================================================
# SLIDE 8: Google Maps-Style Building Place Cards
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
add_header(s8, "Google Maps-Style Building Place Cards", "Rich Media & Verified Metadata", 8)

add_card(s8, Inches(0.8), Inches(1.4), Inches(3.6), Inches(5.3),
         "Interactive Place Drawer", "Google Maps Experience", [
             "Slide-in drawer triggers on clicking ANY building or map node.",
             "High-resolution photo galleries & category tags.",
             "Verified metadata: Building code, map number, plus code.",
             "Operating hours, contact telephone extensions, and VC office.",
             "Student ratings (4.8★ - 4.9★) and real campus reviews.",
             "One-click 'Directions' & 'Start Here' routing triggers."
         ], bg_col=RGBColor(239, 246, 255), border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

add_card(s8, Inches(4.866), Inches(1.4), Inches(3.6), Inches(5.3),
         "Departmental Directories", "Floor-by-Floor Navigational Data", [
             "A-Block Floor Directory:",
             "  • Ground: Central Epabx, Reception, Helpdesk.",
             "  • Floor 1: Registrar Secretariat, Finance Wing.",
             "  • Floor 2: VC Office, Deans Council Chamber.",
             "  • Floor 3: Controller of Examinations, Math Dept.",
             "H-Block (Aryabhatta Wing):",
             "  • Ground: Smart Seminar Halls, EEE Labs.",
             "  • Floors 1-2: ECE Electronics & VLSI Centers.",
             "  • Floor 3: Chemistry & Material Synthesis Labs."
         ], bg_col=WHITE, border_col=SLATE_BORDER, title_col=NAVY_PRIMARY)

add_card(s8, Inches(8.933), Inches(1.4), Inches(3.6), Inches(5.3),
         "NTR Library & Hostels", "Research Pavilion & Student Living", [
             "NTR Central Library Directory:",
             "  • Ground: Circulation Desk, RFID Automated Returns.",
             "  • Floor 1: Digital Library (e-ShodhSindhu, IEEE).",
             "  • Floor 2: Core Engineering Reference Collection.",
             "  • Floor 3: Periodicals, Journals & Research Archives.",
             "Residential Sector Directory:",
             "  • West Wing: Girls Hostels (Lakeside complex).",
             "  • East Wing: Boys Hostels (Sports field adjacent).",
             "  • Amenities: Dining Mess, Indoor Gym, Clinic."
         ], bg_col=RGBColor(240, 253, 250), border_col=GREEN_EMERALD, title_col=GREEN_EMERALD)

# ==============================================================================
# SLIDE 9: Route Calculation Engine & Algorithmic Analysis
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
add_header(s9, "Route Calculation Engine & Algorithmic Analysis", "Data Structures & Time Complexity", 9)

img_heatmap = os.path.join(IMG_DIR, "route_matrix_heatmap.png")
if os.path.exists(img_heatmap):
    s9.shapes.add_picture(img_heatmap, Inches(0.8), Inches(1.4), width=Inches(7.2))

add_card(s9, Inches(8.3), Inches(1.4), Inches(4.2), Inches(5.3),
         "Algorithmic Performance", "O(1) Hash Map Matrix Lookup", [
             "Algorithm Specification:",
             "  • Function: calculateCampusRoute(start, end)",
             "  • Time Complexity: O(1) constant time lookup.",
             "  • Space Complexity: O(N²) precomputed matrix pairs.",
             "",
             "Key Features & Guard Clauses:",
             "  • Symmetrical Key Fallback: Queries `${start}-${end}` first, falls back to `${end}-${start}`.",
             "  • Edge Case Handling: Returns null if inputs are identical (start === end) or empty.",
             "  • 15 Bidirectional Pairs: Complete coverage across AB, HB, UB, NB, CL, RES.",
             "  • Transport Modality Rules:",
             "    - Distance < 0.35 km: 'Walk'",
             "    - Distance >= 0.40 km: 'Campus Shuttle', 'Bicycle Share'"
         ], bg_col=WHITE, border_col=NAVY_PRIMARY, title_col=NAVY_PRIMARY)

# ==============================================================================
# SLIDE 10: Virtual Campus Tour Feature
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
add_header(s10, "Virtual Campus Tour & Turn-by-Turn Guidance", "Guided Exploration Experience", 10)

tour_stops = [
    ("Stop 1: Gate 1 Main Entrance", "Highway access, security check, and primary shuttle arrival bay."),
    ("Stop 2: A-Block Administration", "Central administrative hub, VC Office, and Shuttle Bus Terminal."),
    ("Stop 3: H-Block (Aryabhatta Wing)", "ECE, EEE, Chemistry smart classrooms and microelectronics lab."),
    ("Stop 4: NTR Central Library", "Octagonal digital pavilion with 100,000+ volumes and IEEE network."),
    ("Stop 5: Cricket Ground & Sports Complex", "Full turf pitch with 400m running track and convocation pavilion."),
    ("Stop 6: U-Block Technology Complex", "Mechanical & Civil labs with Composite Materials Center of Excellence."),
    ("Stop 7: West Residential Sectors", "Boys and Girls hostel quarters alongside Vignan Eco-Pond.")
]

add_card(s10, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.3),
         "7-Stop Virtual Tour Itinerary", "Stepped Interactive Walkthrough", [
             f"{s_title}: {s_desc}" for s_title, s_desc in tour_stops
         ], bg_col=WHITE, border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

add_card(s10, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.3),
         "Turn-by-Turn Waypoint Guidance", "Physical Road Instructions", [
             "Dynamic Navigation Drawer:",
             "  • Unfolds upon selecting any valid campus route.",
             "  • Converts coordinate waypoints into human-readable directions.",
             "",
             "Real Guidance Examples:",
             "  • 'Depart from A-Block Central Shuttle Terminal via Main Boulevard'",
             "  • 'Turn west along Central Academic Spine toward H-Block (120m)'",
             "  • 'Proceed straight past NTR Central Library Promenade (180m)'",
             "  • 'Cross the roundabout onto Technology Corridor toward U-Block (150m)'",
             "  • 'Arrive at U-Block Technology & Composite Materials Labs'",
             "",
             "Accompanying metric: Real-time estimated walking vs shuttle travel times."
         ], bg_col=RGBColor(241, 245, 249), border_col=NAVY_PRIMARY, title_col=NAVY_PRIMARY)

# ==============================================================================
# SLIDE 11: Green Campus & Sustainability Footprint
# ==============================================================================
s11 = prs.slides.add_slide(blank_layout)
add_header(s11, "Green Campus Footprint & Sustainability Initiatives", "VFSTR Environmental Leadership", 11)

green_cards = [
    ("1-MW Rooftop Solar PV Plant", "Clean Renewable Energy Generation", [
        "Massive solar arrays installed across A-Block, U-Block, and Library rooftops.",
        "Generates over 1.4 million clean kWh annually.",
        "Offsets over 1,100 metric tons of CO2 emissions each year.",
        "Highlighted as a distinct layer filter in the Thematic Vector Map."
    ], Inches(0.8), Inches(1.4), AMBER_WARM),
    
    ("Campus Rainwater Harvesting & Eco-Pond", "Water Conservation & Biodiversity", [
        "Vignan Eco-Pond acts as a natural campus rainwater catchment reservoir.",
        "100% campus roof rainwater channeled into percolation tanks.",
        "Recharges local Vadlamudi groundwater table.",
        "Surrounded by walking promenades and green shaded benches."
    ], Inches(6.8), Inches(1.4), BLUE_ACCENT),

    ("Zero-Emission Electric Campus Shuttles", "Clean Sustainable Mobility", [
        "Fleet of battery-operated campus shuttles serving students & faculty.",
        "Connects Gate 1, A-Block, Library, U-Block, and Residential Sectors.",
        "10-minute scheduled departures with zero tailpipe emissions.",
        "Recommended automatically for routes exceeding 0.40 km."
    ], Inches(0.8), Inches(4.2), GREEN_EMERALD),

    ("Campus Bicycle Share System", "Active Healthy Commute", [
        "Docking stations placed at A-Block, Library, U-Block, and Hostels.",
        "Encourages active mobility and reduces intra-campus congestion.",
        "Zero-cost shared access for registered VFSTR students & staff.",
        "Integrates directly into the route planning algorithm options."
    ], Inches(6.8), Inches(4.2), NAVY_PRIMARY)
]

for title, sub, items, left, top, col in green_cards:
    add_card(s11, left, top, Inches(5.7), Inches(2.6), title, sub, items, bg_col=WHITE, border_col=col, title_col=col)

# ==============================================================================
# SLIDE 12: Technical Stack & Performance Metrics
# ==============================================================================
s12 = prs.slides.add_slide(blank_layout)
add_header(s12, "Technical Implementation & Performance Metrics", "Modern Front-End Engineering", 12)

add_card(s12, Inches(0.8), Inches(1.4), Inches(3.6), Inches(5.3),
         "Core Technology Stack", "Lightweight, Modern Architecture", [
             "React 18: Concurrent rendering, hooks-first architecture (useState, useMemo, useEffect).",
             "Vite 6: Next-gen frontend tooling with lightning-fast Hot Module Replacement (HMR).",
             "Lucide React: Clean, tree-shakeable SVG icon set for UI accessibility.",
             "Pure Modular CSS: Custom properties design system, glassmorphism, responsive media queries.",
             "Zero Mapping Bloat: 100% native SVG vector rendering avoids Mapbox/Leaflet API overhead."
         ], bg_col=WHITE, border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

add_card(s12, Inches(4.866), Inches(1.4), Inches(3.6), Inches(5.3),
         "Build & Bundle Metrics", "Production Packaging Performance", [
             "Build Time: ~9.5 seconds in Vite production pipeline.",
             "JavaScript Chunk: 253.8 kB (73.7 kB gzipped).",
             "CSS Chunk: 54.6 kB (10.1 kB gzipped).",
             "HTML Entry: 0.72 kB.",
             "Zero Build Warnings: 1,592 modules transformed cleanly.",
             "Optimized Asset Cache: Content-hashed bundle artifacts for instantaneous client loads."
         ], bg_col=RGBColor(236, 253, 245), border_col=GREEN_EMERALD, title_col=GREEN_EMERALD)

add_card(s12, Inches(8.933), Inches(1.4), Inches(3.6), Inches(5.3),
         "Accessibility & UX", "Inclusive Student Interface", [
             "WCAG 2.1 Contrast: High-contrast ratios across all text and interactive badges.",
             "Full ARIA Support: Semantic roles, aria-labels on buttons and map hotspots.",
             "Responsive Breakpoints: Optimized for Mobile (360px+), Tablet (768px), and Desktop.",
             "Keyboard Navigation: Tab-accessible form selectors and modal dismiss keys.",
             "Touch Target Sizing: Minimum 44×44px tap targets for mobile usability."
         ], bg_col=RGBColor(254, 242, 242), border_col=RED_CRIMSON, title_col=RED_CRIMSON)

# ==============================================================================
# SLIDE 13: Classroom Live Demonstration & Use Cases
# ==============================================================================
s13 = prs.slides.add_slide(blank_layout)
add_header(s13, "Classroom Demonstration & Use Case Scenarios", "Live Functional Verification", 13)

scenarios = [
    ("Scenario A: Fresher / Guest Arrival", "Gate 1 (Highway) ➔ A-Block (Admin)", [
        "User selects 'A-Block (Admin)' as destination.",
        "App highlights Gate 1 Main Boulevard route.",
        "Distance: 0.15 km · Travel Time: 2 mins.",
        "Transit Option: 'Walk'.",
        "Place card displays VC Office, Registrar, and Epabx desk."
    ], Inches(0.8), Inches(1.4), BLUE_ACCENT),

    ("Scenario B: Cross-Campus Academic", "H-Block (ECE) ➔ U-Block (Mech)", [
        "User commuting between electronics and mechanical labs.",
        "App calculates Central Academic Spine route.",
        "Distance: 0.40 km · Travel Time: 5 mins.",
        "Transit Options: 'Walk', 'Bicycle Share'.",
        "Place card displays Composite Materials Center of Excellence."
    ], Inches(4.866), Inches(1.4), GREEN_EMERALD),

    ("Scenario C: Hosteller Commute", "Residential Sectors ➔ NTR Library", [
        "User commuting from hostels to library for evening study.",
        "App calculates West Parkway & Library Promenade route.",
        "Distance: 0.80 km · Travel Time: 10 mins.",
        "Transit Options: 'Campus Shuttle', 'Bicycle Share'.",
        "Displays 24/7 reading hall hours and e-ShodhSindhu terminals."
    ], Inches(8.933), Inches(1.4), AMBER_WARM)
]

for title, sub, items, left, top, col in scenarios:
    add_card(s13, left, top, Inches(3.6), Inches(5.3), title, sub, items, bg_col=WHITE, border_col=col, title_col=col)

# ==============================================================================
# SLIDE 14: Conclusion & Future Scope
# ==============================================================================
s14 = prs.slides.add_slide(blank_layout)
add_header(s14, "Conclusion & Future Research Scope", "Project Summary & Roadmap", 14)

add_card(s14, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.3),
         "Key Project Achievements", "Curriculum & Engineering Milestones", [
             "Successfully fulfilled all 5 React curriculum requirements:",
             "  • Component Composition, State Management, Event Handling, Lists & Keys, Conditional Rendering.",
             "100% faithful adherence to VFSTR University configuration data and route matrix.",
             "Engineered a dual cartographic engine (Thematic Vector SVG + Clean 3D Aerial).",
             "Integrated Google Maps-style place cards with authentic campus photos and reviews.",
             "Provided turn-by-turn guidance and virtual campus tour capability.",
             "Championed green campus transit (shuttles, bicycles, solar energy)."
         ], bg_col=RGBColor(239, 246, 255), border_col=BLUE_ACCENT, title_col=BLUE_ACCENT)

add_card(s14, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.3),
         "Future Expansion Roadmap", "Phase II Innovations", [
             "📡 Real-Time GPS Tracking: Live telemetry for electric campus shuttle buses.",
             "🅿️ Smart Parking Sensors: IoT ultrasonic sensors reporting real-time vacant bays at Gate 1 & 2.",
             "📅 Timetable Integration: Sync with student portal to auto-suggest routes based on lecture schedule.",
             "♿ Accessible Routing: Dedicated wheelchair-accessible ramp and elevator pathfinding.",
             "🗣️ Multilingual Voice Guidance: Telugu and English audio navigation prompts for visitors.",
             "",
             "Thank you! Any Questions & Discussion are Welcome."
         ], bg_col=RGBColor(236, 253, 245), border_col=GREEN_EMERALD, title_col=GREEN_EMERALD)

# Save Presentation
prs.save(PPT_OUT)
print(f"PowerPoint Presentation successfully created: {PPT_OUT}")

