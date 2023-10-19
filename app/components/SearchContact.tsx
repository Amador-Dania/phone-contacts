import React, { Dispatch, SetStateAction } from "react";

interface SearchContactProps {
  query: string;
  onQuery: Dispatch<SetStateAction<string>>;
}

export function SearchContact({ query, onQuery }: SearchContactProps) {
  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Search Contact</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full max-w-xs"
          value={query}
          onChange={(e) => {
            const quer = onQuery(e.target.value);
            console.log(quer);
          }}
        />
      </div>
    </div>
  );
}

export default SearchContact;
