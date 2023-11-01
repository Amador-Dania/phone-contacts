"use client";
import { ContactProvider } from "./ContactsContext";
import ContactsList from "./components/contactList/ContactsList";

export default function Home() {
  return (
    <ContactProvider>
      <div className="contacts-container">
        <ContactsList />
      </div>
    </ContactProvider>
  );
}
