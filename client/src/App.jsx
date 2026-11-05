import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import UniversityBanner from "./components/UniversityBanner.jsx";
import RouteSelector from "./components/RouteSelector.jsx";
import RouteCard from "./components/RouteCard.jsx";
import CampusMap from "./components/CampusMap.jsx";
import LocationDirectory from "./components/LocationDirectory.jsx";
import CampusContacts from "./components/CampusContacts.jsx";
import BuildingPlaceModal from "./components/BuildingPlaceModal.jsx";
import { campusBuildingDetails } from "./data/buildingDetails.js";
import {
  vignanUniversityData,
  calculateCampusRoute,
  campusMapCoordinates,
  presetRoutes
} from "./data/campusData.js";
import { History, ArrowRight, ShieldCheck, Footprints, Sparkles } from "lucide-react";

export default function App() {
  // 1. STATE MANAGEMENT
  // Initial starting point: A-Block ('AB') and destination: U-Block ('UB') for instant interactive demonstration
  const [start, setStart] = useState("AB");
  const [destination, setDestination] = useState("UB");
  const [transportFilter, setTransportFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("planner");
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [routeHistory, setRouteHistory] = useState([
    {
      id: "init-1",
      startId: "AB",
      destId: "UB",
      distance: 0.60,
      time: 7,
      options: ["Campus Shuttle", "Bicycle Share"]
    }
  ]);

  const locations = vignanUniversityData.campusLocations;
  const isSameLocation = Boolean(start && destination && start === destination);

  // Derive locations
  const startLocation = useMemo(
    () => locations.find((loc) => loc.id === start) || null,
    [locations, start]
  );
  const destinationLocation = useMemo(
    () => locations.find((loc) => loc.id === destination) || null,
    [locations, destination]
  );

  // Compute Route using the provided calculateCampusRoute function
  const currentRoute = useMemo(() => {
    return calculateCampusRoute(start, destination);
  }, [start, destination]);

  // Track recent routes in history
  useEffect(() => {
    if (currentRoute && start && destination && start !== destination) {
      setRouteHistory((prev) => {
        const exists = prev.some(
          (item) => item.startId === start && item.destId === destination
        );
        if (exists) return prev;
        const newItem = {
          id: `${start}-${destination}-${Date.now()}`,
          startId: start,
          destId: destination,
          distance: currentRoute.distance,
          time: currentRoute.time,
          options: currentRoute.options
        };
        return [newItem, ...prev.slice(0, 4)];
      });
    }
  }, [currentRoute, start, destination]);

  // 2. EVENT HANDLING
  const handleStartChange = (newStart) => {
    setStart(newStart);
  };

  const handleDestinationChange = (newDest) => {
    setDestination(newDest);
  };

  const handleSwap = () => {
    const prevStart = start;
    const prevDest = destination;
    setStart(prevDest);
    setDestination(prevStart);
  };

  const handleReset = () => {
    setStart("");
    setDestination("");
  };

  const handlePresetSelect = (presetStart, presetDest) => {
    setStart(presetStart);
    setDestination(presetDest);
    if (activeTab !== "planner") {
      setActiveTab("planner");
    }
  };

  const handleFilterChange = (mode) => {
    setTransportFilter(mode);
  };

  const handleSelectFromMapStart = (locId) => {
    setStart(locId);
  };

  const handleSelectFromMapDest = (locId) => {
    setDestination(locId);
  };

  const handleHistorySelect = (hStart, hDest) => {
    setStart(hStart);
    setDestination(hDest);
  };

  const activeSelectedBuilding = selectedPlaceId
    ? campusBuildingDetails[selectedPlaceId]
    : null;

  return (
    <div className="app-shell">
      {/* COMPONENT COMPOSITION: Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {/* COMPONENT COMPOSITION: University Profile Header */}
        <UniversityBanner profile={vignanUniversityData.profile} />

        {/* CONDITIONAL RENDERING based on active navigation tab */}
        {activeTab === "planner" && (
          <div className="planner-layout-grid">
            {/* Left Column: Form Controls & Route Calculation Output */}
            <div className="planner-column-left">
              {/* Form Component */}
              <RouteSelector
                locations={locations}
                start={start}
                destination={destination}
                onStartChange={handleStartChange}
                onDestinationChange={handleDestinationChange}
                onSwap={handleSwap}
                onReset={handleReset}
                transportFilter={transportFilter}
                onFilterChange={handleFilterChange}
                presets={presetRoutes}
                onPresetSelect={handlePresetSelect}
                isSameLocation={isSameLocation}
              />

              {/* Result Metrics Component */}
              <RouteCard
                route={currentRoute}
                startLocation={startLocation}
                destinationLocation={destinationLocation}
                transportFilter={transportFilter}
                onViewBuilding={(bId) => setSelectedPlaceId(bId)}
              />

              {/* LISTS & KEYS: Recent Routes History */}
              {routeHistory.length > 0 && (
                <div className="history-section">
                  <div className="history-header">
                    <History size={14} />
                    <span>RECENTLY CALCULATED ROUTES</span>
                  </div>
                  <div className="history-chips-list">
                    {routeHistory.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`history-chip ${
                          start === item.startId && destination === item.destId
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleHistorySelect(item.startId, item.destId)}
                        title={`Distance: ${item.distance} km | Time: ${item.time} mins`}
                      >
                        <span className="history-locs">
                          {item.startId} <ArrowRight size={12} /> {item.destId}
                        </span>
                        <span className="history-meta">
                          {item.distance} km · {item.time}m
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Campus Map with Road Architecture */}
            <div className="planner-column-right">
              <CampusMap
                locations={locations}
                coordinates={campusMapCoordinates}
                start={start}
                destination={destination}
                route={currentRoute}
                onSelectStart={handleSelectFromMapStart}
                onSelectDestination={handleSelectFromMapDest}
              />
            </div>
          </div>
        )}

        {/* CONDITIONAL RENDERING: Campus Directory Tab */}
        {activeTab === "directory" && (
          <LocationDirectory
            locations={locations}
            start={start}
            destination={destination}
            onSelectStart={handleSelectFromMapStart}
            onSelectDestination={handleSelectFromMapDest}
            onBackToPlanner={() => setActiveTab("planner")}
          />
        )}

        {/* CONDITIONAL RENDERING: Contacts & Helplines Tab */}
        {activeTab === "contacts" && (
          <CampusContacts contacts={vignanUniversityData.contacts} />
        )}

        {/* Global Google Maps Place Drawer / Modal */}
        {activeSelectedBuilding && (
          <BuildingPlaceModal
            building={activeSelectedBuilding}
            onClose={() => setSelectedPlaceId(null)}
            onSetAsStart={(id) => {
              setStart(id);
              if (activeTab !== "planner") setActiveTab("planner");
            }}
            onSetAsDestination={(id) => {
              setDestination(id);
              if (activeTab !== "planner") setActiveTab("planner");
            }}
          />
        )}

        {/* Page Footer */}
        <footer className="vfstr-footer">
          <div className="footer-left">
            <ShieldCheck size={16} />
            <span>
              VFSTR Campus Transport Planner Pilot · NAAC 'A+' Grade · Vadlamudi, Guntur
            </span>
          </div>
          <div className="footer-right">
            <span>
              <Footprints size={14} /> Sustainable Campus Transit
            </span>
            <span className="footer-divider">·</span>
            <span>Helpline: 1800-425-2529</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
