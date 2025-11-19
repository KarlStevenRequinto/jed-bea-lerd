import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

const navItemsBase = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/product-details", label: "Product Details" },
    { href: "/profile", label: "Profile" },
];

export const useNavbarViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);

    const navItems = loggedIn ? [...navItemsBase, { href: "/logout", label: "Logout" }] : [...navItemsBase, { href: "/login", label: "Login" }];

    const handleLogout = async () => {
        const result = await logoutUser(dispatch);
        if (result.success) {
            router.push("/login");
        } else {
            alert("Logout failed. Please try again.");
        }
    };

    return {
        navItems,
        handleLogout,
    };
};
