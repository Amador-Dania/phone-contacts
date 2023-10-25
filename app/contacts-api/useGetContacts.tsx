import { useEffect, useState } from "react";
import axios from "axios";

export interface ContactsDataInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function useGetContacts() {
  const [contactsData, setContactsData] = useState<ContactsDataInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const contactsData = res.data;
        if (Array.isArray(contactsData)) {
          setContactsData(contactsData);
          setLoading(false);
        } else {
          setLoading(true);
          console.log('Error: "contactsData" is not an Array');
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(true);
      });
  }, []);

  return { contactsData, setContactsData, loading };
}

export default useGetContacts;
