import GameCard from "@/components/GameCard";
type PageProps = {
    params: {
        id: number
    }
}
const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    return <GameCard id={id} />;
}

export default Page