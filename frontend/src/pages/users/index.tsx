import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import EditUser from "../../components/EditUser";
import { GraphQLUser, User } from "../../@types/globals";
import { GET_USERS, USER_INITIAL_DATA } from "../../querys/query.graphql";

export default function Users() {
  const [editUser, setUserEdit] = useState(false);
  const [users, setUsers] = useState<User[]>(USER_INITIAL_DATA);
  const { data, refetch } = useQuery<GraphQLUser>(GET_USERS);

  useEffect(() => {
    if (data) {
      const { getUsers } = data;

      setUsers(getUsers);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [editUser]);

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Ecommerce: User</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <div className="flex w-screen h-5/6">
        <Sidebar />
        <div className="w-11/12 flex mt-5  px-4">
          <div className="overflow-x-auto w-full">
            <table className="mx-auto w-full shadow-sm  whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    Name
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    Created At
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    Status
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    Role
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex w-10 h-10">
                          {user.profile_url ? (
                            <img
                              src={user.profile_url}
                              className="w-10 h-10 bg-gray-300 object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 object-cover rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="">{user.name}</p>
                          <p className="text-gray-500 text-sm font-semibold tracking-wide">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="">{user.createdAt}</p>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide">
                        only web
                      </p>
                    </td>
                    {user.confirmation_email ? (
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-800 bg-green-300 font-semibold px-2 rounded-full">
                          Active
                        </span>
                      </td>
                    ) : (
                      <td className="px-6 py-4 text-center">
                        <span className="text-white bg-red-300 font-semibold px-2 rounded-full">
                          Pending
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-center">Admin</td>
                    <td className="px-6 py-4 text-center">
                      <EditUser
                        edit={true}
                        refetchData={setUserEdit}
                        userEdit={user}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
