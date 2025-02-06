"use client";

import { searchMateria } from "@/app/materias/actions";
import { SearchAttributes } from "@/domain/models/SearchMateria";
import { MateriaSearchValidator } from "@/utils/materiaSearchValidator";
import { useState } from "react";

export default function AdvancedSearch() {
  const [searchAttribute, setSearchAttribute] = useState<SearchAttributes>(
    SearchAttributes.all
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const formValidate = () => {
    const validator = new MateriaSearchValidator({
      searchAttribute: searchAttribute,
      searchValue: searchValue,
    });

    setErrorForm(validator.getError());

    return validator.validate();

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = formValidate();

    console.log(isValid);
    

    if (!isValid) {
      return;
    }

    let searchInput: number | string = searchValue;

    if (searchAttribute === SearchAttributes.id) {
      searchInput = parseInt(searchValue);
    } else if (
      searchAttribute === SearchAttributes.name ||
      searchAttribute === SearchAttributes.teacher
    ) {
      searchInput = searchValue.trim();
    }

    searchMateria({
      searchAttribute: searchAttribute,
      searchValue: searchInput,
    });
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
