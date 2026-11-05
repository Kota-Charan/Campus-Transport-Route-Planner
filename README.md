# VFSTR Campus Transport Route Planner

A modern, responsive React application built for **Vignan's Foundation for Science, Technology & Research (VFSTR)** pilot project that lets students select starting points and destinations across campus locations and displays the selected route, estimated distance, travel time, and available transport options.

---

## 📚 Concepts Covered

- **Component Composition**: Modular hierarchy comprising `<Navbar>`, `<UniversityBanner>`, `<RouteSelector>`, `<RouteCard>`, `<CampusMap>`, `<LocationDirectory>`, and `<CampusContacts>`.
- **State Management**: Reactive state hooks managing origin (`start`), target (`destination`), transport mode filters, active tabs, and recent route history.
- **Event Handling**: Controlled dropdown selection events, swap handlers, reset actions, map node click listeners, preset triggers, and clipboard copy.
- **Lists & Keys**: Systematic iteration over `campusLocations`, `options`, `presetRoutes`, `routeHistory`, and contact directories using unique, stable keys.
- **Conditional Rendering**: Dynamic UI responses for empty states, identical location alerts (`start === destination`), calculated metrics, mode badge filters, and interactive view switching.

---

## 🏛️ Campus Locations Included

| Code | Location Name | Key Highlights |
| :---: | :--- | :--- |
| **AB** | A-Block (Administrative Block) | VC Office, Registrar, Primary Campus Shuttle Hub |
| **HB** | H-Block (Aryabhatta Wing) | ECE, EEE, Chemistry, Upgraded Smart Classrooms |
| **UB** | U-Block (Technology & Lab Complex) | Mechanical & Civil, Center of Excellence |
| **NB** | N-Block (Outreach Wing) | International Relations & Student Outreach |
| **CL** | NTR Central Library | Automated Library, e-ShodhSindhu digital network |
| **RES** | Residential Sectors | Boys, Girls, and International Student Hostels |

---

## 🚀 Quick Start

### 1. Run React Client Directly

```sh
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Run Full Workspace (Client + API)

From the project root:

```sh
npm run dev
```

### 3. Production Build

```sh
cd client
npm run build
```

The production assets will be generated in `client/dist/`.
