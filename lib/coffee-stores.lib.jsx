
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (query, latlong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
}

const getCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({ 
    query: "coffee shop",
    page: 1,
    perPage: 30,
    orientation: "landscape",
  })
  const unsplashResults = photos.response.results;
  return unsplashResults.map(
    (result) => result.urls['regular']
  );
}

export const fetchCoffeeStores = async (latlong = "42.3227801,-72.6417523", limit = 9) => {
const photos = await getCoffeeStorePhotos();
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

const response = await fetch(
  getUrlForCoffeeStores(
    "coffee",
    latlong,
    limit
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