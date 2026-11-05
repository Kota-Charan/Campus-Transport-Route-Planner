import React, { useState } from "react";
import { Search, Building, Navigation, MapPin, Camera, Star, Sparkles } from "lucide-react";
import { campusBuildingDetails } from "../data/buildingDetails.js";
import BuildingPlaceModal from "./BuildingPlaceModal.jsx";

export default function LocationDirectory({
  locations,
  start,
  destination,
  onSelectStart,
  onSelectDestination,
  onBackToPlanner
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalBuildingId, setModalBuildingId] = useState(null);

  const filteredLocations = locations.filter((loc) => {
    const q = searchTerm.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.id.toLowerCase().includes(q) ||
      loc.details.toLowerCase().includes(q) ||
      (loc.category && loc.category.toLowerCase().includes(q))
    );
  });

  const selectedModalBuilding = modalBuildingId
    ? campusBuildingDetails[modalBuildingId]
    : null;

  return (
    <div className="directory-container">
      <div className="directory-header">
        <div>
          <h2>VFSTR Campus Locations &amp; Facilities Directory</h2>
          <p>
            Explore academic wings, administrative blocks, labs, library, and residential hostels
            with verified photos and Google Maps place insights.
          </p>
        </div>

        {/* Search input */}
        <div className="directory-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by block, department, or facility..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="directory-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Locations */}
      <div className="directory-grid">
        {filteredLocations.map((loc) => {
          const isStart = loc.id === start;
          const isDest = loc.id === destination;
          const details = campusBuildingDetails[loc.id];

          return (
            <div
              key={loc.id}
              className={`location-card ${isStart ? "card-is-start" : ""} ${
                isDest ? "card-is-dest" : ""
              }`}
            >
              {/* Photo Thumbnail with click trigger */}
              {details && (
                <div
                  className="card-photo-hero"
                  onClick={() => setModalBuildingId(loc.id)}
                  title="Click to view building photos & street view"
                >
                  <img src={details.primaryPhoto} alt={loc.name} className="card-thumb-img" />
                  <div className="card-photo-badges">
                    <span className="card-star-badge">
                      <Star size={11} fill="currentColor" /> {details.rating}
                    </span>
                    <span className="card-view-photos-btn">
                      <Camera size={12} /> View {details.photos.length} Photos
                    </span>
                  </div>
                </div>
              )}

              <div className="card-top">
                <div className="card-id-badge">
                  <Building size={16} />
                  <span>{loc.id}</span>
                </div>
                {loc.badge && <span className="card-feature-badge">{loc.badge}</span>}
              </div>

              <h3
                className="card-title clickable-title"
                onClick={() => setModalBuildingId(loc.id)}
                title="Click to view Google Maps Place View"
              >
                {loc.name}
              </h3>
              <p className="card-details">{loc.details}</p>

              <div className="card-footer-actions">
                <button
                  type="button"
                  className={`btn-dir-action ${isStart ? "active-start" : ""}`}
                  onClick={() => {
                    onSelectStart(loc.id);
                    onBackToPlanner();
                  }}
                >
                  <Navigation size={13} />
                  {isStart ? "Selected Origin" : "Set as Origin"}
                </button>

                <button
                  type="button"
                  className={`btn-dir-action ${isDest ? "active-dest" : ""}`}
                  onClick={() => {
                    onSelectDestination(loc.id);
                    onBackToPlanner();
                  }}
                >
                  <MapPin size={13} />
                  {isDest ? "Selected Dest" : "Set as Dest"}
                </button>
              </div>
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="no-results-state">
            <p>No campus locations found matching "{searchTerm}".</p>
            <button
              type="button"
              className="btn-clear-filter"
              onClick={() => setSearchTerm("")}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Building Place Modal */}
      {selectedModalBuilding && (
        <BuildingPlaceModal
          building={selectedModalBuilding}
          onClose={() => setModalBuildingId(null)}
          onSetAsStart={(id) => {
            onSelectStart(id);
            onBackToPlanner();
          }}
          onSetAsDestination={(id) => {
            onSelectDestination(id);
            onBackToPlanner();
          }}
        />
      )}
    </div>
  );
}
