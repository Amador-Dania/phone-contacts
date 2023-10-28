import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import useGetContacts, {
  ContactsDataInterface,
} from "./contacts-api/useGetContacts";
import { create } from "domain";

interface ContactProviderInterface {
  children: ReactNode;
}

const ContactsContext = createContext<ContactsDataInterface[]>([]);
const SetContactContext = createContext<
  Dispatch<SetStateAction<ContactsDataInterface[]>>
>(() => {});
const DeleteNotificationContext = createContext<boolean>(false);
const setDeletedNotificationContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => false);

const SavedNotificationContext = createContext<boolean>(false);
const SetSavedNotificationContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => false);

export function ContactProvider({ children }: ContactProviderInterface) {
  const { contactsData, setContactsData } = useGetContacts();
  const [deletedNotification, setDeletedNotification] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  return (
    <ContactsContext.Provider value={contactsData}>
      <SetContactContext.Provider value={setContactsData}>
        <DeleteNotificationContext.Provider value={deletedNotification}>
          <setDeletedNotificationContext.Provider
            value={setDeletedNotification}
          >
            <SavedNotificationContext.Provider value={savedNotification}>
              <SetSavedNotificationContext.Provider
                value={setSavedNotification}
              >
                {children}
              </SetSavedNotificationContext.Provider>
            </SavedNotificationContext.Provider>
          </setDeletedNotificationContext.Provider>
        </DeleteNotificationContext.Provider>
      </SetContactContext.Provider>
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}

export function useSetContact() {
  return useContext(SetContactContext);
}

export function useDeletedNotification() {
  return useContext(DeleteNotificationContext);
}

export function useSetDeletedNotification() {
  return useContext(setDeletedNotificationContext);
}

export function useSetSavedNotification() {
  return useContext(SetSavedNotificationContext);
}

export function useSavedNotification() {
  return useContext(SavedNotificationContext);
}
