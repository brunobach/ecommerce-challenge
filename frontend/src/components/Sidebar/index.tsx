import { RiBarcodeFill } from "react-icons/ri";
import { FaThumbtack, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { Routes } from "../../@types/globals";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAuth();

  function handlePushRoute(route: string): void {
    router.push(route, undefined, { shallow: true });
  }

  return (
    <div className="md:w-1/5 w-3/12 h-5/5 rounded-b  shadow-md">
      <div className=" border-b py-3 mt-1 flex justify-around ">
        <p className="text-xl font-semibold">{user.name}</p>
        <p>|</p>
        <p className="text-gray-400 text-lg">ecommerce</p>
      </div>
      <div className="space-y-14">
        <div className="mt-4">
          <h1 className="ml-4 text-gray-400">Menu</h1>
          <div
            className="mt-5"
            onClick={() => handlePushRoute(Routes.PRODUCTS)}
          >
            <div
              className={
                Routes.PRODUCTS === router.pathname
                  ? "flex p-4 items-center bg-green-100 text-gray-700  space-x-4 0 hover:text-blue-600"
                  : "flex p-4 items-center text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer"
              }
            >
              <RiBarcodeFill size={25} className="text-blue-400" />
              <p className=" ">Products</p>
            </div>
          </div>
          <div className="" onClick={() => handlePushRoute(Routes.USER)}>
            <div
              className={
                Routes.USER === router.pathname
                  ? "flex p-4 items-center bg-green-100 text-gray-700  space-x-4 0 hover:text-blue-600"
                  : "flex p-4 items-center text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer"
              }
            >
              <FaUser size={25} className=" text-blue-400" />
              <p className=" ">Users</p>
            </div>
          </div>
          <div className="" onClick={() => handlePushRoute(Routes.CATEGORY)}>
            <div
              className={
                Routes.CATEGORY === router.pathname
                  ? "flex p-4 items-center bg-green-100 text-gray-700  space-x-4 0 hover:text-blue-600"
                  : "flex p-4 items-center text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer"
              }
            >
              <FaThumbtack size={25} className=" text-blue-400" />
              <p className=" ">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
