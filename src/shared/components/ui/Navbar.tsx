import {
  Button,
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
      className={"bg-background py-3"}
    >
      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Title className={"text-3xl"}>Megastore</Title>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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

      <NavbarContent className="sm:hidden" justify="end">
        <div className={"pr-2"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
          </svg>
        </div>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="end" className={"hidden lg:flex"}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
          </svg>
        </div>

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
