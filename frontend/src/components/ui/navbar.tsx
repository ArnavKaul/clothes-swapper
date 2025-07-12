import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ArrowRight, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigation } from "react-router-dom";

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

// Define the User interface directly in this file
interface User {
    id: string | null;
    username: string | null;
    user_image: string | null;
    isAuthenticated: boolean;
}

// Initial state for the user
const initialUserState: User = {
    id: null,
    username: null,
    user_image: null,
    isAuthenticated: false,
};

export default function NavBar() {
    const [user, setUser] = useState<User>(initialUserState);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    // const { state: navState } = useNavigation();
    const loaderRef = useRef<any>(null);

    // useEffect(() => {
    //     if (loaderRef.current) {
    //         if (navState === "loading") {
    //             loaderRef.current.continuousStart();
    //         } else {
    //             loaderRef.current.complete();
    //         }
    //     }
    // }, [navState]);

    // Effect to fetch authentication status from the backend on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/auth_status');
                const data = await response.json();
                console.log(data)
                if (data.isAuthenticated && data.user) {
                    setUser({
                        id: data.user._id,
                        username: data.user.username,
                        user_image: data.user.user_image,
                        isAuthenticated: true,
                    });
                } else {
                    setUser(initialUserState);
                }
            } catch (error) {
                console.error("Failed to fetch auth status:", error);
                setUser(initialUserState); // Ensure user is logged out on error
            } finally {
                setLoadingAuth(false); // Auth check complete
            }
        };

        checkAuthStatus();
    }, []); // Empty dependency array means this runs once on mount

    // Function to handle user logout
    const logout = async () => {
        try {
            const response = await fetch('/logout', { method: 'POST' }); // Assuming /logout is a POST endpoint now
            const data = await response.json();
            if (data.success) {
                setUser(initialUserState); // Reset user state on successful logout

            } else {
                console.error("Logout failed:", data.message);

            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Optionally display a generic error message
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
                    <span className="font-medium text-white">Project Name</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 justify-center text-sm font-medium w-full">
                    <Link
                        to="/"
                        className="text-gray-100 hover:text-white relative after:bg-white after:absolute after:h-0.5 after:w-0 after:-bottom-1 after:left-0 hover:after:w-full after:transition-all duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-100 hover:text-white relative after:bg-white after:absolute after:h-0.5 after:w-0 after:-bottom-1 after:left-0 hover:after:w-full after:transition-all duration-300"
                    >
                        About
                    </Link>
                </nav>
                <div className="absolute xl:right-44 right-4 flex items-center gap-4">
                    {/* Show a loading state for the Navbar if auth status is still being fetched */}
                    {loadingAuth ? (
                        <div className="text-white">Loading...</div>
                    ) : (
                        !user.isAuthenticated ? (
                            <div className="flex gap-4">
                                <Button variant="outline" asChild>
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button variant="outline" className="group" asChild>
                                    <Link to="/register">
                                        Register
                                        <ArrowRight className="ml-2 z-10 group-hover:ml-3 duration-200" />
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center gap-4">
                                {/* Display username if logged in */}
                                {user.username && (
                                    <span className="text-white font-medium">Hello, {user.username}</span>
                                )}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full hover:bg-black"
                                        >
                                            <LogOut color="white" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Log Out?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to log out?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={logout}>
                                                Yes, log out
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )
                    )}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full md:hidden"
                            >
                                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="md:hidden bg-[#2C2C2C]"
                        >
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
                                {/* Add conditional rendering for mobile menu as well */}
                                {loadingAuth ? (
                                    <span className="text-gray-100">Loading...</span>
                                ) : (
                                    !user.isAuthenticated ? (
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
                                            Hello, {user.username}
                                        </span>
                                    )
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

// Define the type for MenuIcon props, extending React.SVGProps<SVGSVGElement>
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