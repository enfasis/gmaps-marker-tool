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

  const [debouncedAddress, setDebouncedAddress] = useState(null);
  const debounceCallBack = useCallback(debounce(setDebouncedAddress, 500), []);

  useEffect(() => {
    if (debouncedAddress && debouncedAddress.length > 10) {
      geocode({ address: debouncedAddress + " Lima, Peru" }).then((r) => {
        if (r) {
          onChange({ user: inputRef?.current?.value, ...r });
          setError("");
        } else setError("No encontrado");
      });
    }
  }, [debouncedAddress]);

  const gMap = useGoogleMap();

  return (
    <div>
      <Input
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
      {gMap && value?.location && <Marker location={value.location} />}
    </div>
  );
};

export default Address;
