import ProjectCard from "@/components/ProjectCard";
type PageProps = {
    params: {
        id: number
    }
}
const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    return <ProjectCard id={id} />;
}

export default Page