import GameCard from "@/components/GameCard";
import { isHavePermissionInToken } from "@/utils/getUserToken";
import { notFound } from "next/navigation";
type PageProps = {
  params: {
    id: number;
  };
};
const Page = async ({ params }: any) => {
  const { id } = await params;

  const isHavePermission = await isHavePermissionInToken(2, "read");

  if (!isHavePermission) {
    notFound();
  }
  return <GameCard id={id} />;
};

export default Page;
