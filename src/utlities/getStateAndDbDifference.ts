import { ContactList } from "../components/Contacts/Contacts.component";

type Item = {
  [key: string]: string | number;
};

const getStateAndDbDifference = (
  dbResponse: ContactList | [],
  state: ContactList | []
) => {
  // Get items that are in DB and not in state
  const dbUniqueObjects = dbResponse.filter(
    (dbItem: Item) =>
      !state.find((stateItem: Item) =>
        Object.keys(stateItem).every(
          property => dbItem[property] === stateItem[property]
        )
      )
  );

  // Get items that are in state and not in DB
  const stateUniqueObjects = state.filter(
    (dbItem: Item) =>
      !dbResponse.find((stateItem: Item) =>
        Object.keys(stateItem).every(
          property => dbItem[property] === stateItem[property]
        )
      )
  );

  const combinedUniqueObjects = [...dbUniqueObjects, ...stateUniqueObjects];

  // If combined unique objects are not in DB ...
  if (
    state.some(
      (dbItem: Item) =>
        !dbResponse.find((stateItem: Item) =>
          Object.keys(stateItem).every(
            property => dbItem[property] === stateItem[property]
          )
        )
    )
  ) {
    // ... then remove them from state ...
    return state.filter(
      (stateItem: Item) =>
        !combinedUniqueObjects.some(
          (uniqueObject: Item) =>
            !Object.keys(uniqueObject).some(
              property => stateItem[property] !== uniqueObject[property]
            )
        )
    );
  }

  // ... otherwise add them to state
  return [...state, ...combinedUniqueObjects];
};

export default getStateAndDbDifference;
