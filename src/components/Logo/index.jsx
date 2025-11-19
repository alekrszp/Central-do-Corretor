import { Outlet } from "react-router";
import { NavMenu } from "../index";

export const Logo = () => {
  return (
    <>
      <header className="relative bg-gradient-to-b from-[#7B61FF] to-[#A391FF] rounded-b-[14px] p-5 text-center text-white">
        <div className="absolute left-4 top-[10px] h-[69px] w-[69px]">
          <img src="/icon.png" alt="icone" className="h-full w-full object-contain" />
        </div>

        <div>
          <div className="text-[20px] font-bold">Central Do Corretor</div>
          <div className="text-[13px] opacity-85">Bem-vindo</div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
