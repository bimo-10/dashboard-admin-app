import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center gap-4">
      <SignUp
        forceRedirectUrl="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-900",
          },
        }}
      />
    </div>
  );
}
