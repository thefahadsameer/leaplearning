import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./PromotionPopup.css";

import promotionBanner from "../../assets/promotions/promotion-banner.png";


/* =========================================================
   PROMOTION CONFIGURATION
   ========================================================= */

const PROMOTION = {
  enabled: true,

  // Promotional image
  image: promotionBanner,

  // Popup delay in milliseconds
  delay: 1200,
};


/* =========================================================
   COMPONENT
   ========================================================= */

function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false);


  /* =======================================================
     SHOW POPUP ONCE PER BROWSER SESSION
     ======================================================= */

  useEffect(() => {
    if (!PROMOTION.enabled) {
      return;
    }

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

    return () => {
      clearTimeout(timer);
    };
  }, []);


  /* =======================================================
     PREVENT BACKGROUND SCROLL WHEN POPUP IS OPEN
     ======================================================= */

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


  /* =======================================================
     CLOSE POPUP
     ======================================================= */

  const handleClose = () => {
    setIsOpen(false);
  };


  /* =======================================================
     RENDER
     ======================================================= */

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
        aria-label="Leap Learning promotion"
      >

        {/* =================================================
            CLOSE BUTTON
            ================================================= */}

        <button
          type="button"
          className="promotion-close"
          onClick={handleClose}
          aria-label="Close promotion"
        >
          <X
            size={20}
            strokeWidth={2}
          />
        </button>


        {/* =================================================
            PROMOTIONAL IMAGE
            ================================================= */}

        <div className="promotion-image-wrapper">
          <img
            src={PROMOTION.image}
            alt="Leap Learning Promotion"
            className="promotion-image"
          />
        </div>

      </div>
    </div>
  );
}

export default PromotionPopup;