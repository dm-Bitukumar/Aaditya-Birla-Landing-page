import React, { useEffect, useRef, useState } from "react";
import taglines from "../../../../constants/taglines.json";
import "./TaglineScroller.css";
import { first } from "lodash";

const TaglineScroller = () => {
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const secondRowRef = useRef(null);
  const firstRowRef = useRef(null);
  const [animationKey, setAnimationKey] = useState(Date.now());

  useEffect(() => {
    setAnimationKey(Date.now());
  }, []);

  useEffect(() => {
    const line1Tags = taglines.filter((tag) => tag.line === 1);
    const line2Tags = taglines.filter((tag) => tag.line === 2);
    setLine1(line1Tags);
    setLine2(line2Tags);
  }, []);

  useEffect(() => {
    if (secondRowRef.current) {
      secondRowRef.current.scrollLeft = 120;
    }
    if (firstRowRef.current) {
      firstRowRef.current.scrollLeft = 130;
    }
  }, [line2]);

  return (
    <div className="tagline-container">
      <div className="tagline-scroll-wrapper">
        <div
          className="tagline-row"
          key={`line1-${animationKey}`}
          ref={firstRowRef}
        >
          {[...line1, ...line1].map((tag, index) => (
            <div
              key={`line1-${index}`}
              className="tag-pill"
              style={{ backgroundColor: tag.color, color: tag.textColor }}
            >
              <img src={tag.icon} alt="" className="tag-icon" />
              {tag.label}
            </div>
          ))}
        </div>
      </div>

      <div className="tagline-scroll-wrapper">
        <div
          className="tagline-row"
          key={`line2-${animationKey}`}
          ref={secondRowRef}
        >
          {[...line2, ...line2].map((tag, index) => (
            <div
              key={`line2-${index}`}
              className="tag-pill"
              style={{ backgroundColor: tag.color, color: tag.textColor }}
            >
              <img src={tag.icon} alt="" className="tag-icon" />
              {tag.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaglineScroller;
