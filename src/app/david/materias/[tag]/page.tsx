import Materias from "@/components/materias";

type Props = {
  params: {
    tag: string;
  };
};

export default async function MateriaPage({ params }: Props) {
  const { tag } = params;
  return <Materias tag={tag} />;
}
