import axios from "axios";

type UserDetails = {
  name: string;
  phonenumber: string;
  email: string;
};

export const getAllDbContacts = (
  setState: React.Dispatch<React.SetStateAction<any>>
): void => {
  axios
    .get("http://localhost:5000/api/contacts")
    .then(response => {
      setState(response.data);
    })
    .catch(error => console.log(error.message));
};

export const addDbContact = async (
  userDetails: UserDetails,
  setState: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  await axios
    .post("http://localhost:5000/api/contacts", { ...userDetails })
    .catch(error => console.log(error.message));

  await axios
    .get("http://localhost:5000/api/contacts")
    .then(response => {
      setState(response.data);
    })
    .catch(error => console.log(error.message));
};

export const editDbContact = async (
  id: number,
  userDetails: UserDetails,
  setState: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  await axios
    .put("http://localhost:5000/api/contacts", { ...userDetails, id })
    .catch(error => console.log(error.message));

  await axios
    .get("http://localhost:5000/api/contacts")
    .then(response => {
      setState(response.data);
    })
    .catch(error => console.log(error.message));
};

export const deleteDbContact = async (
  id: number,
  setState: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  await axios
    .delete("http://localhost:5000/api/contacts", { data: { id } })
    .catch(error => console.log(error.message));

  await axios
    .get("http://localhost:5000/api/contacts")
    .then(response => {
      setState(response.data);
    })
    .catch(error => console.log(error.message));
};
