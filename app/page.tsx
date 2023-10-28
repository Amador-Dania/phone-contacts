"use client";
import {
  ContactProvider,
  IdContactsContext,
  SetContactContext,
} from "./ContactsContext";
import ContactsList from "./components/contactList/ContactsList";
import useGetContacts from "./contacts-api/useGetContacts";

export default function Home() {
  return (
    <ContactProvider>
      <div className="contacts-container">
        <ContactsList />
      </div>
    </ContactProvider>
  );
}
