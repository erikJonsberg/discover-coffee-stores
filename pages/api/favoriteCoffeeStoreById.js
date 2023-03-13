import { table, findRecordsByFilter, getMinifiedRecords } from "@/lib/airtable.lib";

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
    const { id } = req.body;
        if (id) {
        const records = await findRecordsByFilter(id);

        if (records.length !== 0) {

            const record = records[0];

            const calculateVote = parseInt(record.vote) + parseInt(1);

            const updateRecord = await table.update([
                {
                    id: record.recordId,
                    fields: {
                        vote: calculateVote,
                    },
                },
            ]);

            if (updateRecord) {
                const minifiedRecords = getMinifiedRecords(updateRecord);
                res.json(minifiedRecords);
            } else {
                res.json({ msg: "Vote not updated", updateRecord });
            }
        } else {
            res.json({ msg: "id does not exist", id });
        }
        } else {
        res.status(400).json({ msg: "Missing id" });
        }
    } catch (error) {
      console.error("Error finding or creating records", error);
      res.status(500).json({ msg: "Error finding or creating records", error });
    }
  }
};

export default favoriteCoffeeStoreById;
