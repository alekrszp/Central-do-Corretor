import { useState } from "react";
import { NavMenu, OverlayTitle } from "../index";

export function Navbar({ titulo, user }) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const handleNavStateClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  return (
    <>
      {isNavMenuOpen && <NavMenu closeNav={handleNavStateClick} />}

      <header
        className="
        w-full 
        px-[18px] pt-[30px] pb-[14px]
        flex flex-col gap-3
        text-white
        bg-gradient-to-b from-[#9d77ff] to-[#8a5bff]
        font-sans
        box-border
      "
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.foto ?? '/icon.png'}
              alt="avatar"
              className="w-[38px] h-[38px] rounded-full object-cover shrink-0"
            />

            <div
              className="
                text-[20px] font-bold
                whitespace-nowrap overflow-hidden text-ellipsis
                ml-[6px] leading-none
                max-[420px]:text-[18px]
              "
            >
              {user?.nome ?? "Josué Bueno"}
            </div>
          </div>

          <button
            className="
              text-[26px] 
              bg-transparent border-none text-white
              p-[6px] leading-none cursor-pointer
            "
            onClick={handleNavStateClick}
          >
            ☰
          </button>
        </div>

        {/* SEARCH */}
        <div
          className="
            w-full
            bg-white/20
            rounded-[20px]
            px-[12px] py-[9px]
            flex items-center gap-[10px]
            box-border
          "
        >
          <img
            src="/search.png"
            alt="search"
            className="
              opacity-90 shrink-0
              w-[26px] h-[26px]
              max-[420px]:w-[22px] max-[420px]:h-[22px]
            "
          />

          <input
            type="text"
            placeholder="Pesquisar Imóvel..."
            className="
              bg-transparent border-none outline-none
              text-white text-[14px]
              w-full py-[6px]
              placeholder:text-white/85
            "
          />

          <img
            src="/mic.png"
            alt="mic"
            className="
            w-6! h-6!
              opacity-90 shrink-0
            "
          />
        </div>
      </header>

      <OverlayTitle>{titulo}</OverlayTitle>
    </>
  );
}
