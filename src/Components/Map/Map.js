import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { memo, useCallback, useRef } from "react";

import { LIMA_LOCATION } from "@Utilities/map";

import mapTheme from "./mapThemes";

function Map({ onLoadMap = () => {}, children }) {
  const containerRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    onLoadMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    onLoadMap(null);
  }, []);

  return isLoaded ? (
    <div className="w-full h-full" ref={containerRef}>
      <GoogleMap
        mapContainerClassName="h-full"
        options={{
          styles: mapTheme,
          disableDefaultUI: true,
        }}
        center={LIMA_LOCATION}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {children}
      </GoogleMap>
    </div>
  ) : (
    <div>No se pudo cargar el mapa</div>
  );
}

export default memo(Map);
