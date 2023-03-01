
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (query, latlong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
}

const getCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({ 
    query: "coffee shop",
    page: 1,
    perPage: 9,
    orientation: "landscape",
  })
  const unsplashResults = photos.response.results;
  return unsplashResults.map(
    (result) => result.urls['regular']
  );
}

export const fetchCoffeeStores = async () => {
const photos = await getCoffeeStorePhotos();
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.FOURSQUARE_API_KEY,
  },
};

const response = await fetch(
  getUrlForCoffeeStores(
    "coffee", 
    "42.5953781%2C-72.6032892", 
    "9"
    ),
  options
)
const data = await response.json();
return data.results.map((result, index) => {
  return {
    id: result.fsq_id,
    name: result.name,
    address: result.location.address,
    locality: result.location.locality,
    imgUrl: photos.length > 0 ? photos[index] : null,
  }
})

  //.catch((err) => console.error(err));
}