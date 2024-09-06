"use client";

import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui";
import './navbar.css';

const Navbar: FC = () => {
  const menuItems = [
    { label: 'Home', urlPath: '/' },
    { label: 'Cities', urlPath: '/cities' },
    { label: 'Users', urlPath: '/users' },
  ];

  return (
    <div className="backgroundNavBar">
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
    </div>
  );
};

export default Navbar;
