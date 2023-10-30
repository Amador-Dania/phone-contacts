"use client";

import React, { useState } from "react";
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
  const { loading } = useGetContacts();

  const contacts = useContacts();
  const savedNotification = useSavedNotification();
  const deletedNotification = useDeletedNotification();

  const [selectedContact, setSelectedContact] =
    useState<ContactsDataInterface | null>(null);
  const [showAddContactPanel, setShowAddContactPanel] = useState(false);
  const [showSearchContactPanel, setShowSearchContactPanel] = useState(false);
  const [searchContactQuery, setSearchContactQuery] = useState("");
  const [hasTyped, setHasTyped] = useState(false);

  const handleSelectedContact = (filter: ContactsDataInterface) => {
    setSelectedContact(filter);
  };

  const filteredContact = contacts.filter((contact: ContactsDataInterface) =>
    contact.name.toLowerCase().startsWith(searchContactQuery.toLowerCase())
  );

  let filter;
  if (hasTyped) {
    if (filteredContact.length > 0) {
      filter = filteredContact;
    } else {
      filter = null;
    }
  } else {
    filter = contacts;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles["contacts-container"]}>
          <div className={styles["button-container"]}>
            <button
              className={
                !showSearchContactPanel
                  ? styles["iphone-button-add"]
                  : styles["iphone-button-search-disabled"]
              }
              disabled={showSearchContactPanel}
              onClick={() => setShowAddContactPanel(!showAddContactPanel)}
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
              onClick={() => setShowSearchContactPanel(!showSearchContactPanel)}
            >
              Search
            </button>
          </div>
          {showAddContactPanel && (
            <div className={styles["add-contact-container"]}>
              <AddContact />
            </div>
          )}
          {showSearchContactPanel && (
            <div className={styles["search-container"]}>
              <SearchContact
                searchContactQuery={searchContactQuery}
                setSearchContactQuery={setSearchContactQuery}
                setHasTyped={setHasTyped}
              />
            </div>
          )}

          <h1>Contacts:</h1>
          {loading ? (
            <div className={styles["loading-message"]}>...loading</div>
          ) : (
            <ul className={styles["contact-list"]}>
              {filter?.map((contact) => (
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
