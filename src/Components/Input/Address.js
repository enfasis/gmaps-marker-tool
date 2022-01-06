import { debounce } from "lodash";
import { createRef, useCallback, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { IoLocation } from "react-icons/io5";

import Input from "@Components/Input";
import Marker from "@Components/Marker";
import { geocode } from "@Utilities/geocode";
import { useGoogleMap } from "@Utilities/useGoogleMap";

const Address = ({
  control,
  name,
  label,
  rules,
  placeholder = "Escriba la dirección",
}) => {
  const inputRef = createRef();
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name,
    rules,
    onFocus: () => {
      inputRef.current?.focus();
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [debouncedAddress, setDebouncedAddress] = useState(null);
  const debounceCallBack = useCallback(debounce(setDebouncedAddress, 500), []);

  useEffect(() => {
    if (debouncedAddress && debouncedAddress.length > 10) {
      setLoading(true);
      geocode({ address: debouncedAddress + " Lima, Peru" })
        .then((r) => {
          if (r) {
            onChange({ user: inputRef?.current?.value, ...r });
            setError("");
          } else setError("No encontrado");
        })
        .finally(() => setLoading(false));
    }
  }, [debouncedAddress]);

  const gMap = useGoogleMap();

  useEffect(() => {
    gMap &&
      google.maps.event.addListener(gMap, "click", function (ev) {
        const location = {
          lat: ev.latLng.lat(),
          lng: ev.latLng.lng(),
        };
        setLoading(true);
        geocode({ location })
          .then((r) => {
            if (r) {
              onChange({ user: inputRef?.current?.value, ...r });
              setError("");
            } else setError("No Encontrado");
          })
          .finally(() => setLoading(false));
      });
    return () => {
      gMap && google.maps.event.clearListeners(gMap, "click");
    };
  }, [gMap]);

  const info = value?.user ? value?.user : value?.api;

  const containerClass = loading ? "animate-pulse" : "";

  return (
    <div>
      <Input
        containerClass={containerClass}
        Icon={IoLocation}
        label={label}
        placeholder={placeholder}
        onChange={(ev) => {
          debounceCallBack(ev.target.value);
          setError("");
        }}
        onBlur={onBlur}
        error={error}
        ref={inputRef}
      />
      {gMap && value?.location && (
        <Marker location={value.location} info={info} />
      )}
    </div>
  );
};

export default Address;
