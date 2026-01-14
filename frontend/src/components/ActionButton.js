import React, { useState } from "react";

export default function ActionButton({ icon, iconHover, children, ...props }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={hover ? iconHover : icon} alt="" className="btn-icon" />
      {children}
    </button>
  );
}
