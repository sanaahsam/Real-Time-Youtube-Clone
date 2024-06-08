import React from "react";

function Subscribe(prop) {
  return (
    <div className="subs">
      <img src={`http://localhost:5000/${prop.data.picture}`} alt="subs" />
      <p>{prop.data.handle}</p>
    </div>
  );
}

export default Subscribe;
