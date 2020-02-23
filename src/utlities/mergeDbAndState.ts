import { ContactList } from "../components/Contacts/Contacts.component";

type Item = {
  [key: string]: string | number;
};

const mergeDbAndState = (dbResponse: ContactList, state: ContactList) => {
  // Create a Map of current contacts state to preserve the order of the contact list
  // (Map object returns keys in order of insertion).
  const mapOfState = new Map(
    state.map((stateItem: Item) => [stateItem["id"], { ...stateItem }])
  );

  const mapOfDb = new Map(
    dbResponse.map((stateItem: Item) => [stateItem["id"], { ...stateItem }])
  );

  for (const dbItem of dbResponse) {
    const mapItem = mapOfState.get(dbItem["id"]);

    if (mapItem !== undefined) {
      // Overwrite mapItem with dbItem...
      mapOfState.set(dbItem["id"], { ...mapItem, ...dbItem });
    } else {
      // ... or if no mapItem exists create one from dbItem
      mapOfState.set(dbItem["id"], { ...dbItem });
    }
  }

  // If DB has less contacts than state then remove extra contacts from state.
  for (const stateItem of state) {
    const mapItem = mapOfState.get(stateItem["id"]);
    if (!mapOfDb.has(mapItem!.id)) mapOfState.delete(mapItem!.id);
  }

  return Array.from(mapOfState.values());
};

export default mergeDbAndState;
