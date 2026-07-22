"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./povesti.module.css";

const PovestiModal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // portál do <body>: stránka dává obsahu z-index 1 (vrstevnice v pozadí),
  // uvnitř toho stacking contextu by modál skončil pod sticky menu
  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Zavřít"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default PovestiModal;
