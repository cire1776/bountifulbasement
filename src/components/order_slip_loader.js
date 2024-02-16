const Airtable = require("airtable-node");

async function getAirtable() {
  return await new Airtable({
    apiKey: process.env.AIRTABLE_PAT,
  });
}

export async function fetchSlipItems(itemSetter) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-data");

  const { records } = await airtable.list({
    pageSize: 100, // optional
    maxRecords: 200, // optional
  });
  const newItems = records.reduce((accum, record) => {
    const category = record.fields.category;

    if (!(category in accum)) {
      accum[category] = [];
    }

    if (record.fields.status === "use") {
      accum[category].push({
        name: record.fields.item,
        remainder: record.fields.remainder,
      });
    }
    return accum;
  }, {});

  if (itemSetter) {
    itemSetter(newItems);
  } else {
    return newItems;
  }
}

export async function fetchEditableItems(setter) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-data");

  const { records } = await airtable.list({
    pageSize: 100,
    maxRecords: 200, // optional} // optional
  });

  const newItems = {};

  for (const item of records) {
    const { id, createdTime } = item;
    const { item: name, status, category, remainder } = item.fields;
    newItems[id] = { name, category, status, remainder, createdTime };
  }

  setter(newItems);
}

export function flattenItems(newItems) {
  const flattenedItems = [];

  for (const category in newItems) {
    flattenedItems.push(...newItems[category]);
  }

  return flattenedItems;
}

export async function fetchCategories(categoriesSetter) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-categories")
    .view("main");

  const { records: category_records } = await airtable.list({
    sort: [{ field: "sequence", direction: "asc" }],
  });

  const newCategories = category_records.map((record) => {
    return {
      category: record.fields.category,
      has_none: record.fields.has_none,
    };
  });
  categoriesSetter(newCategories);
}

export async function createItem(fields, refresher) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-data");
  const response = await airtable.create(fields);

  if (refresher) {
    refresher(response);
  }
}

export async function updateFields(id, fields, refresher) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-data");
  await airtable.update(id, fields);

  if (refresher) {
    refresher();
  }
}

export async function deleteItem(id, refresher) {
  const airtable = getAirtable()
    .base("appPJGWfywLNUoPkg")
    .table("order-slip-data");
  await airtable.delete(id);

  if (refresher) {
    refresher();
  }
}
