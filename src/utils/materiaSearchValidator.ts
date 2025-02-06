import { SearchAttributes } from "@/domain/models/SearchMateria";

/*
if (
        searchAttribute === SearchAttributes.id &&
        (isNaN(parseInt(searchValue)) || parseInt(searchValue) < 0)
      ) {
        return "El valor debe ser un número positivo";
      } else if (
        searchAttribute === SearchAttributes.name &&
        searchValue.trim().length === 0
      ) {
        return "El valor no puede estar vacío";
      } else if (
        searchAttribute === SearchAttributes.teacher &&
        searchValue.trim().length === 0
      ) {
        return "El valor no puede estar vacío";
      } else {
        isValid = true;
        return null;
      }
*/
export class MateriaSearchValidator {
  private search: ISearchMateria;
  constructor(search: ISearchMateria) {
    this.search = search;
  }

  public idIsValid(): boolean {
    return (
      (this.search.searchAttribute === SearchAttributes.id &&
        !isNaN(parseInt(this.search.searchValue as string))) ||
      parseInt(this.search.searchValue as string) > 1
    );
  }

  public nameIsValid(): boolean {
    return (
      this.search.searchAttribute === SearchAttributes.name &&
      this.search.searchValue.toString().trim().length > 0
    );
  }

  public teacherIsValid(): boolean {
    return (
      this.search.searchAttribute === SearchAttributes.teacher &&
      this.search.searchValue.toString().trim().length > 0
    );
  }

  public validate(): boolean {
    return this.idIsValid() || this.nameIsValid() || this.teacherIsValid();
  }

  public getError(): string | null {
   
    if (this.search.searchAttribute === SearchAttributes.id && !this.idIsValid()) {
      return "El valor debe ser un número positivo";
    }

    if (this.search.searchAttribute === SearchAttributes.name && !this.nameIsValid()) {
      return "El valor no puede estar vacío";
    }

    if (this.search.searchAttribute === SearchAttributes.teacher && !this.teacherIsValid()) {
      return "El valor no puede estar vacío";
    }

    return null;
  }
}
