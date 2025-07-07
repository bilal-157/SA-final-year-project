// components/ClientLayout.jsx
"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Notification from "@/components/Notification";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const unauthorized = searchParams.get("unauthorized");
    if (unauthorized === "true") {
      setShowNotification(true);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("unauthorized");
      window.history.replaceState({}, "", newUrl);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {showNotification && (
        <Notification
          message="Please sign in to access that page"
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
      {children}
    </>
  );
}
