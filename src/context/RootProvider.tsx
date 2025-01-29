import { AuthProvider } from "@/context/AuthProvider";
import { MateriaProvider } from "@/context/MateriaContext";

function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <MateriaProvider>{children}</MateriaProvider>
    </AuthProvider>
  );
}

export { RootProvider };
