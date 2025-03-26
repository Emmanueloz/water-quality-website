import Materias from "@/components/materias";

// type Props = {
//   params: { tag: any } | Promise<{ tag: any }>;
// };

export default async function MateriaPage({ params }: any) {
  const { tag } = await params;
  console.log(tag);
  return <Materias tag={tag} />;
}
