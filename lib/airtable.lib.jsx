export const Airtable = require("airtable");
export const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

export const table = base("coffee-stores");

const getFieldObject = (record) => {
    return {
      ...record.fields,
    };
}

export const getFieldObjects = (records) => {
  return records.map((record) => getFieldObject(record));
  };