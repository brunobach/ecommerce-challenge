import Head from "next/head";
import { NextPage } from "next";
import { PropsItem } from "../../@types/globals";

const NavItem: NextPage<PropsItem> = ({ isActive, children }) => {
  return (
    <div>
      <Head>
        <title>Ecommerce: Products</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <li>
        <a
          className={`block px-4 py-2 rounded-md ${
            isActive === "all"
              ? "bg-green-200 text-gray-500"
              : isActive === "my"
              ? "bg-green-200 text-gray-500"
              : "bg-gray-50 text-gray-500"
          }`}
        >
          {children}
        </a>
      </li>
    </div>
  );
};

export default NavItem;
