import React, { useContext, useState } from "react";
import styles from "./AddContact.module.css";
import { IdContactsContext, SetContactContext } from "@/app/ContactsContext";
import { v4 as uuidv4 } from "uuid";

export default function AddContact() {
  const [text, setText] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const contacts = useContext(IdContactsContext);
  const setContact = useContext(SetContactContext);

  function handleAddContact(text: {
    name: string;
    phone: string;
    email: string;
  }) {
    setContact([
      ...contacts,
      {
        id: uuidv4(),
        name: text.name,
        phone: text.phone,
        email: text.email,
      },
    ]);
  }

  return (
    <div className={styles["iphone-input-container"]}>
      <div className={styles["contact-input-container"]}>
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Name"
          value={text.name}
          onChange={(e) =>
            setText({
              ...text,
              name: e.target.value,
            })
          }
        />
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Phone Number"
          value={text.phone}
          onChange={(e) =>
            setText({
              ...text,
              phone: e.target.value,
            })
          }
        />
        <input
          className={styles["contact-input"]}
          type="text"
          placeholder="Email"
          value={text.email}
          onChange={(e) =>
            setText({
              ...text,
              email: e.target.value,
            })
          }
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
