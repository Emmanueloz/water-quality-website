"use client";
import { getNameMateria } from "@/app/materias/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IPathName {
  path: string;
  name: string | number;
  module: string | undefined;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const [itemPath, setItemPath] = useState<IPathName[]>([]);
  const moduleList = ["materias", "proyectos", "games"];
  let lastModule: string | undefined;

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);

    const newItemsPath = pathParts.map((item) => {
      const name = isNaN(parseInt(item))
        ? getDisplayName(item)
        : parseInt(item);
      
      lastModule = moduleList.find((module) => module === item) ?? lastModule;

      return { path: item, name , module:lastModule};
    });

    setItemPath(newItemsPath);
    console.log(newItemsPath);
  }, [pathname]);

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
