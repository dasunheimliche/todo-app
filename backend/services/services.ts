import { Model } from "mongoose";

export async function addItem(model: any, item: any) {
  const newItem = new model(item);
  const savedItem = await newItem.save();

  return savedItem;
}

export async function updateItem(model: any, id: string, newItem: any) {
  const itemToUpdate = await model.findById(id);

  Object.keys(newItem).forEach((key) => {
    if (key !== "id") {
      itemToUpdate[key] = newItem[key];
    }
  });

  const updatedItem = await itemToUpdate.save();

  return updatedItem;
}

export async function deleteItem(model: any, id: string) {
  const deletedItem = await model.findByIdAndDelete(id);

  return deletedItem;
}

export async function getAll(model: any) {
  const allItems = await model.find({});
  return allItems;
}

export async function getOne(model: any, id: string) {
  const item = await model.findOne(id);
}
