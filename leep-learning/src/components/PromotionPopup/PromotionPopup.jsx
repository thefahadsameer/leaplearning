import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import "./PromotionPopup.css";

/* =========================================================
   PROMOTION CONFIGURATION
   =========================================================
   CHANGE ONLY THIS SECTION WHEN YOU WANT TO CHANGE THE AD.
   ========================================================= */

const PROMOTION = {
  enabled: true,

  // Popup title / campaign label
  badge: "SPECIAL ANNOUNCEMENT",

  // Main heading
  title: "Additional Scholarships Available",

  // Supporting text
  description:
    "Leap Learning is offering additional scholarship opportunities for eligible applicants. Explore the available programs and scholarship benefits.",

  // Optional promotional image
  image: "/promotion/promotion-banner.jpg",

  // Button
  buttonText: "Explore Now",

  // Where the button should go
  buttonLink: "/contact",

  // Set to true if buttonLink is an external website
  externalLink: false,

  // Popup timing
  delay: 1200,
};

/* =========================================================
   COMPONENT
   ========================================================= */

function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!PROMOTION.enabled) {
      return;
    }

    /*
      Session-based display:

      The popup appears once during a browser session.
      Closing it means it will not immediately appear again
      while the visitor continues browsing the website.

      This does NOT use localStorage.
    */

    const alreadyShown = sessionStorage.getItem(
      "leap_learning_promotion_shown"
    );

    if (alreadyShown) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(
        "leap_learning_promotion_shown",
        "true"
      );
    }, PROMOTION.delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    setIsOpen(false);

    if (PROMOTION.externalLink) {
      window.open(
        PROMOTION.buttonLink,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    window.location.href = PROMOTION.buttonLink;
  };

  if (!PROMOTION.enabled || !isOpen) {
    return null;
  }

  return (
    <div
      className="promotion-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="promotion-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promotion-popup-title"
      >
        {/* Close Button */}
        <button
          type="button"
          className="promotion-close"
          onClick={handleClose}
          aria-label="Close promotion"
        >
          <X size={20} strokeWidth={2} />
        </button>

        {/* Promotional Image */}
        {PROMOTION.image && (
          <div className="promotion-image-wrapper">
            <img
              src={PROMOTION.image}
              alt={PROMOTION.title}
              className="promotion-image"
            />
          </div>
        )}

        {/* Content */}
        <div className="promotion-content">

          {PROMOTION.badge && (
            <span className="promotion-badge">
              {PROMOTION.badge}
            </span>
          )}

          <h2 id="promotion-popup-title">
            {PROMOTION.title}
          </h2>

          <p className="promotion-description">
            {PROMOTION.description}
          </p>

          <button
            type="button"
            className="promotion-action"
            onClick={handleAction}
          >
            <span>{PROMOTION.buttonText}</span>

            <ArrowRight
              size={18}
              strokeWidth={2}
            />
          </button>

          <button
            type="button"
            className="promotion-dismiss"
            onClick={handleClose}
          >
            Maybe Later
          </button>

        </div>
      </div>
    </div>
  );
}

export default PromotionPopup;