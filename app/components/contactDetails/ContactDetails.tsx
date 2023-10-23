import React, { useState } from "react";
import Image from "next/image";
import { Contacts } from "../../contacts-api/useContacts";
import styles from "./ContactDetails.module.css";

interface ContactDetailsProps {
  selectedContact: Contacts | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contacts | null>>;
}

function ContactDetails({
  selectedContact,
  setSelectedContact,
}: ContactDetailsProps) {
  const [isEditing, setisEditing] = useState(false);

  function handleEditContact() {
    setisEditing(!isEditing);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles["contact-details"]}>
          {selectedContact ? (
            <>
              <div>
                <Image
                  src="/contactIcon.jpg"
                  alt="Picture"
                  width={100}
                  height={100}
                  className={styles["contact-image"]}
                />
              </div>
              {isEditing ? (
                <div className={styles["edit-contact-container"]}>
                  <div className={styles["contact-name"]}>
                    <h1 className={styles["edit-label"]}>Name:</h1>
                    <input
                      type="text"
                      value={selectedContact.name}
                      className={styles["edit-input"]}
                    />
                  </div>
                  <div className={styles["contact-info"]}>
                    <h1 className={styles["edit-label"]}>Phone Number:</h1>
                    <input
                      type="text"
                      value={selectedContact.phone}
                      className={styles["edit-input"]}
                    />
                    <h1 className={styles["edit-label"]}>Email:</h1>
                    <input
                      type="text"
                      value={selectedContact.email}
                      className={styles["edit-input"]}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles["contact-name"]}>
                    <h1>Name: {selectedContact.name}</h1>
                  </div>
                  <div className={styles["contact-info"]}>
                    <h1>Phone Number: {selectedContact.phone}</h1>
                    <h1>Email: {selectedContact.email}</h1>
                  </div>
                </div>
              )}
              <div>
                <button
                  className={styles["edit-button"]}
                  onClick={handleEditContact}
                >
                  {!isEditing ? "Edit contact" : "Save Changes"}
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 className={styles["select-message"]}>
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
