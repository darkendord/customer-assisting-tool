import { useEffect, useState } from "react";
import { auth } from "../firebase/config.ts"; // Adjust path to your Firebase config
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCustomerData } from "../features/customers/customerSlice";
import { clearReportsData } from "../features/reports/reportSlice";
import { clearProductData } from "../features/products/productSlice.ts";
import { clearCommentsData } from "../features/comments/commentSlice.ts.ts";


// Interface for user status
interface UserStatus {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
}

// React Hook to get user status
export const useAuthStatus = (): UserStatus => {
    const [userStatus, setUserStatus] = useState<UserStatus>({
        isLoggedIn: false,
        user: null,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserStatus({
                isLoggedIn: !!user,
                user,
                loading: false,
            });
        });

        return () => unsubscribe();
    }, []);

    return userStatus;
};


export const useLogout = (): { handleLogout: () => Promise<void>; isLoading: boolean } => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate("/"); // Navigate after successful logout
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            dispatch(clearCustomerData());
    dispatch(clearProductData());
    dispatch(clearReportsData());
    dispatch(clearCommentsData());
            setIsLoading(false);
        }
    };

    return { handleLogout, isLoading };
};