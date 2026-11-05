import React from "react";
import {
  MapPin,
  LocateFixed,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Footprints,
  Bus,
  Bike,
  Navigation
} from "lucide-react";

export default function RouteSelector({
  locations,
  start,
  destination,
  onStartChange,
  onDestinationChange,
  onSwap,
  onReset,
  transportFilter,
  onFilterChange,
  presets,
  onPresetSelect,
  isSameLocation
}) {
  return (
    <div className="route-selector-container">
      <div className="form-header">
        <div className="form-header-title">
          <span className="icon-wrapper">
            <Navigation size={18} />
          </span>
          <div>
            <h2>Plan Campus Transit</h2>
            <p>Select your origin and destination within VFSTR campus</p>
          </div>
        </div>
        {(start || destination) && (
          <button
            type="button"
            className="btn-text-reset"
            onClick={onReset}
            title="Reset selections"
          >
            <RotateCcw size={13} /> Reset
          </button>
        )}
      </div>

      <div className="selectors-wrapper">
        {/* Origin / Starting point */}
        <div className="input-group">
          <label htmlFor="start-location-select" className="input-label">
            <span className="label-dot origin-dot" /> STARTING POINT (ORIGIN)
          </label>
          <div className="select-container">
            <MapPin size={18} className="field-icon origin-icon" />
            <select
              id="start-location-select"
              value={start}
              onChange={(e) => onStartChange(e.target.value)}
              className="styled-select"
            >
              <option value="">-- Choose Origin Location --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} [{loc.id}]
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="swap-divider">
          <button
            type="button"
            className="btn-swap"
            onClick={onSwap}
            disabled={!start && !destination}
            aria-label="Swap starting point and destination"
            title="Swap Origin and Destination"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>

        {/* Destination point */}
        <div className="input-group">
          <label htmlFor="destination-location-select" className="input-label">
            <span className="label-dot dest-dot" /> DESTINATION (TARGET)
          </label>
          <div className="select-container">
            <LocateFixed size={18} className="field-icon dest-icon" />
            <select
              id="destination-location-select"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="styled-select"
            >
              <option value="">-- Choose Destination Location --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} [{loc.id}]
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Warning for Same Location Edge Case */}
      {isSameLocation && (
        <div className="alert-box alert-warning">
          <span>⚠️ <strong>Same Location Selected:</strong> Starting point and destination are identical. Please choose a different destination.</span>
        </div>
      )}

      {/* Mode Filter Selector */}
      <div className="filter-section">
        <span className="filter-label">PREFERRED TRANSPORT MODE</span>
        <div className="filter-buttons" role="group" aria-label="Transport Mode Filter">
          <button
            type="button"
            className={`filter-btn ${transportFilter === "All" ? "active" : ""}`}
            onClick={() => onFilterChange("All")}
          >
            <Sparkles size={14} /> All Options
          </button>
          <button
            type="button"
            className={`filter-btn ${transportFilter === "Walk" ? "active" : ""}`}
            onClick={() => onFilterChange("Walk")}
          >
            <Footprints size={14} /> Walk
          </button>
          <button
            type="button"
            className={`filter-btn ${transportFilter === "Campus Shuttle" ? "active" : ""}`}
            onClick={() => onFilterChange("Campus Shuttle")}
          >
            <Bus size={14} /> Campus Shuttle
          </button>
          <button
            type="button"
            className={`filter-btn ${transportFilter === "Bicycle Share" ? "active" : ""}`}
            onClick={() => onFilterChange("Bicycle Share")}
          >
            <Bike size={14} /> Bicycle Share
          </button>
        </div>
      </div>

      {/* Quick Route Presets */}
      <div className="presets-section">
        <span className="filter-label">POPULAR CAMPUS ROUTES</span>
        <div className="presets-chips">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`preset-chip ${start === preset.start && destination === preset.destination ? "active" : ""}`}
              onClick={() => onPresetSelect(preset.start, preset.destination)}
              title={preset.note}
            >
              <span className="preset-name">{preset.label}</span>
              <span className="preset-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

