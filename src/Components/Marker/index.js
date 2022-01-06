import { OverlayView } from "@react-google-maps/api";
import { IoLocate } from "react-icons/io5";

const Marker = ({ secondary, location, isHover, onRightClick, info }) => {
  const markerSize = 20;
  let containerClass =
    "transform flex items-center justify-center overflow-visible cursor-pointer ";
  let markerClass = "relative h-5 w-5 rounded-full ";
  let pingClass = "absolute h-6 w-6 rounded-full animate-ping delay-75 ";

  if (isHover) {
    pingClass += "bg-pink-200 ";
    markerClass += "bg-pink-500 ";
  } else if (secondary) {
    pingClass += "bg-green-200 ";
    markerClass += "bg-green-500 ";
  } else {
    pingClass += "bg-blue-200 ";
    markerClass += "bg-blue-500 ";
  }

  if (isHover) containerClass += "z-30 scale-125 ";
  else containerClass += "z-0 ";

  return (
    <>
      {location && (
        <OverlayView
          position={location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(x, y) => ({
            x: x - markerSize * 1.5,
            y: y - markerSize * 1.5,
          })}
        >
          <div
            className={containerClass}
            onContextMenu={onRightClick}
            title={info}
          >
            <div className={pingClass} />
            <div className={markerClass} />
            <IoLocate className="absolute h-4 w-4 text-white stroke-2" />
          </div>
        </OverlayView>
      )}
    </>
  );
};

export default Marker;
