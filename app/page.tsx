"use client";
import { useEffect, useState } from "react";
import ContactsList from "./components/contactList/ContactsList";
import useContacts, { Contacts } from "./contacts-api/useContacts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [filteredContact, setFilteredContact] = useState<Contacts[]>([]);

  useEffect(() => {
    setFilteredContact(contacts);
  }, [contacts]);

  function handleSearch() {
    const filteredContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredContact(filteredContact);
  }

  return (
    <main>
      <div className="contacts-container">
        <ContactsList
          filteredContact={filteredContact}
          loading={loading}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>
    </main>
  );
}
