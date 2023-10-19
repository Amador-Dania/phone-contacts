"use client";

import React, { Fragment, useState } from "react";
import { Contacts, useContacts } from "../../contacts-api/useContacts";
import Image from "next/image";
import ContactDetails from "../contactDetails/ContactDetails";

interface ContactsListProps {
  contacts: Contacts[];
  loading: boolean;
}

export function ContactsList({ contacts, loading }: ContactsListProps) {
  const [selectedContact, setSelectedContact] = useState<Contacts | null>(null);

  const handleSelectedContact = (contact: Contacts) => {
    const seletected = setSelectedContact(contact);
    console.log(seletected);
  };

  return (
    <>
      <div className="container mx-auto px-4 grid grid-flow-col justify-stretch">
        <div className="contacts-container">
          <h1>Contacts:</h1>
          {loading ? (
            <div className="loading-message">...loading</div>
          ) : (
            <ul className="contact-list">
              {contacts.map((contact) => (
                <li key={contact.id} className="contact-item">
                  <button
                    className="highlight-button"
                    onClick={() => handleSelectedContact(contact)}
                  >
                    {contact.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="details-container">
          <ContactDetails selectedContact={selectedContact} />
        </div>
      </div>
    </>
  );
}

export default ContactsList;
