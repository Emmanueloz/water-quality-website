"use client";
import { getNameMateria } from "@/app/materias/actions";
import { getNameProject } from "@/app/proyectos/actions";
import { getNameGame } from "@/app/games/actions";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface IPathName {
  path: string;
  name: string | number | undefined;
  module: string | undefined;
}

const getDisplayNameByModule = async (
  module: string,
  idItem: number,
  idUser: number
) => {
  switch (module) {
    case "materias":
      return await getNameMateria(idItem, idUser);
    case "proyectos":
      return await getNameProject(idItem, idUser);
    case "games":
      return await getNameGame(idItem, idUser);
    default:
      return idItem.toString();
  }
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const [itemPath, setItemPath] = useState<IPathName[]>([]);

  const moduleList = ["materias", "proyectos", "games"];
  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (!userProfile) return;

    const fetchPathNames = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      let lastModule: string | undefined;

      const newItemsPath = await Promise.all(
        pathParts.map(async (item) => {
          const name = isNaN(parseInt(item))
            ? getDisplayName(item)
            : parseInt(item);

          lastModule =
            moduleList.find((module) => module === item) ?? lastModule;

          if (typeof name === "number") {

            let newName = await getDisplayNameByModule(lastModule ?? "", name, userProfile.id) ?? "Error 404";

            newName = textCapitalized(newName);

            return {
              path: item,
              name: newName,
              module: lastModule,
            };
          }

          return { path: item, name, module: lastModule };
        })
      );

      setItemPath(newItemsPath);
    };

    fetchPathNames();
  }, [pathname, userProfile]);

  const getDisplayName = (pathName: string) => {
    return textCapitalized(pathName);
  };

  const textCapitalized = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <nav className="bg-gray-100 py-3">
      <div className="container mx-auto">
        <ol className="flex items-center pl-2 space-x-2 text-sm">
          <Link href="/" className="text-cyan-700 hover:underline">
            Inicio
          </Link>
          <span>/</span>
          {itemPath.map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.path}`}
                className="text-cyan-700 hover:underline"
              >
                {item.name}
              </Link>
              {index < itemPath.length - 1 && " / "}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
