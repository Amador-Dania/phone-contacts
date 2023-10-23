import React, { Dispatch, SetStateAction } from "react";
import styles from "./SearchContact.module.css";

interface SearchContactProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch(): void;
}

export default function SearchContact({
  query,
  setQuery,
  handleSearch,
}: SearchContactProps) {
  return (
    <div className={styles["iphone-input-container"]}>
      <input
        type="text"
        className={styles["iphone-input"]}
        value={query}
        onChange={(e) => {
          const quer = setQuery(e.target.value);
          console.log(quer);
        }}
      />
      <button className={styles["iphone-button"]} onClick={handleSearch}>
        S
      </button>
    </div>
  );
}
