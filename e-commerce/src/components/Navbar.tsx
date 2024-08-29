"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { AvatarComponent } from "./Avatar";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import React, { useEffect } from "react";
import { logout } from "@/app/login/action";

export function NavbarComponent({ visible }: { visible: boolean }) {
  return (
    <div className="fixed w-full ">
      <div className="bg-black justify-center items-center flex">
        <h5 className="text-xs text-white font-mono py-4">
          BUY 2, GET 1 FREE ON EVERYTHING! LIMITED TIME!
        </h5>
      </div>
      <Menubar className="flex p-8 justify-around font-mono bg-white text-black ">
        <MenubarMenu>
          <Link href={"product"}>
            <span className="cursor-pointer transition-all hover:text-orange-600">
              ALL PRODUCT
            </span>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={"/"}>
            <span className="cursor-pointer transition-all hover:text-orange-600 ">
              CATHARSIS EMPIRE
            </span>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={"wishlist"}>
            <span className="cursor-pointer transition-all hover:text-orange-600 ">
              WISHLIST
            </span>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer transition-all ">
            <AvatarComponent />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Wishlist</MenubarRadioItem>
              <>
                {visible && (
                  <>
                    <MenubarRadioItem onClick={() => logout()} value="andy">
                      Logout
                    </MenubarRadioItem>
                  </>
                )}
              </>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
