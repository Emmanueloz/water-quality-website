interface Materias {
    tag: string;
    nombre: string;
    profesor: string;
    unidades: string[];
}

const materias: Materias[] = [{
    tag: "matematicas",
    nombre: "Matemáticas para ingeniería II",
    profesor: "Ing. Abdias",
    unidades: ["I. Ecuaciones diferenciales", "II. Trnasformadas de Laplace", "III. Métodos numéricos"]},
    {tag: "BD", nombre: "Administración de bases de datos",
        profesor: "Mtro. Alejando",
        unidades: ["I. Administracion de bases de datos relacionales", "II. Administración de bases de datos no relacionales", "III. Gestion de la calidad de datos"]
    }, 
    {tag: "DW", nombre: "Desarrollo web profesional",
        profesor: "Dr. Wilber",
        unidades: ["I. Desarrollo web front-end", "II. Desarrollo web back-end", "III. Desarrollo web full-stack"]
    },
    {tag: "POT", nombre: "Planeación y organización del trabajo",
        profesor: "Mtra. Claudia",
        unidades: ["I. Planeación estrategica", "II. Organización del trabajo", "III. Analisis y evaluación"]},
    {tag: "SDA", nombre: "Seguridad en el desarrollo de aplicaciones",
        profesor: "Mtro. Andres",
        unidades: ["I. Principios de codificación segura", "II. Aplicaciones seguras"]},
    {tag: "ingles", nombre: "Inglés VII",
        profesor: "Mtra. Tanía",
        unidades: ["I. Gramática", "II. Vocabulario", "III. Escritura"]},
];

type MateriaProps = {
    tag: string;
};
const Materias: React.FC<MateriaProps> = ({tag}) => {
    const materia = materias.find(materia => materia.tag === tag);

    if (!materia) {
        return (
            <div className="p-4 text-red-500">
                Materia no encontrada
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-6 bg-slate-50 rounded-t-lg border-b">
                <div className="text-2xl font-bold text-slate-800 mb-2">
                    {materia.nombre}
                </div>
                <div className="text-slate-600">
                    <span className="font-medium">{materia.profesor}</span>
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
                    {materia.unidades.map((unidad) => (
                        <div 
                            key={unidad}
                            className="p-3 bg-slate-50 rounded-lg text-slate-700"
                        >
                            {unidad}
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