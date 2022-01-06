import { filter } from "lodash";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

import Button from "@Components/Button";
import { Address } from "@Components/Input";
import Marker from "@Components/Marker";
import { center, useGoogleMap } from "@Utilities/useGoogleMap";

const Stop = ({ data, onRightClick }) => {
  const [isHover, setIsHover] = useState(false);
  const info = data?.address?.user ? data.address.user : data.address.api;
  return (
    <>
      <div
        className="p-4 nm-flat-white-xs hover:nm-convex-white-xs rounded-xl cursor-pointer my-2 min-w-0 truncate w-sm"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onContextMenu={onRightClick}
      >
        {info}
      </div>
      <Marker
        secondary
        location={data.address.location}
        isHover={isHover}
        info={info}
        onRightClick={onRightClick}
      />
    </>
  );
};

function StopsForm({}) {
  const [stops, setStops] = useState([]);
  const { handleSubmit, control, watch } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (values) => {
    values.id = nanoid(20);
    if (values.address) setStops((prevStops) => [...prevStops, values]);
  };

  const gMap = useGoogleMap();
  const address = watch("address");

  useEffect(() => {
    if (stops?.length > 0) center(gMap, [...stops, { address }]);
  }, [gMap, stops, address]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex px-4 py-2 nm-flat-white-xs rounded-xl mt-2 mb-4">
        <Address control={control} label="Dirección" name="address" />
        <Button
          primary
          special
          type="submit"
          className="self-start mt-2 ml-2 min-w-max"
        >
          <IoAdd className="w-5 h-5 inline-block text-blue-400" />
        </Button>
      </div>
      {stops.map((s) => (
        <Stop
          key={s.id}
          data={s}
          onRightClick={(ev) => {
            ev.preventDefault();
            setStops((prevStops) => filter(prevStops, (d) => d.id != s.id));
          }}
        />
      ))}
    </form>
  );
}

export default StopsForm;
