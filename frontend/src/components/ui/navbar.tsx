import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ArrowRight, LogOut } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoadingBar from "react-top-loading-bar";

interface NavBarProps {
  username: string;
}

export default function NavBar({ username }: NavBarProps) {
  const loaderRef = useRef<any>(null);

  // Function to handle logout
  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = "/login"; // Redirect after logout
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <LoadingBar color="#FFFFFF" ref={loaderRef} />
      <div className="container mx-auto flex h-16 max-w-6xl items-center px-4 md:px-6">
        <Link
          to="/"
          className="absolute xl:left-44 left-4 flex items-center gap-2"
        >
          <span className="font-large text-cyan-400">Clothes Swap</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 justify-center text-sm font-medium w-full">
          <Link
            to="/"
            className="text-cyan-400 hover:text-white relative after:bg-white after:absolute after:h-0.5 after:w-0 after:-bottom-1 after:left-0 hover:after:w-full after:transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-cyan-400 hover:text-white relative after:bg-white after:absolute after:h-0.5 after:w-0 after:-bottom-1 after:left-0 hover:after:w-full after:transition-all duration-300"
          >
            About
          </Link>
        </nav>

        <div className="absolute xl:right-44 right-4 flex items-center gap-4">
          {!username ? (
            <div className="flex gap-4">
              <Button variant="outline" className="bg-neutral-950 text-cyan-400" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="outline" className="group bg-neutral-950 text-cyan-400" asChild>
                <Link to="/register">
                  Register
                  <ArrowRight className="ml-2 z-10 group-hover:ml-3 duration-200 bg-neutral-950 text-cyan-400" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <span className="text-white font-medium">Hello, {username}</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-black"
                  >
                    <LogOut color="cyan-400" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log Out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                      Yes, log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden bg-[#2C2C2C]">
              <div className="grid gap-4 p-4">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-100 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-100 hover:text-white"
                >
                  About
                </Link>
                {!username ? (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-100 hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-100 hover:text-white"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <span className="text-sm font-medium text-gray-100">
                    Hello, {username}
                  </span>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {}

function MenuIcon(props: MenuIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
