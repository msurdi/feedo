import { useEffect, useState } from "react";
import { useIntersection } from "react-use";

const IntersectionObserver = ({ onExitTop, intersectionRef }) => {
  const [exitedTop, setExitedTop] = useState(false);
  const intersection = useIntersection(intersectionRef, {
    root: document.querySelector("#viewport"),
    rootMargin: "0px",
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection) {
      const {
        isIntersecting,
        boundingClientRect: { top },
      } = intersection;

      if (!isIntersecting && top < 0) {
        if (!exitedTop) {
          setExitedTop(true);
          onExitTop();
        }
      }
    }
  }, [exitedTop, intersection, onExitTop]);

  return <div />;
};

export default IntersectionObserver;
