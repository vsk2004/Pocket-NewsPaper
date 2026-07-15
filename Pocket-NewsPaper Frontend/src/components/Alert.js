import React from "react";

function Alert({ alert }) {

  if (!alert) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "90%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: "350px",
      }}
    >
      <div className={`alert alert-${alert.type}`} role="alert">
        <strong>{alert.type.toUpperCase()}</strong>: {alert.msg}
      </div>
    </div>
  );
}

export default Alert;