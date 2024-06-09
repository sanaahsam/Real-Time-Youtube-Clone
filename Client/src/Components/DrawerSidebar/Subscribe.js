import React from "react";

function Subscribe(prop) {
  return (
    <div className="subs">
      <img
        src={`https://mernclone-sana-ahsams-projects.vercel.app/${prop.data.picture}`}
        alt="subs"
      />
      <p>{prop.data.handle}</p>
    </div>
  );
}

export default Subscribe;
