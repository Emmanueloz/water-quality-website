import { SearchAttributes } from "@/domain/models/SearchMateria";

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
