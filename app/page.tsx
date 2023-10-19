"use client";
import { useState } from "react";
import ContactsList from "./components/contactList/ContactsList";
import useContacts from "./contacts-api/useContacts";
import SearchContact from "./components/SearchContact";

export default function Home() {
  const { contacts, loading } = useContacts();
  const [query, setQuery] = useState("");

  const filteredContact = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <div className="flex justify-center ...">
        <SearchContact query={query} onQuery={setQuery} />
      </div>
      <div>
        <ContactsList contacts={filteredContact} loading={loading} />
      </div>
    </main>
  );
}
