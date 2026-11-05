import React, { useState } from "react";
import {
  Footprints,
  Bus,
  Bike,
  Clock,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Leaf,
  Info,
  ShieldCheck,
  MapPin,
  Camera
} from "lucide-react";

export default function RouteCard({
  route,
  startLocation,
  destinationLocation,
  transportFilter,
  onViewBuilding
}) {
  const [copied, setCopied] = useState(false);

  if (!route || !startLocation || !destinationLocation) {
    return (
      <div className="empty-route-state">
        <div className="empty-illustration">
          <Compass size={36} className="compass-spin-slow" />
        </div>
        <h3>Select Your Campus Route</h3>
        <p>
          Pick an origin and a destination above, or click on the interactive campus map
          to calculate estimated travel distance, time, and available transit options.
        </p>
        <div className="empty-tips">
          <span>💡 <strong>Tip:</strong> Click any building on the map to view Google Maps photos &amp; floor directory.</span>
        </div>
      </div>
    );
  }

  // Format distance
  const distanceKm = route.distance;
  const distanceMeters = Math.round(distanceKm * 1000);
  const estimatedSteps = Math.round(distanceKm * 1350);

  // Carbon savings calculation vs fossil fuel car (120g CO2 / km)
  const co2SavedGrams = Math.round(distanceKm * 120);

  // Filter check
  const matchesFilter =
    transportFilter === "All" || route.options.includes(transportFilter);

  // Copy route info to clipboard
  const handleCopy = () => {
    const text = `VFSTR Campus Route: ${startLocation.name} to ${destinationLocation.name} | Distance: ${distanceKm} km (${distanceMeters} m) | Time: ${route.time} mins | Transport: ${route.options.join(", ")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="route-result-card">
      {/* Route Header Banner */}
      <div className="result-header">
        <div className="route-endpoints">
          <div
            className="endpoint-badge origin clickable-endpoint"
            onClick={() => onViewBuilding && onViewBuilding(startLocation.id)}
            title="Click to view building photos"
          >
            <span className="code-pill">{startLocation.id}</span>
            <span className="endpoint-name">{startLocation.name}</span>
            <Camera size={13} className="endpoint-cam" />
          </div>
          <div className="route-flow-arrow">
            <ArrowRight size={18} />
          </div>
          <div
            className="endpoint-badge destination clickable-endpoint"
            onClick={() => onViewBuilding && onViewBuilding(destinationLocation.id)}
            title="Click to view building photos"
          >
            <span className="code-pill">{destinationLocation.id}</span>
            <span className="endpoint-name">{destinationLocation.name}</span>
            <Camera size={13} className="endpoint-cam" />
          </div>
        </div>

        <button
          type="button"
          className="btn-copy-route"
          onClick={handleCopy}
          title="Copy route details"
        >
          {copied ? (
            <>
              <Check size={14} className="copied-icon" /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Share
            </>
          )}
        </button>
      </div>

      {/* Metrics Row: Distance & Time */}
      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">ESTIMATED DISTANCE</span>
          <div className="metric-value-group">
            <strong className="metric-number">{distanceKm}</strong>
            <span className="metric-unit">km</span>
            <span className="metric-sub">({distanceMeters} meters)</span>
          </div>
        </div>

        <div className="metric-box">
          <span className="metric-label">ESTIMATED TRAVEL TIME</span>
          <div className="metric-value-group">
            <Clock size={20} className="time-icon" />
            <strong className="metric-number">{route.time}</strong>
            <span className="metric-unit">mins</span>
          </div>
          <span className="metric-sub">Average campus transit pace</span>
        </div>

        <div className="metric-box eco-box">
          <span className="metric-label">GREEN IMPACT</span>
          <div className="metric-value-group">
            <Leaf size={18} className="leaf-icon" />
            <strong className="metric-number">{co2SavedGrams}g</strong>
            <span className="metric-unit">CO₂</span>
          </div>
          <span className="metric-sub">Saved vs motorized commute</span>
        </div>
      </div>

      {/* Filter Warning if active filter is not in options */}
      {!matchesFilter && (
        <div className="filter-mismatch-warning">
          <Info size={15} />
          <span>
            Note: <strong>{transportFilter}</strong> is not listed as a standard option
            for this direct route. Below are the verified modes:
          </span>
        </div>
      )}

      {/* Transport Options Section */}
      <div className="transport-options-section">
        <div className="section-title-row">
          <span className="section-title">AVAILABLE TRANSPORT OPTIONS</span>
          <span className="options-count">
            {route.options.length} {route.options.length === 1 ? "Mode Available" : "Modes Available"}
          </span>
        </div>

        <div className="transport-cards-list">
          {route.options.map((option) => {
            const isWalk = option === "Walk";
            const isShuttle = option === "Campus Shuttle";
            const isBicycle = option === "Bicycle Share";

            return (
              <div
                key={option}
                className={`transport-mode-card ${
                  transportFilter === option ? "highlighted" : ""
                } ${isShuttle ? "mode-shuttle" : isBicycle ? "mode-bicycle" : "mode-walk"}`}
              >
                <div className="mode-icon-wrapper">
                  {isWalk && <Footprints size={22} />}
                  {isShuttle && <Bus size={22} />}
                  {isBicycle && <Bike size={22} />}
                </div>

                <div className="mode-content">
                  <div className="mode-title-row">
                    <h4>{option}</h4>
                    {isShuttle && <span className="mode-tag hub-tag">Departs A-Block Hub</span>}
                    {isBicycle && <span className="mode-tag green-tag">Zero Emissions</span>}
                    {isWalk && <span className="mode-tag fit-tag">~{estimatedSteps} Steps</span>}
                  </div>
                  <p className="mode-description">
                    {isWalk &&
                      "Paved, shaded pedestrian campus walkways. Quick, healthy, and accessible for all students."}
                    {isShuttle &&
                      "Clean electric campus shuttle service connecting major academic wings, labs, and residential sectors."}
                    {isBicycle &&
                      "Eco-friendly shared campus bicycles stationed at major block checkpoints for rapid cross-campus transit."}
                  </p>
                </div>

                <div className="mode-status">
                  <CheckCircle2 size={16} className="status-check" />
                  <span>Available</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Itinerary Steps */}
      <div className="itinerary-timeline">
        <span className="section-title">ROUTE WAYPOINTS &amp; DETAILS</span>
        <div className="timeline-items">
          <div
            className="timeline-item start-item clickable-timeline"
            onClick={() => onViewBuilding && onViewBuilding(startLocation.id)}
            title="Click to view building photos"
          >
            <div className="timeline-marker start-marker">
              <MapPin size={14} />
            </div>
            <div className="timeline-body">
              <div className="timeline-title">
                <strong>Start: {startLocation.name}</strong>
                <span className="block-tag">{startLocation.id}</span>
                <span className="view-photo-pill"><Camera size={11} /> Photos</span>
              </div>
              <p className="timeline-desc">{startLocation.details}</p>
            </div>
          </div>

          <div className="timeline-connector">
            <span className="connector-line" />
            <span className="connector-text">
              {distanceKm} km · {route.time} min travel time via {route.options.join(" / ")}
            </span>
          </div>

          <div
            className="timeline-item dest-item clickable-timeline"
            onClick={() => onViewBuilding && onViewBuilding(destinationLocation.id)}
            title="Click to view building photos"
          >
            <div className="timeline-marker dest-marker">
              <MapPin size={14} />
            </div>
            <div className="timeline-body">
              <div className="timeline-title">
                <strong>Destination: {destinationLocation.name}</strong>
                <span className="block-tag">{destinationLocation.id}</span>
                <span className="view-photo-pill"><Camera size={11} /> Photos</span>
              </div>
              <p className="timeline-desc">{destinationLocation.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
