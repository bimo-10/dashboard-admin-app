import React from "react";
import { SidebarComponent } from "~/components/SidebarComponent";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SidebarComponent>{children}</SidebarComponent>
    </div>
  );
}
