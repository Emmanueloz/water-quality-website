"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathParts =
    pathname.split("/").filter(Boolean).length > 0
      ? pathname.split("/").filter(Boolean)
      : ["Inicio"];

  console.log(pathParts);

  return (
    <nav className="bg-gray-100 py-3">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {pathParts.map((pathname, index) => (
            <li key={index}>
              <Link
                href={`/${pathParts.slice(0, index + 1).join("/")}`}
                className="text-cyan-700 hover:underline"
              >
                {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
              </Link>
              {index < pathParts.length - 1 && " / "}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
