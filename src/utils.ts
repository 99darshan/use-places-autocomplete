/* eslint-disable compat/compat */

type GeoArgs = google.maps.GeocoderRequest;

type GeocodeResult = google.maps.GeocoderResult;

type GeoReturn = Promise<GeocodeResult[] | null>;

export const geocodeErr =
  "💡 use-places-autocomplete: Please provide an address when using getGeocode() with the componentRestrictions.";

export const getGeocode = (args: GeoArgs): GeoReturn => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(args, (results, status) => {
      if (status !== "OK") reject(status);
      if (!args.address && args.componentRestrictions) {
        console.error(geocodeErr);
        resolve(results);
      }
      resolve(results);
    });
  });
};

type LatLng = { lat: number; lng: number };

export const getLatLng = (result: GeocodeResult): LatLng => {
  const { lat, lng } = result.geometry.location;
  return { lat: lat(), lng: lng() };
};

export enum AddressComponent {
  STREET_NUMBER = "street_number",
  ROUTE = "route",
  NEIGHBORHOOD = "neighborhood",
  LOCALITY = "locality",
  ADMINISTRATIVE_AREA_LEVEL_1 = "administrative_area_level_1",
  ADMINISTRATIVE_AREA_LEVEL_2 = "administrative_area_level_2",
  POSTAL_CODE = "postal_code",
  COUNTRY = "country",
}

export const getAddressComponent = (
  result: GeocodeResult,
  addressComponent: AddressComponent,
  useShortName: false
): string | undefined => {
  const foundAddressComponent = result.address_components.find(({ types }) =>
    types.includes(addressComponent)
  );

  if (!foundAddressComponent) return undefined;

  return useShortName
    ? foundAddressComponent.short_name
    : foundAddressComponent.long_name;
};

type ZipCode = string | undefined;

export const getZipCode = (
  result: GeocodeResult,
  useShortName: false
): ZipCode =>
  getAddressComponent(result, AddressComponent.POSTAL_CODE, useShortName);

type GetDetailsArgs = google.maps.places.PlaceDetailsRequest;

type DetailsResult = Promise<google.maps.places.PlaceResult | null>;

export const getDetailsErr =
  "💡 use-places-autocomplete: Please provide a place Id when using getDetails() either as a string or as part of an Autocomplete Prediction.";

export const getDetails = (args: GetDetailsArgs): DetailsResult => {
  const PlacesService = new window.google.maps.places.PlacesService(
    document.createElement("div")
  );

  if (!args.placeId) {
    console.error(getDetailsErr);
    return Promise.reject(getDetailsErr);
  }

  return new Promise((resolve, reject) => {
    PlacesService.getDetails(args, (results, status) => {
      if (status !== "OK") reject(status);
      resolve(results);
    });
  });
};
