import { table, getFieldObjects } from '@/lib/airtable.lib';



    const createCoffeeStores = async (req, res) => {

        if (req.method === 'POST') {

        const { id, name, address, locality, vote, imgUrl } = req.body;

        try {
            if (id) {
        const findExistingRecords = await table.select({
            filterByFormula: `id="${id}"`,
          }).firstPage();

            if (findExistingRecords.length !== 0) {
                const records = getFieldObjects(findExistingRecords);
                res.json(records)
            } else {
            if (name) {
            const createRecords = await table.create([
                {
                    fields: {
                        id,
                        name,
                        address,
                        locality,
                        vote,
                        imgUrl,
                    }
                }
            ]);
            const records = getFieldObjects(createRecords);
            res.json({records})

          } else {
            res.status(400).json({ msg: 'Missing name' });
          }
        }
        } else {
            res.status(400).json({ msg: 'Missing id' });
        }
        } catch (error) {
          console.error("Error finding or creating records", error);
          res.status(500).json({ msg: "Error finding or creating records", error });
        }
    }
    }

    export default createCoffeeStores;