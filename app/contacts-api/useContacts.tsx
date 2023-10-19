import { useEffect, useState } from "react";
import axios from "axios";

export interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const contacts = res.data;
        if (Array.isArray(contacts)) {
          setContacts(contacts);
          setLoading(false);
        } else {
          setLoading(true);
          console.log('Error: "contacts" is not an Array');
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(true);
      });
  }, []);

  return { contacts, loading };
}

export default useContacts;
