const Airtable = require('airtable-node');

export async function fetchSlipItems(itemSetter) {

  const airtable = await new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base('appPJGWfywLNUoPkg')
    .table('order-slip-data');

  const {records} = await airtable.list()
  const newItems = records.reduce((accum, record)=>{
    const category = record.fields.category;
    
    if (!(category in accum)) {
      accum[category]=[];
    }

    if (record.fields.status === 'use') {
      accum[category].push(record.fields.item)
    }
    return accum;

  },{})

  if (itemSetter) {
    itemSetter(newItems);
  } else {
    return newItems
  }

}

export async function fetchEditableItems(setter) {
  const airtable = await new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base('appPJGWfywLNUoPkg')
    .table('order-slip-data');

  const {records} = await airtable.list()

  const newItems = {}

  for (const item of records) {
    const {id} = item;
    const {item: name, status, category} = item.fields;
    newItems[id] = ({name, category, status})
  }

  setter(newItems);
}

export function flattenItems(newItems) {
  const flattenedItems = [];

  for (const category in newItems) {
      flattenedItems.push(...newItems[category])
  }

  return flattenedItems;
}

export async function fetchCategories(categoriesSetter) {
  const airtable = await new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
        .base('appPJGWfywLNUoPkg')
        .table('order-slip-categories');

  const {records: category_records} = await airtable.list({
    sort: [{ field: 'sequence', direction: 'asc' }],
  });

  const newCategories = category_records.map((record)=> {
    return record.fields.category;
  })
  categoriesSetter(newCategories)
}

export async function createItem(fields, refresher) {
  const airtable = await new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base('appPJGWfywLNUoPkg')
    .table('order-slip-data')
  await airtable.create(fields);

  if (refresher) {
    refresher();
  }
}

export async function updateFields(id, fields, refresher) {
  const airtable = await new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base('appPJGWfywLNUoPkg')
    .table('order-slip-data')
  await airtable.update(id, fields);
  console.log("updating", id);

  if (refresher) {
    refresher();
  }
}


export async function deleteItem(id,refresher) {
  const airtable = await new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base('appPJGWfywLNUoPkg')
    .table('order-slip-data')
  await airtable.delete(id);
  console.log("deleting: ", id);

  if (refresher) {
    refresher();
  }
}