import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ContactDetails.module.css";
import { ContactsDataInterface } from "@/app/contacts-api/useGetContacts";
import { IdContactsContext, SetContactContext } from "@/app/ContactsContext";
import Notification from "@/app/notifications/Notification";

interface ContactDetailsProps {
  selectedContact: ContactsDataInterface | null;
  setSelectedContact: React.Dispatch<
    React.SetStateAction<ContactsDataInterface | null>
  >;
}

function ContactDetails({
  selectedContact,
  setSelectedContact,
}: ContactDetailsProps) {
  const [isEditing, setisEditing] = useState(false);
  const [deletedNotification, setDeletedNotification] = useState(false);

  const setContactsData = useContext(SetContactContext);
  const contacts = useContext(IdContactsContext);

  function handleEditContact() {
    setisEditing(!isEditing);

    setContactsData(
      contacts.map((c) => {
        if (c.id === selectedContact?.id) {
          return selectedContact;
        } else {
          return c;
        }
      })
    );
  }

  const handleChange = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setSelectedContact((prevContact) => {
      if (prevContact) {
        return {
          ...prevContact,
          [property]: newValue,
        };
      }
      return null;
    });
  };

  function handleDeleteContact() {
    setContactsData((contacts) =>
      contacts.filter((c) => c.id !== selectedContact?.id)
    );

    setSelectedContact(null);
    setDeletedNotification(true);
  }

  console.log("Before", deletedNotification);

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
                      className={styles["edit-input"]}
                      value={selectedContact.name}
                      onChange={(e) => handleChange("name", e)}
                    />
                  </div>
                  <div className={styles["contact-info"]}>
                    <h1 className={styles["edit-label"]}>Phone Number:</h1>
                    <input
                      type="text"
                      className={styles["edit-input"]}
                      value={selectedContact.phone}
                      onChange={(e) => handleChange("phone", e)}
                    />
                    <h1 className={styles["edit-label"]}>Email:</h1>
                    <input
                      type="text"
                      className={styles["edit-input"]}
                      value={selectedContact.email}
                      onChange={(e) => handleChange("email", e)}
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
                or{" "}
                <button
                  className={styles["delete-button"]}
                  onClick={() => {
                    handleDeleteContact();
                  }}
                  disabled={isEditing}
                >
                  Delete
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
      <div>{deletedNotification && <Notification type="deleted" />}</div>
    </>
  );
}

export default ContactDetails;
