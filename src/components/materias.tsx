// import { IMateria } from "@/tipos/materia";

const Materias = ({ materia, tag }: { materia?: IMateria; tag: any }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 bg-slate-50 rounded-t-lg border-b">
        <div className="text-2xl font-bold text-slate-800 mb-2">
          {materia?.nombre}
        </div>
        <div className="text-slate-600">
          <span className="font-medium">Maestro: {materia?.maestro}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">
            Contenido del Curso
          </h3>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Unidades
            </h3>
            <div className="space-y-2">
              {materia?.unidades?.map((unidad) => (
                <div
                  key={unidad.id}
                  className="p-3 bg-slate-50 rounded-lg text-slate-700"
                >
                  {unidad.nombre} ({unidad.horas_totales} horas)
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materias;
