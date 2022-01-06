import { flatMap, maxBy, minBy } from "lodash";

const LIMA_LOCATION = {
  lat: -12.04318,
  lng: -77.02824,
};

const getBounds = (data) => {
  const items = flatMap(data, (s) => s.address.location);
  if (!items || items.length === 0) return null;
  return {
    nlat: maxBy(items, (i) => i.lat).lat,
    slat: minBy(items, (i) => i.lat).lat,
    elng: maxBy(items, (i) => i.lng).lng,
    wlng: minBy(items, (i) => i.lng).lng,
  };
};

const computeCenter = (bounds) => {
  if (bounds) {
    return {
      lat: (bounds.nlat + bounds.slat) / 2,
      lng: (bounds.elng + bounds.wlng) / 2,
    };
  } else return LIMA_LOCATION;
};

const getBoundsZoomLevel = (bounds, mapDim) => {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 21;

  function latRad(lat) {
    var sin = Math.sin((lat * Math.PI) / 180);
    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const latFraction = (latRad(bounds.nlat) - latRad(bounds.slat)) / Math.PI;
  const lngDiff = bounds.elng - bounds.wlng;

  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;
  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

const computeZoom = (bounds, size) => {
  if (bounds && size) {
    return getBoundsZoomLevel(bounds, size);
  } else return 11;
};

const getZoomCenter = (data, container) => {
  const bounds = getBounds(data);
  const center = computeCenter(bounds);
  const zoom = computeZoom(bounds, container);
  return { zoom: zoom > 17 ? 17 : zoom, center };
};

export { getZoomCenter, LIMA_LOCATION };
