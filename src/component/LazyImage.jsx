import React, { useRef, useState, useEffect } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : ""}
      alt={alt}
      className={className}
      loading="lazy" // This attribute provides native lazy-loading for browsers that support it
    />
  );
};

export default LazyImage;
