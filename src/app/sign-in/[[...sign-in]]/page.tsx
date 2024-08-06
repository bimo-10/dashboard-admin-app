import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center py-24">
      <SignIn
        forceRedirectUrl="/admin"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-900",
          },
        }}
      />
    </div>
  );
}
