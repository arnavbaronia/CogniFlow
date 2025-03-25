import { Icon } from "@iconify/react";
import React from "react";

const Nav = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <nav className="footer items-center p-1 text-neutral-content">
        <div className="items-center grid-flow-col">
          <a
            className="btn btn-ghost text-xl font-bold tracking-wide"
            href="https://www.superkeys.app/"
            rel="noreferrer"
            target="_blank"
          >
            Cogni<span className="text-blue-500">Flow</span>
          </a>
        </div>
        <div className="grid-flow-col gap-2 md:place-self-center md:justify-self-end mr-4 font-serif">
          <a
            href="https://x.com/arnavb_0"
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              icon="akar-icons:twitter-fill"
              className="text-xl text-[#1DA1F2]"
            />
          </a>
          <a
            href="https://github.com/arnavbaronia"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="akar-icons:github-fill" className="text-lg" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;