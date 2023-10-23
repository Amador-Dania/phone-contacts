import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import useGetContacts, { Contacts } from "./contacts-api/useContacts";

type Action =
  | { type: "added"; id: string; name: string; email: string; phone: string }
  | { type: "changed"; contact: Contacts }
  | { type: "deleted"; id: string };

export const ContactsContext = createContext<Contacts[] | null>(null);
export const ContactsDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

export function ContactsProvider({ children }: { children: ReactNode }) {
  let { contactsData } = useGetContacts();
  const inicialContacts = contactsData;

  const [contacts, dispatch] = useReducer(contactsReducer, inicialContacts);

  return (
    <ContactsContext.Provider value={contacts}>
      <ContactsDispatchContext.Provider value={dispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}

export function useContactsDispatch() {
  return useContext(ContactsDispatchContext);
}

function contactsReducer(contacts: Contacts[], action: Action) {
  switch (action.type) {
    case "added": {
      return [
        ...contacts,
        {
          id: action.id,
          name: action.name,
          email: action.email,
          phone: action.phone,
        },
      ];
    }
    case "changed": {
      return contacts.map((contact) => {
        if (contact.id === action.contact.id) {
          return action.contact;
        } else {
          return contact;
        }
      });
    }
    case "deleted": {
      return contacts.filter((contact) => contact.id !== action.id);
    }
    default: {
      throw Error("Unknown action", action.type);
    }
  }
}
