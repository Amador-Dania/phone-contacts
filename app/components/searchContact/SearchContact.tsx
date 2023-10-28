import React from "react";
import styles from "./SearchContact.module.css";

function SearchContact() {
  return (
    <>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Buscar..."
      />
      <button className={styles["search-button"]}>Search</button>
    </>
  );
}

export default SearchContact;
