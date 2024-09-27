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
import { useLocation } from "react-router-dom";
import { Title } from "@/shared/components/typography/Title.tsx";
import { useAuthStore } from "@auth/hooks/useAuthStore.ts";
import RenderIf from "@/shared/components/RenderIf.tsx";
import { LayoutIcon } from "@/shared/components/icons/LayoutIcon.tsx";
import { RoleBasedVisibility } from "@/shared/components/ui/RoleBasedVisibility.tsx";
import { Role } from "@/modules/user/enums/role.enum.ts";

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const { pathname } = useLocation();
  const menuItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/products",
      label: "Products",
    },
  ];

  return (
    <NextNavbar
      disableAnimation
      isBlurred
      maxWidth={"full"}
      className={
        "border-1 border-r-0 border-t-0 border-b-default/50 bg-background py-3"
      }
    >
      <NavbarContent className="pr-3 lg:hidden" justify="center">
        <NavbarBrand>
          <Title className={"text-3xl"}>Megastore</Title>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarBrand className={"pr-4"}>
          <Title>Megastore</Title>
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
        <div className={"pr-2"}></div>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Content for desktop */}
      <NavbarContent justify="end" className={"hidden lg:flex"}>
        <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
          <Link href={"/admin"}>
            <LayoutIcon />
          </Link>
          <Divider orientation={"vertical"} />
        </RoleBasedVisibility>

        <RenderIf condition={!isAuthenticated}>
          <NavbarItem>
            <Link href={"/auth/signin"} color={"secondary"}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="/auth/signup"
              variant="flat"
            >
              Sign up
            </Button>
          </NavbarItem>
        </RenderIf>

        <RenderIf condition={isAuthenticated}>
          <NavbarItem>
            <Button onClick={logout} color="secondary" variant="flat">
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
          <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
            <NavbarMenuItem isActive={pathname === "/admin"}>
              <Link href={"/admin"} color={"foreground"}>
                Admin panel
              </Link>
            </NavbarMenuItem>
          </RoleBasedVisibility>

          <RenderIf condition={isAuthenticated}>
            <NavbarMenuItem>
              <Button
                onClick={logout}
                color="secondary"
                variant="flat"
                className={"w-full"}
              >
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
