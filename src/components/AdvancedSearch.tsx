"use client";

import { SearchAttributes } from "@/domain/models/SearchMateria";
import { useState } from "react";

export default function AdvancedSearch() {
  const [searchAttribute, setSearchAttribute] = useState<SearchAttributes>(
    SearchAttributes.all
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      searchAttribute === SearchAttributes.id &&
      (isNaN(parseInt(searchValue)) || parseInt(searchValue) < 0)
    ) {
      setErrorForm("El valor debe ser un número positivo");
      return;
    } else if (
      searchAttribute === SearchAttributes.name &&
      searchValue.length === 0
    ) {
      setErrorForm("El valor no puede estar vacío");
      return;
    } else if (
      searchAttribute === SearchAttributes.teacher &&
      searchValue.length === 0
    ) {
      setErrorForm("El valor no puede estar vacío");
      return;
    } else {
      setErrorForm(null);
    }

    console.log(searchAttribute, searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        <div>
          <select
            onChange={(e) =>
              setSearchAttribute(e.target.value as SearchAttributes)
            }
            className="capitalize"
            name="filter"
            id="filter"
          >
            {Object.values(SearchAttributes).map((value, index) => (
              <option key={index} value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>
          {searchAttribute !== SearchAttributes.all && (
            <>
              <input
                type={
                  searchAttribute === SearchAttributes.id ? "number" : "text"
                }
                name="value"
                id="value"
                placeholder="Valor"
                value={searchValue}
                min={1}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit">Buscar</button>
            </>
          )}
        </div>
        {errorForm && <span className="text-red-500 text-sm">{errorForm}</span>}
      </label>
    </form>
  );
}
