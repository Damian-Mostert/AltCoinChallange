import type { WindowSize, WindowSizeProviderProps } from "../types/window";
import  { createContext, useContext, useEffect, useState } from "react";

export const WindowSizeContext = createContext<WindowSize>({
  width: 1800,
  height:1800,
  resizing: false,
});

export default function WindowSizeProvider({ children }: WindowSizeProviderProps) {
  const [event, setEvent] = useState<WindowSize>({
    width: 1800,
    height: 1800,
    resizing: false,
  });

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      if(typeof window == "undefined")return;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      if (currentWidth === event.width) return;
      if (!event.resizing) {
        setEvent((prev) => ({ ...prev, resizing: true }));
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setEvent({
          width: currentWidth,
          height: currentHeight,
          resizing: false,
        });
      }, 200);
    };

    handleResize();
    if(typeof window == "undefined")return;
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [event.width, event.resizing]);

  return (
    <WindowSizeContext.Provider value={event}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export const useWindow= () =>{
    const c = useContext(WindowSizeContext);
    if(!c){
        throw new Error("useWindowSize must be used within WindowSizeContext");
    }
    return c;
};
