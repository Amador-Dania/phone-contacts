import { Dispatch, SetStateAction, createContext } from "react";
import { ContactsDataInterface } from "./contacts-api/useGetContacts";

export const IdContactsContext = createContext<ContactsDataInterface[]>([]);
export const SetContactContext = createContext<
  Dispatch<SetStateAction<ContactsDataInterface[]>>
>(() => {});
