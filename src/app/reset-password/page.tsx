"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {  resetUserPassword } from "./actions";

const schema = z
  .object({
    password: z.string().trim().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const ResetPass = () => {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<{ password?: string; confirmPassword?: string }>({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.format();
      setError({
        password: errors.password?._errors[0],
        confirmPassword: errors.confirmPassword?._errors[0],
      });
    } else {
      setError({});
      const response = await resetUserPassword(token, data.password);
      setMessage(response.message);
      setData({ password: "", confirmPassword: "" });
      if (response.success) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  };

  return (
    <div className="w-full mt-5  flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                error.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.confirmPassword && <p className="text-sm text-red-500 mt-1">{error.confirmPassword}</p>}
          </div>
            
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm font-medium text-gray-700">
                Mostrar contraseña
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
          >
            Confirmar
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPass;
