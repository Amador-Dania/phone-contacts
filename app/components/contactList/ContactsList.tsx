"use client";

import React, { useEffect, useState } from "react";
import useGetContacts, {
  ContactsDataInterface,
} from "../../contacts-api/useGetContacts";
import ContactDetails from "../contactDetails/ContactDetails";
import styles from "./ContactList.module.css";
import {
  useContacts,
  useDeletedNotification,
  useSavedNotification,
} from "@/app/ContactsContext";
import AddContact from "../addContact/AddContact";
import Notification from "@/app/notifications/Notification";
import SearchContact from "../searchContact/SearchContact";

interface ContactsListProps {}

export function ContactsList({}: ContactsListProps) {
  const [selectedContact, setSelectedContact] =
    useState<ContactsDataInterface | null>(null);

  const [showAddContactPanel, setshowAddContactPanel] = useState(false);

  const { loading } = useGetContacts();

  const contacts = useContacts();
  const savedNotification = useSavedNotification();
  const deletedNotification = useDeletedNotification();

  const handleSelectedContact = (contact: ContactsDataInterface) => {
    setSelectedContact(contact);
  };

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
              className={
                !showAddContactPanel
                  ? styles["iphone-button-search"]
                  : styles["iphone-button-search-disabled"]
              }
              disabled={showAddContactPanel}
            >
              Search
            </button>
          </div>
          {showAddContactPanel && (
            <div className={styles["add-contact-container"]}>
              <AddContact />
            </div>
          )}
          <div className={styles["search-container"]}>
            <SearchContact />
          </div>

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
            key={selectedContact ? selectedContact.id : "no-contact"}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
          />
        </div>
      </div>
      <div>{savedNotification && <Notification type="saved" />}</div>
      <div>{deletedNotification && <Notification type="deleted" />}</div>
    </>
  );
}

export default ContactsList;
