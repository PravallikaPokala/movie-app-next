import React from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/Dialog.module.css";
import FocusTrap from "focus-trap-react";

const Dialog = ({ title, children, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalWrapper}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
