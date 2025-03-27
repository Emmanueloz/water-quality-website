import Link from "next/link";

type DashboardProps = {
  user: UserProfile;
};

const Dashboard = ({ user }: DashboardProps) => {
  const modules = user.modules as string[];

  return (
    <div className="p-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {modules.map((module) => (
        <div
          key={module}
          className="bg-white border-2 border-black rounded-md p-3 shadow-md hover:shadow-lg  flex items-center justify-center h-[45px] w-[190px] mx-auto"
        >
          <Link
            href={`/${module}`}
            className="text-xs sm:text-sm font-semibold text-gray-800 text-center w-full"
          >
            {module === "games"
              ? "Juegos"
              : module.charAt(0).toUpperCase() + module.slice(1)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
