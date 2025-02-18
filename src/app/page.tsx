import Carousel from "@/components/Carousel";
import Dashboard from "@/components/Dashboard";
import { getUserToken } from "@/utils/getUserToken";

export default async function Home() {
  const user = await getUserToken();
  return (
    <>
      <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
        <Carousel user={user} />
        <Dashboard user={user} />
      </main>
    </>
  );
}
