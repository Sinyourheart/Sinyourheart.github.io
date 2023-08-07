import React from "react";
import ComparisonChart from "./ComparisonChart";
import styles from "./visualization.module.css";

export default function ComparisonModal({ data, onClose }) {
  return (
    <div className={styles.comparisonmodal}>
      <div className={styles.comparisonmodalcontent}>
        <button onClick={onClose}>Close</button>
        {/* Display your comparison data here */}
        <ComparisonChart data={data} />
      </div>
    </div>
  );
}
