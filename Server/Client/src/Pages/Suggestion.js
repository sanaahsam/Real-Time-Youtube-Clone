import React, { useRef } from "react";
import "../Pages/suggestion.css";

function Suggestion() {
  const suggestionContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    suggestionContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="suggestion-wrapper">
      <button
        className="scroll-btn scroll-btn-left"
        onClick={() => handleScroll(-200)}
      >
        &lt;
      </button>
      <div className="suggestion-container" ref={suggestionContainerRef}>
        <div className="suggestions">
          <div className="suggestion">All</div>
          <div className="suggestion">Music</div>
          <div className="suggestion">News</div>
          <div className="suggestion">Movie musicals</div>
          <div className="suggestion">Film criticisms</div>
          <div className="suggestion">Trailers</div>
          <div className="suggestion">Gaming</div>
          <div className="suggestion">Mixes</div>
          <div className="suggestion">Romantic comedies</div>
          <div className="suggestion">Podcasts</div>
          <div className="suggestion">Lives</div>
          <div className="suggestion">Computer programming</div>
          <div className="suggestion">Dramedy</div>
          <div className="suggestion">Korean drama</div>
          <div className="suggestion">Sketch comedy</div>
          <div className="suggestion">History</div>
          <div className="suggestion">Civil Services Exams</div>
          <div className="suggestion">Watched</div>
          <div className="suggestion">New to you</div>
        </div>
      </div>
      <button
        className="scroll-btn scroll-btn-right"
        onClick={() => handleScroll(200)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Suggestion;
