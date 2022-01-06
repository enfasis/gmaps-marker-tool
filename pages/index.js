import { MapContext } from "@react-google-maps/api";
import { useCallback, useState } from "react";

import Head from "@Components/Head";
import Map from "@Components/Map";
import { StopsForm } from "@Forms/Stops";

function Home() {
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="h-screen w-screen absolute inset-0 ">
        <Map onLoadMap={onLoad} />
      </div>
      <MapContext.Provider value={map}>
        <div className="flex flex-grow flex-col md:flex-row self-start md:p-6">
          <div className="relative max-w-full md:max-w-sm">
            <StopsForm />
          </div>
          <div id="mapView" className="m-2 h-96 md:h-auto md:m-6 flex-grow" />
        </div>
      </MapContext.Provider>
      <Head title="Inicio" />
    </div>
  );
}

export default Home;
