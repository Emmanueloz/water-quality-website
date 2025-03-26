import ProjectCard from "@/components/ProjectCard";
import { isHavePermissionInToken } from "@/utils/getUserToken";
import { notFound } from "next/navigation";
type PageProps = {
  params: {
    id: number;
  };
};
const Page = async ({ params }: any) => {
  const { id } = await params;

  const isHavePermission = await isHavePermissionInToken(3, "read");

  if (!isHavePermission) {
    notFound();
  }

  return <ProjectCard id={id} />;
};

export default Page;
