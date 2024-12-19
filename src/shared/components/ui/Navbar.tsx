import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Alert,
  Button,
  Divider,
  Image,
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
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { useQueryClient } from "@tanstack/react-query";
import { AVAILABLE_CATEGORIES } from "@/features/categories/constants.ts";
import { SearchInput } from "@shared/components/ui/SearchInput.tsx";
import { useCallback, useEffect, useRef } from "react";
import { Title } from "@shared/components/typography/Title.tsx";
import { useCartStore } from "@/features/cart/hooks/useCartStore.ts";

const menuItems = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: `/categories/${AVAILABLE_CATEGORIES.TSHIRTS.toLowerCase()}`,
    label: "T-Shirts",
  },
  {
    path: `/categories/${AVAILABLE_CATEGORIES.OUTERWEAR.toLowerCase()}`,
    label: "Outerwear",
  },
  {
    path: `/categories/${AVAILABLE_CATEGORIES.PANTS.toLowerCase()}`,
    label: "Pants",
  },
  {
    path: "/categories/all",
    label: "All",
  },
];

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const pathnameRef = useRef(pathname);
  const [searchParams] = useSearchParams();
  const resetCart = useCartStore((state) => state.resetCart);

  function handleLogout() {
    logout();
    queryClient.clear();
    resetCart();
  }

  const onSearchInput = useCallback(
    (value: string) => {
      if (value === "" && !pathnameRef.current.includes("/search")) return;
      navigateRef.current(`/search/?name=${value}`);
    },
    [navigateRef],
  );

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  return (
    <NextNavbar
      disableAnimation
      isBlurred
      maxWidth={"full"}
      className={"border-1 border-r-0 border-t-0 border-b-default/50 bg-background py-3"}
      height={70}
    >
      <NavbarContent className="pr-3 xl:hidden" justify="center">
        <NavbarBrand>
          <Link href={"/"}>
            <Image src={"/logo.png"} width={50} height={50} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 xl:flex" justify="center">
        <NavbarBrand>
          <Link
            href={"/"}
            className={"flex gap-4 text-inherit"}
            style={{
              fontSize: "inherit",
            }}
          >
            <Image src={"/logo.png"} width={70} className={"h-full object-cover"} />
            <Title className={"hidden 2xl:flex"}>Megastore</Title>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent style={{ flex: 0 }} className={"hidden gap-4 xl:flex"}>
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

      <NavbarContent justify={"center"} className={"hidden w-full max-w-sm items-center md:flex"}>
        <SearchInput
          defaultValue={searchParams.get("name") || undefined}
          onChange={onSearchInput}
        />
      </NavbarContent>

      {/* Content for mobile */}
      <NavbarContent className="xl:hidden" justify="end">
        <RoleBasedVisibility allowedRoles={[Role.USER]}>
          <Link href={"/user/checkout"}>
            <ShoppingCart />
          </Link>
        </RoleBasedVisibility>

        <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
          <Link href={"/admin/products"}>
            <LayoutIcon className={"size-7"} />
          </Link>
        </RoleBasedVisibility>

        <RoleBasedVisibility allowedRoles={[Role.USER]}>
          <Link href={"/user/orders"}>
            <LayoutIcon className={"size-7"} />
          </Link>
        </RoleBasedVisibility>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Content for desktop */}
      <NavbarContent
        justify="end"
        className={"hidden xl:flex"}
        style={{
          flex: 0,
        }}
      >
        <RenderIf condition={!isAuthenticated}>
          <Link href={"/checkout"}>
            <div className={"relative"}>
              <ShoppingCart />
            </div>
          </Link>
        </RenderIf>

        <RoleBasedVisibility allowedRoles={[Role.USER]}>
          <Link href={"/checkout"}>
            <div className={"relative"}>
              <ShoppingCart />
            </div>
          </Link>
        </RoleBasedVisibility>

        <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
          <Alert
            title={"Logged in as admin"}
            classNames={{
              mainWrapper: "w-[130px]",
            }}
          />
        </RoleBasedVisibility>

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
            <Link href={"/auth/signin"} color={"secondary"} size={"lg"}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/auth/signup" variant="flat" size={"lg"}>
              Sign up
            </Button>
          </NavbarItem>
        </RenderIf>

        <RenderIf condition={isAuthenticated}>
          <NavbarItem>
            <Button onPress={handleLogout} color="secondary" variant="flat" size={"lg"}>
              Logout
            </Button>
          </NavbarItem>
        </RenderIf>
      </NavbarContent>

      <NavbarMenu className={"justify-between bg-white py-8"}>
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
          <NavbarMenuItem className={"mt-4 md:hidden"}>
            <SearchInput
              onChange={onSearchInput}
              defaultValue={searchParams.get("name") || undefined}
            />
          </NavbarMenuItem>
        </div>

        <div className={"flex flex-col gap-2"}>
          <RoleBasedVisibility allowedRoles={[Role.ADMIN]}>
            <Alert
              title={"Logged as admin"}
              classNames={{
                mainWrapper: "w-[120px]",
              }}
            />
          </RoleBasedVisibility>

          <RenderIf condition={isAuthenticated}>
            <NavbarMenuItem>
              <Button onPress={handleLogout} color="secondary" variant="flat" className={"w-full"}>
                Logout
              </Button>
            </NavbarMenuItem>
          </RenderIf>
        </div>

        <RenderIf condition={!isAuthenticated}>
          <div className={"flex flex-col gap-2"}>
            <NavbarMenuItem>
              <Button
                href={"/auth/signin"}
                variant={"light"}
                as={Link}
                className={"w-full text-center"}
              >
                Login
              </Button>
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
