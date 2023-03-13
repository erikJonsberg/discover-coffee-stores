import { findRecordsByFilter } from "@/lib/airtable.lib";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;
     try {
            if (id) {
        const records = await findRecordsByFilter(id);

            if (records.length !== 0) {
                res.json(records)
            } else {
            res.json({msg: `id not found`})
            }
          } else {
            res.status(400).json({ msg: 'Missing id' });
          }
     } catch (error) {
        console.error("Error finding records", error);
        res.status(500).json({ msg: "Error finding records", error });
    }
    }

    export default getCoffeeStoreById;