import { useState } from "react";
import EditUser from "../EditUser";
import AddProduct from "../ListProduct/AddProduct";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();

  return (
    <nav className="dark:bg-gray-50 shadow-sm">
      <div className="relative flex items-center justify-end mr-8 h-16">
        <AddProduct navbar={true} edit={false}></AddProduct>
        <EditUser edit={false} />

        {user.profile_url ? (
          <img
            onClick={() => setOpen(open ? false : true)}
            className="w-10 h-10 cursor-pointer hover:bg-gray-400 ml-10 bg-gray-300 object-cover rounded-full"
            src={user.profile_url}
            alt="Profile Avatar"
          ></img>
        ) : (
          <div
            onClick={() => setOpen(open ? false : true)}
            className="w-10 h-10 cursor-pointer hover:bg-gray-400 ml-10 bg-gray-300 object-cover rounded-full"
          ></div>
        )}

        <div className="relative">
          <div
            className={
              open
                ? "absolute right-0 w-full  md:max-w-screen-sm md:w-screen mt-6 origin-top-right"
                : "absolute right-0 w-full md:max-w-screen-sm md:w-screen mt-6 origin-top-right hidden"
            }
          >
            <div className="px-2 pt-2 pb-4 bg-gray-100 rounded-md shadow-lg dark-mode:bg-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  className="flex row items-start rounded-lg bg-transparent p-2 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  <div className="bg-purple-200 text-white items-center rounded-lg p-3">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="26"
                      width="26"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0)">
                        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.692 3.692 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.15 5.15 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.023 6.023 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.845 5.845 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.098 3.098 0 0 0-.292-.382 2.692 2.692 0 0 0-.372-.343 1.842 1.842 0 0 0-.432-.24 1.201 1.201 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.115.115 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.501.501 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <path d="M0 0h24v24H0V0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Documentation</p>
                  </div>
                </a>
                <a
                  className="flex cursor-pointer row items-start rounded-lg bg-transparent p-2 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
                  onClick={() => handleLogout()}
                >
                  <div className="bg-red-200 text-white rounded-lg p-3">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="md:h-6 md:w-6 h-4 w-4"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Sign out</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
