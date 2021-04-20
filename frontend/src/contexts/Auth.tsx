import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  if (
    loading ||
    (!isAuthenticated &&
      router.pathname !== "/" &&
      router.pathname !== "/signup")
  ) {
    return <Skeleton height={40} count={5} />;
  }
  return children;
};
