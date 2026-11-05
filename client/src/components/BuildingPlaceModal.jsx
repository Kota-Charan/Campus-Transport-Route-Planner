import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  Bus,
  Navigation,
  Compass,
  Share2,
  Bookmark,
  Check,
  Building,
  Layers,
  Sparkles,
  ChevronRight,
  Maximize2
} from "lucide-react";

export default function BuildingPlaceModal({
  building,
  onClose,
  onSetAsStart,
  onSetAsDestination
}) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'photos' | 'reviews'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!building) return null;

  const handleShare = () => {
    const text = `VFSTR Campus - ${building.name} (${building.address})`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="place-modal-backdrop" onClick={onClose}>
      <div
        className="place-modal-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`${building.name} Google Maps Place View`}
      >
        {/* Top Floating Close Button */}
        <button
          type="button"
          className="btn-place-close"
          onClick={onClose}
          aria-label="Close Place View"
        >
          <X size={20} />
        </button>

        {/* Hero Photo Carousel / Header */}
        <div className="place-hero-container">
          <img
            src={building.photos[selectedPhotoIndex]?.url || building.primaryPhoto}
            alt={building.photos[selectedPhotoIndex]?.caption || building.name}
            className="place-hero-image"
          />
          <div className="place-hero-overlay" />
          
          <div className="place-photo-counter">
            <span>📷 {selectedPhotoIndex + 1} / {building.photos.length}</span>
            <span className="photo-tag-pill">{building.photos[selectedPhotoIndex]?.tag}</span>
          </div>

          <div className="place-hero-content">
            <span className="place-code-badge">Building #{building.mapNumber} · [{building.id}]</span>
            <h2 className="place-title">{building.name}</h2>
            <p className="place-category">{building.category}</p>
          </div>
        </div>

        {/* Google Maps Action Toolbar */}
        <div className="place-action-toolbar">
          <button
            type="button"
            className="btn-toolbar-action primary-action"
            onClick={() => {
              onSetAsDestination(building.id);
              onClose();
            }}
          >
            <Navigation size={17} />
            <span>Directions</span>
          </button>

          <button
            type="button"
            className="btn-toolbar-action secondary-action"
            onClick={() => {
              onSetAsStart(building.id);
              onClose();
            }}
          >
            <Compass size={17} />
            <span>Start Here</span>
          </button>

          <button
            type="button"
            className={`btn-toolbar-action icon-action ${isSaved ? "saved" : ""}`}
            onClick={() => setIsSaved(!isSaved)}
            title="Bookmark place"
          >
            <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            className="btn-toolbar-action icon-action"
            onClick={handleShare}
            title="Share place"
          >
            {copiedLink ? <Check size={17} className="check-green" /> : <Share2 size={17} />}
            <span>{copiedLink ? "Copied" : "Share"}</span>
          </button>
        </div>

        {/* Ratings & Status Pill Bar */}
        <div className="place-meta-bar">
          <div className="rating-pill">
            <span className="rating-score">{building.rating}</span>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(building.rating) ? "star-gold" : "star-gray"}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="review-count">({building.reviewCount} student reviews)</span>
          </div>

          <div className="hours-pill">
            <span className="dot-green" />
            <span>{building.hours}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="place-tabs">
          <button
            type="button"
            className={`place-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            type="button"
            className={`place-tab-btn ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            Photos ({building.photos.length})
          </button>
          <button
            type="button"
            className={`place-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({building.reviews.length})
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="place-body-scroll">
          {activeTab === "overview" && (
            <div className="tab-pane overview-pane">
              {/* Location & Contact Information */}
              <div className="info-cards-group">
                <div className="info-row">
                  <MapPin size={18} className="info-icon" />
                  <div>
                    <strong>Campus Address</strong>
                    <p>{building.address}</p>
                    <span className="plus-code">{building.plusCode}</span>
                  </div>
                </div>

                <div className="info-row">
                  <Clock size={18} className="info-icon" />
                  <div>
                    <strong>Operating Hours</strong>
                    <p>{building.hours}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Bus size={18} className="info-icon transit-blue" />
                  <div>
                    <strong>Transit &amp; Shuttle Access</strong>
                    <p>{building.shuttleInfo}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Phone size={18} className="info-icon" />
                  <div>
                    <strong>Internal Helpline</strong>
                    <a href={`tel:${building.phone}`} className="phone-link">
                      {building.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="section-block">
                <h4 className="section-title">KEY HIGHLIGHTS &amp; DEPARTMENTS</h4>
                <div className="highlights-pills">
                  {building.highlights.map((item, idx) => (
                    <span key={idx} className="highlight-tag">
                      <Sparkles size={12} /> {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floor-by-Floor Directory */}
              <div className="section-block">
                <h4 className="section-title">FLOOR DIRECTORY</h4>
                <div className="floors-list">
                  {building.floors.map((f, idx) => (
                    <div key={idx} className="floor-card">
                      <span className="floor-name">{f.floor}</span>
                      <p className="floor-desc">{f.facilities}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Amenities */}
              <div className="section-block">
                <h4 className="section-title">FACILITIES &amp; ACCESSIBILITY</h4>
                <div className="amenities-grid">
                  {building.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-chip">
                      <Check size={14} className="amenity-check" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="tab-pane photos-pane">
              <div className="photos-gallery-grid">
                {building.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className={`photo-card ${selectedPhotoIndex === idx ? "active-photo" : ""}`}
                    onClick={() => setSelectedPhotoIndex(idx)}
                  >
                    <img src={photo.url} alt={photo.caption} className="gallery-thumb" />
                    <div className="photo-card-info">
                      <span className="photo-card-tag">{photo.tag}</span>
                      <p className="photo-card-caption">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-pane reviews-pane">
              <div className="reviews-summary-card">
                <div className="summary-left">
                  <strong className="summary-rating">{building.rating}</strong>
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="star-gold" fill="currentColor" />
                    ))}
                  </div>
                  <span>{building.reviewCount} Ratings</span>
                </div>
                <div className="summary-right">
                  <p>Verified student and faculty feedback for {building.name}.</p>
                </div>
              </div>

              <div className="reviews-list">
                {building.reviews.map((rev, idx) => (
                  <div key={idx} className="review-item">
                    <div className="review-top">
                      <div className="user-avatar">{rev.user.charAt(0)}</div>
                      <div>
                        <strong>{rev.user}</strong>
                        <span className="review-time">{rev.time}</span>
                      </div>
                      <div className="review-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={12} className="star-gold" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

