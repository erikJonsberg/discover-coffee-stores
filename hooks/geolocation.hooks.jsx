import { useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '@/store/store.context';

const useGeolocation = () => {

    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    //const [latlong, setLatlong] = useState('');
    const [searchingForLocation, setSearchingForLocation] = useState(false);

    const { dispatch } = useContext(StoreContext);

    const success = (position) => {
        const { latitude, longitude } = position.coords;

        //setLatlong(`${latitude},${longitude}`);
        dispatch({
            type: ACTION_TYPES.SET_LATLONG,
            payload: {latlong: `${latitude},${longitude}`},
            })
        setLocationErrorMsg('');
        setSearchingForLocation(false);
    }

    const error = () => {
        setSearchingForLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    }

    const handleGeolocation = () => {
        setSearchingForLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
      //latlong,
      locationErrorMsg,
      handleGeolocation,
      searchingForLocation,
    };
}

export default useGeolocation;