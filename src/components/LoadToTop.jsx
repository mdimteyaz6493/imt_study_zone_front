import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function LoadToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default LoadToTop;