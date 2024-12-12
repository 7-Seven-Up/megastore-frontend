import { useLocation } from "react-router-dom";
import {
  Button,
  Divider,
  Link,
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import RenderIf from "@/shared/components/RenderIf.tsx";
import { LayoutIcon } from "@/shared/components/icons/LayoutIcon.tsx";
import { Role } from "@/features/users/enums/role.enum.ts";
import { RoleBasedVisibility } from "@/shared/components/ui/RoleBasedVisibility.tsx";
import { ShoppingCart } from "@/features/cart/components/ShoppingCart.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  {
    path: "/",
    label: "Home",
  },
];

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout();
    queryClient.clear();
  }

  return (
    <NextNavbar
      disableAnimation
      isBlurred
      maxWidth={"full"}
      className={"border-1 border-r-0 border-t-0 border-b-default/50 bg-background py-3"}
    >
      <NavbarContent className="pr-3 lg:hidden" justify="center">
        <NavbarBrand>
          <Title className={"text-3xl"}>
            <Link
              href={"/"}
              className={"text-inherit"}
              style={{
                fontSize: "inherit",
              }}
            >
              Megastore
            </Link>
          </Title>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarBrand className={"pr-4"}>
          <Title>
            <Link
              href={"/"}
              className={"text-inherit"}
              style={{
                fontSize: "inherit",
              }}
            >
              Megastore
            </Link>
          </Title>
        </NavbarBrand>
        {menuItems.map(({ path, label }) => {
          return (
            <NavbarItem isActive={pathname === path} key={path}>
              <Link href={path} color={"foreground"} className={"text-lg"}>
                {label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Content for mobile */}
      <NavbarContent className="lg:hidden" justify="end">
        <Link href={"/checkout"}>
          <ShoppingCart />
        </Link>
        <Link href={"/admin/products"}>
          <LayoutIcon className={"size-7"} />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Content for desktop */}
      <NavbarContent justify="end" className={"hidden lg:flex"}>
        <Link href={"/checkout"}>
          <div className={"relative"}>
            <ShoppingCart />
          </div>
        </Link>
        <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
          <Link href={"/admin/products"}>
            <LayoutIcon />
          </Link>
        </RoleBasedVisibility>

        <RoleBasedVisibility allowedRoles={[Role.USER]}>
          <Link href={"/user/orders"}>
            <LayoutIcon />
          </Link>
        </RoleBasedVisibility>

        <Divider orientation={"vertical"} />

        <RenderIf condition={!isAuthenticated}>
          <NavbarItem>
            <Link href={"/auth/signin"} color={"secondary"}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/auth/signup" variant="flat">
              Sign up
            </Button>
          </NavbarItem>
        </RenderIf>

        <RenderIf condition={isAuthenticated}>
          <NavbarItem>
            <Button onClick={handleLogout} color="secondary" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </RenderIf>
      </NavbarContent>

      <NavbarMenu className={"justify-between py-8"}>
        <div className={"flex flex-col gap-2"}>
          {menuItems.map(({ path, label }) => {
            return (
              <NavbarMenuItem key={label} isActive={pathname === path}>
                <Link href={path} color={"foreground"}>
                  {label}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </div>

        <div className={"flex flex-col gap-2"}>
          <RenderIf condition={isAuthenticated}>
            <NavbarMenuItem>
              <Button onClick={handleLogout} color="secondary" variant="flat" className={"w-full"}>
                Logout
              </Button>
            </NavbarMenuItem>
          </RenderIf>
        </div>

        <RenderIf condition={!isAuthenticated}>
          <div className={"flex flex-col gap-2"}>
            <NavbarMenuItem>
              <Link href={"/auth/signin"}>Login</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                as={Link}
                className={"w-full"}
                color="secondary"
                href="/auth/signup"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarMenuItem>
          </div>
        </RenderIf>
      </NavbarMenu>
    </NextNavbar>
  );
}
