import React from "react";
import { Map, BookOpen, PhoneCall } from "lucide-react";
import vignanLogoHorizontal from "../assets/vignan-logo-horizontal.png";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="topbar">
      <div className="brand-group">
        <a
          className="brand-logo-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("planner");
          }}
          title="Vignan's Foundation for Science, Technology & Research"
        >
          <img
            src={vignanLogoHorizontal}
            alt="Vignan's Foundation for Science, Technology & Research - Deemed to be University"
            className="navbar-vignan-logo"
          />
          <div className="brand-divider" />
          <div className="brand-text">
            <span className="brand-title">CAMPUS <span className="brand-accent">NAVIGATOR</span></span>
            <span className="brand-subtitle">Smart Route Planner</span>
          </div>
        </a>
        <span className="status-pill">
          <span className="pulse-dot" /> NAAC A+ Pilot
        </span>
      </div>

      <nav className="nav-tabs" aria-label="Main Navigation">
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === "planner" ? "active" : ""}`}
          onClick={() => setActiveTab("planner")}
        >
          <Map size={15} />
          <span>Route Planner</span>
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === "directory" ? "active" : ""}`}
          onClick={() => setActiveTab("directory")}
        >
          <BookOpen size={15} />
          <span>Campus Directory</span>
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          <PhoneCall size={15} />
          <span>Helplines &amp; Info</span>
        </button>
      </nav>
    </header>
  );
}
