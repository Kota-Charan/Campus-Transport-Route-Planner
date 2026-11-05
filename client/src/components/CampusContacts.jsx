import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Headphones,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import vignanLogoVertical from "../assets/vignan-logo-vertical.png";

export default function CampusContacts({ contacts }) {
  const { mainCampusAddress, helplines, emails, corporateOffice } = contacts;

  return (
    <div className="contacts-view-container">
      <div className="contacts-header">
        <img
          src={vignanLogoVertical}
          alt="Vignan University Logo"
          className="contacts-vignan-crest"
        />
        <div>
          <h2>VFSTR Campus Directory &amp; Emergency Helplines</h2>
          <p>
            Official contact points, central EPABX exchange, deans' offices, and campus
            transit helplines for Vignan's Foundation for Science, Technology &amp; Research (VFSTR).
          </p>
        </div>
      </div>

      <div className="contacts-grid">
        {/* Main Campus Address */}
        <div className="contact-card address-card">
          <div className="card-header-icon">
            <MapPin size={20} />
            <h3>Main Campus Location</h3>
          </div>
          <div className="address-details">
            <p className="primary-address">
              <strong>{mainCampusAddress.street}</strong>
              <br />
              {mainCampusAddress.village}, {mainCampusAddress.mandal}
              <br />
              {mainCampusAddress.district}, {mainCampusAddress.state} - {mainCampusAddress.pincode}
              <br />
              {mainCampusAddress.country}
            </p>
            <div className="transit-note">
              <span>📍 Located conveniently on the Guntur - Tenali Highway with regular transit shuttles.</span>
            </div>
          </div>
        </div>

        {/* Helplines */}
        <div className="contact-card helpline-card">
          <div className="card-header-icon">
            <Headphones size={20} />
            <h3>Helplines &amp; EPABX</h3>
          </div>
          <ul className="helpline-list">
            <li>
              <span className="hl-label">Central EPABX:</span>
              <a href={`tel:${helplines.centralEpabx}`} className="hl-number">
                {helplines.centralEpabx}
              </a>
            </li>
            <li>
              <span className="hl-label">Toll Free:</span>
              <a href={`tel:${helplines.tollFree}`} className="hl-number highlight">
                {helplines.tollFree}
              </a>
            </li>
            <li>
              <span className="hl-label">National Student Hotline:</span>
              <a href={`tel:${helplines.nationalHotline}`} className="hl-number">
                {helplines.nationalHotline}
              </a>
            </li>
            <li>
              <span className="hl-label">Admission Desk 1:</span>
              <a href={`tel:${helplines.admissionDesk1}`} className="hl-number">
                {helplines.admissionDesk1}
              </a>
            </li>
            <li>
              <span className="hl-label">Admission Desk 2:</span>
              <a href={`tel:${helplines.admissionDesk2}`} className="hl-number">
                {helplines.admissionDesk2}
              </a>
            </li>
            <li>
              <span className="hl-label">Fax:</span>
              <span className="hl-number text-muted">{helplines.fax}</span>
            </li>
          </ul>
        </div>

        {/* Official Emails */}
        <div className="contact-card email-card">
          <div className="card-header-icon">
            <Mail size={20} />
            <h3>Official Department Emails</h3>
          </div>
          <ul className="email-list">
            <li>
              <span className="em-dept">Admissions Division:</span>
              <a href={`mailto:${emails.admissions}`} className="em-link">
                {emails.admissions}
              </a>
            </li>
            <li>
              <span className="em-dept">IT Services &amp; Network:</span>
              <a href={`mailto:${emails.itServices}`} className="em-link">
                {emails.itServices}
              </a>
            </li>
            <li>
              <span className="em-dept">International Affairs &amp; Outreach:</span>
              <a href={`mailto:${emails.internationalAffairs}`} className="em-link">
                {emails.internationalAffairs}
              </a>
            </li>
          </ul>
        </div>

        {/* Corporate Office */}
        <div className="contact-card corporate-card">
          <div className="card-header-icon">
            <Building2 size={20} />
            <h3>{corporateOffice.branch}</h3>
          </div>
          <div className="corporate-details">
            <p>{corporateOffice.address}</p>
            <div className="city-office-note">
              <span>City administration and student information outreach center.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
