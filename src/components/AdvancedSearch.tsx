"use client";

import { searchMateria } from "@/app/materias/actions";
import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { SearchAttributes } from "@/domain/models/SearchMateria";
import { MateriaSearchValidator } from "@/utils/materiaSearchValidator";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";

export default function AdvancedSearch() {
  const { userProfile } = useContext(AuthContext);
  const { getListSearchMaterias } = useContext(MateriaContext);

  const [searchAttribute, setSearchAttribute] = useState<SearchAttributes>(
    SearchAttributes.all
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [listMaterias, setListMaterias] = useState<IMateria[]>([]);

  const formValidate = () => {
    const validator = new MateriaSearchValidator({
      searchAttribute: searchAttribute,
      searchValue: searchValue,
    });

    setErrorForm(validator.getError());

    return validator.validate();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    await getListSearchMaterias({
      searchAttribute: searchAttribute,
      searchValue: searchInput,
      id_usuario: userProfile?.id,
    });
  };

  useEffect(() => {
    const fetchMaterias = async () => {
      if (searchAttribute === SearchAttributes.all) {
        setErrorForm(null);
        setSearchValue("");

        await getListSearchMaterias({
          searchAttribute: searchAttribute,
          searchValue: "",
          id_usuario: userProfile?.id,
        });
      }
    };

    fetchMaterias(); // Llamamos a la función async
  }, [searchAttribute]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2 mb-2 h-10">
      <label htmlFor="" className="flex-1 flex items-center gap-2">
        <div className="flex items-center gap-2 w-full">
          <select
            onChange={(e) =>
              setSearchAttribute(e.target.value as SearchAttributes)
            }
            className="capitalize p-2 bg-transparent text-gray-700 focus:ring-0 focus:outline-none"
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
                max={100}
                maxLength={80}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 p-2 border-b-2 border-gray-300 focus:border-cyan-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-md hover:bg-cyan-400 hover:text-white transition"
              >
                Buscar
              </button>
            </>
          )}
        </div>
      </label>

      {errorForm && (
        <span className="text-red-500 text-sm mt-2">{errorForm}</span>
      )}
    </form>
  );
}
