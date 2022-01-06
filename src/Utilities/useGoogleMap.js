import { MapContext } from "@react-google-maps/api";
import { isArray, values } from "lodash";
import { useContext } from "react";

import { getZoomCenter } from "./map";

export function useGoogleMap() {
  return useContext(MapContext);
}

export function center(map, stops) {
  const mapView = document.querySelector("#mapView");
  if (map && mapView) {
    const data = isArray(stops) ? stops : values(stops);
    const mWidth = mapView.offsetWidth;
    const bWidth = document.body.offsetWidth;
    const { zoom, center } = getZoomCenter(data, {
      width: mWidth,
      height: document.body.offsetHeight,
    });
    map.setZoom(zoom);
    map.setCenter(center);
    map.panBy(-0.5 * (bWidth - mWidth), bWidth < 768 ? -200 : 0);
  }
}
