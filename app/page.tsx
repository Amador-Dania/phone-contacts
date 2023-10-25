"use client";
import { IdContactsContext, SetContactContext } from "./ContactsContext";
import ContactsList from "./components/contactList/ContactsList";
import useGetContacts from "./contacts-api/useGetContacts";

export default function Home() {
  const { contactsData, setContactsData } = useGetContacts();

  return (
    <IdContactsContext.Provider value={contactsData}>
      <SetContactContext.Provider value={setContactsData}>
        <div className="contacts-container">
          <ContactsList />
        </div>
      </SetContactContext.Provider>
    </IdContactsContext.Provider>
  );
}
