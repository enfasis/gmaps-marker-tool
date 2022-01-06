const getDistrict = (addressComponents) => {
  for (let component of addressComponents) {
    if (component.types.includes("locality")) return component.short_name;
  }

  return "";
};

const formatResult = ({
  address_components,
  formatted_address,
  geometry: { location },
}) => {
  return {
    api: formatted_address,
    district: getDistrict(address_components),
    location: {
      lat: location.lat(),
      lng: location.lng(),
    },
  };
};

var geo = null;
const geocoder = () => {
  if (!google) return null;
  else if (geo) return geo;
  else {
    geo = new google.maps.Geocoder();
    return geo;
  }
};

const geocode = async (request) => {
  return geocoder()
    ?.geocode(request)
    .then(({ results }) => {
      if (results && results.length > 0) {
        return formatResult(results[0]);
      } else return null;
    });
};

export { geocode };
