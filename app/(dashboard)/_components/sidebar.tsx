import { SidebarRoutes } from "./sidebar-routes";
import Logo from "./logo";
import { NavbarRoutes } from "@/components/navbar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex-col overflow-auto bg-primary shadow-sm">
      <Logo />
      <div className="flex flex-col w-full bg-primary">
        <SidebarRoutes />
        <NavbarRoutes />
      </div>
    </div>
  );
};
