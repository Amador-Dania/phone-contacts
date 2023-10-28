import React, { useEffect, useState } from "react";
import styles from "./AddContact.module.css";
import {
  useContacts,
  useSavedNotification,
  useSetContact,
  useSetSavedNotification,
} from "@/app/ContactsContext";
import { v4 as uuidv4 } from "uuid";

interface AddContactInterface {}

export default function AddContact({}: AddContactInterface) {
  const [text, setText] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const contacts = useContacts();
  const setContacts = useSetContact();
  const savedNotification = useSavedNotification();
  const setSavedNotification = useSetSavedNotification();

  useEffect(() => {
    if (savedNotification) {
      setTimeout(() => {
        setSavedNotification(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedNotification]);

  function handleAddContact(text: {
    name: string;
    phone: string;
    email: string;
  }) {
    if ((text.name, text.phone, text.email === "")) {
      undefined;
    } else {
      setContacts([
        ...contacts,
        {
          id: uuidv4(),
          name: text.name,
          phone: text.phone,
          email: text.email,
        },
      ]);
      setSavedNotification(true);
    }
  }

  return (
    <div className={styles["iphone-input-container"]}>
      <div className={styles["contact-input-container"]}>
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Name"
          value={text.name}
          onChange={(e) => setText({ ...text, name: e.target.value })}
        />
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Phone Number"
          value={text.phone}
          onChange={(e) => setText({ ...text, phone: e.target.value })}
        />
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Email"
          value={text.email}
          onChange={(e) => setText({ ...text, email: e.target.value })}
        />
      </div>
      <button
        className={styles["iphone-button"]}
        onClick={() => {
          setText({ name: "", phone: "", email: "" });
          handleAddContact(text);
        }}
      >
        +
      </button>
    </div>
  );
}
