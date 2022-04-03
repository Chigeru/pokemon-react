import React from "react";

import loadingClasses from "./design/LoadingIcon.module.css";

function loading() {
  return (
    <div className={loadingClasses.loadingBox}>
      <div className={loadingClasses.loadingRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={loadingClasses.loadingText}>Loading</p>
    </div>
  );
}

export default loading;
