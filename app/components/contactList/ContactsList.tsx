"use client";

import React, { useContext, useState } from "react";
import useGetContacts, {
  ContactsDataInterface,
} from "../../contacts-api/useGetContacts";
import ContactDetails from "../contactDetails/ContactDetails";
import styles from "./ContactList.module.css";
import { IdContactsContext } from "@/app/ContactsContext";
import { v4 as uuidv4 } from "uuid";
import AddContact from "../addContact/AddContact";

interface ContactsListProps {}

export function ContactsList({}: ContactsListProps) {
  const [selectedContact, setSelectedContact] =
    useState<ContactsDataInterface | null>(null);

  const [showAddContactPanel, setshowAddContactPanel] = useState(false);

  const { loading } = useGetContacts();
  const contacts = useContext(IdContactsContext);

  const handleSelectedContact = (contact: ContactsDataInterface) => {
    const seletected = setSelectedContact(contact);
    console.log(seletected);
  };

  function handleAddContact(text: {
    name: string;
    phone: string;
    email: string;
  }) {
    contacts.push({
      id: uuidv4(),
      name: text.name,
      email: text.email,
      phone: text.phone,
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles["contacts-container"]}>
          <div className={styles["button-container"]}>
            <button
              className={styles["iphone-button-add"]}
              onClick={() => setshowAddContactPanel(!showAddContactPanel)}
            >
              Add Contact
            </button>
            <button
              className={styles["iphone-button-search"]}
              disabled={showAddContactPanel}
            >
              Search
            </button>
          </div>
          {showAddContactPanel && (
            <div className={styles["add-contact-container"]}>
              <h2>Add Contact:</h2>
              <AddContact onAddContact={handleAddContact} />
            </div>
          )}
          <h1>Contacts:</h1>
          {loading ? (
            <div className={styles["loading-message"]}>...loading</div>
          ) : (
            <ul className={styles["contact-list"]}>
              {contacts.map((contact) => (
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
