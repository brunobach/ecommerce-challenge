import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/ListProduct/Menu";
import NavItem from "../../components/ListProduct/NavItem";
import List from "../../components/ListProduct/List";
import ListItem from "../../components/ListProduct/ListItem";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ProductsGraphql } from "../../@types/globals";
import { GET_PRODUCTS, GET_PRODUCTS_BY_USER } from "../../querys/query.graphql";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [myProducts, setMyProducts] = useState<any>([]);
  const [tabActive, setTabActive] = useState<"all" | "my">("all");
  const { data } = useQuery<ProductsGraphql>(GET_PRODUCTS, {
    pollInterval: 3000,
  });
  const { data: Userdata } = useQuery<ProductsGraphql>(GET_PRODUCTS_BY_USER, {
    variables: { userId: user.id },
    pollInterval: 10000,
  });

  useEffect(() => {
    if (Userdata) {
      const { getProductsFromUser } = Userdata;

      setMyProducts(getProductsFromUser);
    }
  }, [Userdata]);

  useEffect(() => {
    if (data) {
      const { Products } = data;
      setAllProducts(Products);

      setProducts(Products);
    }
  }, [data]);

  function handleTabActive(target: string) {
    if (target === "all") {
      setTabActive("all");
      setProducts(allProducts);
    } else {
      setTabActive("my");
      setProducts(myProducts);
    }
  }

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Ecommerce: Products</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar></Navbar>
      <div className="flex w-screen h-5/6">
        <Sidebar />
        <div className="w-screen divide-y divide-gray-100">
          <Menu>
            <div
              className="cursor-pointer"
              onClick={() => handleTabActive("all")}
            >
              <NavItem isActive={tabActive === "all" ? "all" : "none"}>
                All Products
              </NavItem>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleTabActive("my")}
            >
              <NavItem isActive={tabActive === "my" ? "my" : "none"}>
                My products
              </NavItem>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setProducts(myProducts)}
            >
              <NavItem>Recent</NavItem>
            </div>
          </Menu>
          <List>
            {products ? (
              products.map((product) => (
                <ListItem key={product.id} product={product} />
              ))
            ) : (
              <h1> </h1>
            )}
          </List>
        </div>
      </div>
    </div>
  );
}
