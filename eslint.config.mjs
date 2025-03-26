import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Desactivar reglas de React hooks, si así lo deseas
      "react-hooks/exhaustive-deps": "off",
      // Desactivar la regla para el uso de <a> en lugar de <Link>
      "@next/next/no-html-link-for-pages": "off",
      // Desactivar la sugerencia de preferir const
      "prefer-const": "off",
      // Desactivar reglas de TypeScript sobre el uso de any
      "@typescript-eslint/no-explicit-any": "off",
      // Desactivar reglas que advierten sobre variables no utilizadas
      "@typescript-eslint/no-unused-vars": "off",
      // Desactivar regla de Next.js que prohíbe asignar a module
      "@next/next/no-assign-module-variable": "off"
    },
  },
];

export default eslintConfig;
