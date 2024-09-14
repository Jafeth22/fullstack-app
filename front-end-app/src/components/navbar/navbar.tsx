"use client";

import { FC } from "react";
import {
  ModeToggle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui";
import "./navbar.css";

const Navbar: FC = () => {
  const menuItems = [
    { label: "Home", urlPath: "/" },
    { label: "Cities", urlPath: "/cities" },
    { label: "Users", urlPath: "/users" },
  ];

  return (
    <div className="backgroundNavBar bg-gradient-to-b from-green-500 dark:from-purple-500 to-background">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink
                href={item.urlPath}
                className="NavigationMenuLink"
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
