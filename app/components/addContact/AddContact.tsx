import React, { useState } from "react";
import styles from "./AddContact.module.css";

interface AddContactProps {
  onAddContact: (text: { name: string; phone: string; email: string }) => void;
}

export default function AddContact({ onAddContact }: AddContactProps) {
  const [text, setText] = useState({
    name: "",
    phone: "",
    email: "",
  });

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
          onAddContact(text);
        }}
      >
        +
      </button>
    </div>
  );
}
