import React from "react";
import { GraduationCap, Sun, Leaf, Award, CheckCircle2 } from "lucide-react";
import vignanLogoVertical from "../assets/vignan-logo-vertical.png";

export default function UniversityBanner({ profile }) {
  return (
    <section className="university-banner">
      <div className="banner-header">
        {/* Official Vignan Crest Logo */}
        <div className="banner-logo-wrapper">
          <img
            src={vignanLogoVertical}
            alt="Vignan University Official Crest"
            className="banner-vignan-crest"
          />
        </div>

        <div className="banner-title-area">
          <div className="banner-kicker">
            <GraduationCap size={14} />
            <span>OFFICIAL CAMPUS MOBILITY PILOT</span>
          </div>
          <h1>{profile.officialName}</h1>
          <p className="university-status">{profile.status}</p>

          <div className="banner-badges">
            <div className="banner-chip academic-chip">
              <CheckCircle2 size={14} />
              <span>{profile.academicModel}</span>
            </div>
            <div className="banner-chip green-chip" title="Sustainable Mobility Initiatives">
              <Sun size={14} className="sun-icon" />
              <Leaf size={14} className="leaf-icon" />
              <span>Green Campus: {profile.greenFootprint}</span>
            </div>
          </div>
        </div>

        <div className="accreditation-badge">
          <Award size={22} className="badge-icon" />
          <div>
            <strong className="badge-grade">{profile.accreditation}</strong>
            <span className="badge-label">Accreditation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
