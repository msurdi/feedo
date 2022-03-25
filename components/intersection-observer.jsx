import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

const IntersectionObserver = ({
  onExitTop,
  onEnterBottom,
  intersectionRef,
  rootElement = document.querySelector("#viewport"),
  threshold = 0.4,
  rootMargin = "0px",
  multiple = false,
}) => {
  const internalIntersectionRef = useRef();
  const [exitedTop, setExitedTop] = useState(false);
  const [enteredBottom, setEnteredBottom] = useState(false);
  const [previousIntersection, setPreviousIntersection] = useState(null);
  const intersection = useIntersection(
    intersectionRef ?? internalIntersectionRef,
    {
      root: rootElement,
      rootMargin,
      threshold,
    }
  );

  useEffect(() => {
    if (intersection === previousIntersection) {
      return;
    }
    if (intersection) {
      setPreviousIntersection(intersection);
      const {
        isIntersecting,
        boundingClientRect: { top },
      } = intersection;

      if (!isIntersecting && top < 0) {
        if (!exitedTop || multiple) {
          setExitedTop(true);
          onExitTop?.();
        }
      }

      if (isIntersecting && top > 0) {
        if (!enteredBottom || multiple) {
          setEnteredBottom(true);
          onEnterBottom?.();
        }
      }
    }
  }, [
    enteredBottom,
    exitedTop,
    intersection,
    multiple,
    onEnterBottom,
    onExitTop,
    previousIntersection,
  ]);

  const ref = !intersectionRef ? internalIntersectionRef : null;
  return <div ref={ref} />;
};

export default IntersectionObserver;
