import Link from "next/link";

type DashboardProps = {
    user: UserProfile;
}
const Dashboard = ({ user }: DashboardProps) => {
    const modules = user.modules as string[];

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
                <div
                    key={module}
                    className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                    <Link href={`/${module}`}>
                        <h2 className="text-lg text-center font-semibold text-gray-700">{module === "games" ? "Juegos" : module.charAt(0).toUpperCase() + module.slice(1)}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );

}

export default Dashboard;