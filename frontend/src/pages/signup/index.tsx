import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { CreateUserType } from "../../@types/globals";
import { REGISTER_USER } from "../../querys/query.graphql";
import Head from "next/head";

export default function Signup() {
  const [createUser, { data }] = useMutation<CreateUserType>(REGISTER_USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/", undefined, { shallow: true });
    } else if (data?.errors.length >= 1) {
      alert.error("Error creating user");
    }
  }, [data]);

  async function handleCreateUser(e: React.MouseEvent) {
    e.preventDefault();
    createUser({
      variables: {
        name,
        email,
        password,
      },
    }).catch((e) => alert.error(e.message));
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Ecommerce: Sign up</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-7xl font-bold text-gray-700 dark:text-gray-200">
              Sign up
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign up to create your account
            </p>
          </div>
          <div className="m-7">
            <form>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  onClick={handleCreateUser}
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Create Account
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Have an account?{" "}
                <a
                  onClick={() => router.push("/", undefined, { shallow: true })}
                  className="text-indigo-400 cursor-pointer focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
