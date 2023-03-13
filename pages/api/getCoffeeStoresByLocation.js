import { fetchCoffeeStores } from "@/lib/coffee-stores.lib";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latlong, limit } = req.query;

    const response = await fetchCoffeeStores(latlong, limit);

    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    res.json({ message: "Oh no! Something went wrong", err });
  }
};

export default getCoffeeStoresByLocation;
