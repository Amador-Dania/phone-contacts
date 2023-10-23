"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Contacts } from "../../contacts-api/useContacts";
import ContactDetails from "../contactDetails/ContactDetails";
import styles from "./ContactList.module.css";
import SearchContact from "../searchContact/SearchContact";

interface ContactsListProps {
  filteredContact: Contacts[];
  loading: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch(): void;
}

export function ContactsList({
  filteredContact,
  loading,
  query,
  setQuery,
  handleSearch,
}: ContactsListProps) {
  const [selectedContact, setSelectedContact] = useState<Contacts | null>(null);

  const handleSelectedContact = (contact: Contacts) => {
    const seletected = setSelectedContact(contact);
    console.log(seletected);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["contacts-container"]}>
          <div className={styles["add-contact-container"]}>
            <h2>Search Contact:</h2>
            <SearchContact
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
            />
          </div>
          <h1>Contacts:</h1>
          {loading ? (
            <div className={styles["loading-message"]}>...loading</div>
          ) : (
            <ul className={styles["contact-list"]}>
              {filteredContact.map((contact) => (
                <li key={contact.id} className={styles["contact-item"]}>
                  <button
                    className={styles["highlight-button"]}
                    onClick={() => handleSelectedContact(contact)}
                  >
                    {contact.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles["details-container"]}>
          <ContactDetails
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
          />
        </div>
      </div>
    </>
  );
}

export default ContactsList;
