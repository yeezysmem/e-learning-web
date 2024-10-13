import { SidebarRoutes } from "./sidebar-routes";
import Logo from "./logo";
import { NavbarRoutes } from "@/components/navbar-routes";
import SendButton from "../(routes)/role/components/sendButton";

export const Sidebar = () => {
  return (
    <div className="overflow-auto p-4 rounded-md">
      <h1 className="text-2xl font-bold flex justify-center pt-2">SkillUP</h1>
      <div className="flex flex-col flex-grow w-full">
        <SidebarRoutes />
        {/* <NavbarRoutes /> */}
      </div>
    </div>
  );
};
