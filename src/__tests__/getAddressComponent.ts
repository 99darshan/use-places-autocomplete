import { AddressComponent, getAddressComponent } from "../utils";

const streetNumber = {
  long_name: "123 3453",
  short_name: "123",
  types: ["street_number"],
};

const route = {
  long_name: "Zorn Avenue",
  short_name: "Zorn Ave",
  types: ["route"],
};

const neighborhood = {
  long_name: "Brownsboro Zorn Neighborhood",
  short_name: "Brownsboro Zorn",
  types: ["neighborhood", "political"],
};

const locality = {
  long_name: "Louisville Locality",
  short_name: "Louisville",
  types: ["locality", "political"],
};

const administrativeAreaLevel2 = {
  long_name: "Jefferson County Long Name",
  short_name: "Jefferson County",
  types: ["administrative_area_level_2", "political"],
};

const administrativeAreaLevel1 = {
  long_name: "Kentucky",
  short_name: "KY",
  types: ["administrative_area_level_1", "political"],
};

const country = {
  long_name: "United States",
  short_name: "US",
  types: ["country", "political"],
};

const postalCode = {
  long_name: "40206 12334",
  short_name: "40206",
  types: ["postal_code"],
};

const addressComponents = {
  address_components: [
    streetNumber,
    route,
    neighborhood,
    locality,
    administrativeAreaLevel1,
    administrativeAreaLevel2,
    country,
    postalCode,
  ],
};

describe("getAddressComponent", () => {
  it("should handle success without result correctly", () => {
    expect(
      getAddressComponent(
        // @ts-ignore
        { address_components: [] },
        AddressComponent.STREET_NUMBER,
        false
      )
    ).toBeUndefined();
  });

  it("should handle success with long name correctly", () => {
    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.STREET_NUMBER,
        false
      )
    ).toEqual(streetNumber.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ROUTE,
        false
      )
    ).toEqual(route.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.NEIGHBORHOOD,
        false
      )
    ).toEqual(neighborhood.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.LOCALITY,
        false
      )
    ).toEqual(locality.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ADMINISTRATIVE_AREA_LEVEL_1,
        false
      )
    ).toEqual(administrativeAreaLevel1.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ADMINISTRATIVE_AREA_LEVEL_2,
        false
      )
    ).toEqual(administrativeAreaLevel2.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.COUNTRY,
        false
      )
    ).toEqual(country.long_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.POSTAL_CODE,
        false
      )
    ).toEqual(postalCode.long_name);
  });

  it("should handle success with short name correctly", () => {
    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.STREET_NUMBER,
        true
      )
    ).toEqual(streetNumber.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ROUTE,
        true
      )
    ).toEqual(route.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.NEIGHBORHOOD,
        true
      )
    ).toEqual(neighborhood.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.LOCALITY,
        true
      )
    ).toEqual(locality.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ADMINISTRATIVE_AREA_LEVEL_1,
        true
      )
    ).toEqual(administrativeAreaLevel1.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.ADMINISTRATIVE_AREA_LEVEL_2,
        true
      )
    ).toEqual(administrativeAreaLevel2.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.COUNTRY,
        true
      )
    ).toEqual(country.short_name);

    expect(
      getAddressComponent(
        // @ts-ignore
        addressComponents,
        AddressComponent.POSTAL_CODE,
        true
      )
    ).toEqual(postalCode.short_name);
  });
});
