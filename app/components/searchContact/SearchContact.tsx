import React, { useState } from "react";
import styles from "./SearchContact.module.css";
import { useContacts } from "@/app/ContactsContext";

interface SearchContactInterface {
  searchContactQuery: string;
  setSearchContactQuery: React.Dispatch<React.SetStateAction<string>>;
  setHasTyped: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchContact({
  searchContactQuery,
  setSearchContactQuery,
  setHasTyped,
}: SearchContactInterface) {
  return (
    <>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="type a name..."
        value={searchContactQuery}
        onChange={(e) => {
          setHasTyped(true);
          setSearchContactQuery(e.target.value);
        }}
      />
    </>
  );
}

export default SearchContact;
