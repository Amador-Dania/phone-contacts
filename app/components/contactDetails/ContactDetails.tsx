import React from "react";
import Image from "next/image";
import { Contacts } from "../../contacts-api/useContacts";

interface ContactDetailsProps {
  selectedContact: Contacts | null;
}

function ContactDetails({ selectedContact }: ContactDetailsProps) {
  return (
    <>
      <div className="container">
        <div className="contact-details">
          {selectedContact ? (
            <>
              <div>
                <Image
                  src="/contactIcon.jpg"
                  alt="Picture"
                  width={100}
                  height={100}
                  className="contact-image"
                />
              </div>
              <div>
                <div className="contact-name">
                  <h1>Name: {selectedContact.name}</h1>
                </div>
                <div className="contact-info">
                  <h1>Phone Number: {selectedContact.phone}</h1>
                  <h1>Email: {selectedContact.email}</h1>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1 className="select-message">
                Select a contact to see more details
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
