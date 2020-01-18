import { ChangeEvent, useState, useRef, useCallback, useEffect } from 'react';
import _debounce from 'lodash.debounce';

const loadApiErr =
  '> 💡use-places-autocomplete: Google Maps Places API library must be loaded. See: TODO: README URL';

interface Args {
  requestOptions?: {
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    componentRestrictions?: google.maps.places.ComponentRestrictions;
    location?: google.maps.LatLng;
    offset?: number;
    radius?: number;
    sessionToken?: google.maps.places.AutocompleteSessionToken;
    types?: string[];
  };
  debounce?: number;
  googleMaps?: any;
  callbackName?: string;
}
interface Return {
  readonly ready: boolean;
  readonly value: string;
  readonly suggestions: {
    readonly status: string;
    readonly data: object[];
  };
  readonly setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly clearSuggestions: () => void;
}

const usePlacesAutocomplete = ({
  requestOptions,
  debounce = 200,
  googleMaps,
  callbackName
}: Args = {}): Return => {
  const [ready, setReady] = useState(false);
  const [value, setVal] = useState('');
  const [suggestions, setSuggestions] = useState({ status: '', data: [] });
  const asRef = useRef(null);

  const init = useCallback(() => {
    const { google } = window;
    const placesLib =
      (googleMaps && googleMaps.places) ||
      (google && google.maps && google.maps.places);

    if (!placesLib) {
      console.error(loadApiErr);
      return;
    }

    asRef.current = new placesLib.AutocompleteService();
    setReady(true);
  }, [googleMaps]);

  const clearSuggestions = useCallback(() => {
    setSuggestions({ status: '', data: [] });
  }, []);

  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const val = e.target.value;

      _debounce(() => {
        if (!val.length) {
          clearSuggestions();
          return;
        }

        asRef.current.getPlacePredictions(
          { ...requestOptions, input: val },
          (data: object[] | null, status: string) => {
            setSuggestions({ status, data: data || [] });
          }
        );
      }, debounce)();

      setVal(val);
    },
    [requestOptions, debounce] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const { google } = window;

    if (!googleMaps && !(google && google.maps) && callbackName) {
      (window as any)[callbackName] = init;
    } else {
      init();
    }

    return (): void => {
      if ((window as any)[callbackName]) delete (window as any)[callbackName];
    };
  }, [googleMaps, callbackName]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ready, value, suggestions, setValue, clearSuggestions };
};

export default usePlacesAutocomplete;
