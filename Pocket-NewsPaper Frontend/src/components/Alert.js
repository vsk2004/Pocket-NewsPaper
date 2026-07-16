import React from "react";

function Alert({ alert }) {

  if (!alert) return null;

  return (
    <div
      style={{
      position: "fixed",
      top: "110px",
      left: "65%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      width: "80%",
      maxWidth: "400px",
}}
    >
      <div className={`alert alert-${alert.type}`} role="alert">
        <strong>{alert.type.toUpperCase()}</strong>: {alert.msg}
      </div>
    </div>
  );
}

export default Alert;