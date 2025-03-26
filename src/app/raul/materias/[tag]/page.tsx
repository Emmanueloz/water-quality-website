import Materias from "@/components/materias";

type Props = {
  params: {
    tag: string;
  };
};

export default async function MateriaPage({ params }: any) {
  const { tag } = await params;
  return <Materias tag={tag} />;
}
