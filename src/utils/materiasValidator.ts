import { IMateria } from "@/tipos/materia";
import { IUnidades } from "@/tipos/unidades";

class MateriaValidator {
  private materia: IMateria;
  constructor(materia: IMateria) {
    this.materia = materia;
  }

  public nameIsEmpty(): boolean {
    return !this.materia.nombre;
  }

  public nameIsShort(): boolean {
    return this.materia.nombre.length < 5;
  }

  public nameIsLong(): boolean {
    return this.materia.nombre.length > 80;
  }

  public teacherIsEmpty(): boolean {
    return !this.materia.maestro;
  }

  public teacherIsShort(): boolean {
    return this.materia.maestro.length < 5;
  }

  public teacherIsLong(): boolean {
    return this.materia.maestro.length > 80;
  }

  public unitsAreValid(): boolean {
    return (
      !!this.materia.unidades &&
      this.materia.unidades.some(
        (u) =>
          this.unitNameIsEmpty(u) ||
          this.unitHoursValid(u) ||
          this.unitNameIsShort(u) ||
          this.unitNameIsLong(u)
      )
    );
  }

  private unitNameIsEmpty(unit: IUnidades): boolean {
    return !unit.nombre;
  }
  private unitHoursValid(unit: IUnidades) {
    return unit.horas_totales < 1;
  }

  private unitNameIsShort(unit: IUnidades): boolean {
    return unit.nombre.length < 5;
  }

  private unitNameIsLong(unit: IUnidades): boolean {
    return unit.nombre.length > 80;
  }

  public validate(): boolean {
    return (
      this.nameIsEmpty() ||
      this.nameIsShort() ||
      this.nameIsLong() ||
      this.teacherIsEmpty() ||
      this.teacherIsShort() ||
      this.teacherIsLong() ||
      this.unitsAreValid()
    );
  }

  public getNameError(): string {
    return this.nameIsEmpty()
      ? "El nombre es requerido"
      : this.nameIsShort()
      ? "El nombre es muy corto"
      : this.nameIsLong()
      ? "El nombre es muy largo"
      : "";
  }

  public getTeacherError(): string {
    return this.teacherIsEmpty()
      ? "El maestro es requerido"
      : this.teacherIsShort()
      ? "El maestro es muy corto"
      : this.teacherIsLong()
      ? "El maestro es muy largo"
      : "";
  }

  public getUnitsError(): string[] {
    return this.materia.unidades
      ? this.materia.unidades.map((u) => {
          let msg = "";
          if (this.unitNameIsEmpty(u)) {
            msg += "El nombre de la unidad es requerido";
          } else if (this.unitNameIsShort(u)) {
            msg += "El nombre de la unidad es muy corto";
          } else if (this.unitNameIsLong(u)) {
            msg += "EL nombre de la unidad es muy largo";
          }

          if (this.unitHoursValid(u)) {
            msg += "La unidad debe ser mas de una hora";
          }

          return msg;
        })
      : ["Las unidades son requeridas"];
  }
}

export { MateriaValidator };
