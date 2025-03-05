"use client";

import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { AuthContext } from "@/context/AuthProvider";

export default function MessageSession({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const { isCountNewSession, setIsCountNewSession } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isCountNewSession < 1) {
      setShowMessage(true);
      setIsCountNewSession((prev) => prev + 1);
    }
  }, []);

  if (!showMessage) return null;

  return <Message message={message} type={type} />;
}
