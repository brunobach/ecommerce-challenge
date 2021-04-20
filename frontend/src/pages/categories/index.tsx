import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { useAlert } from "react-alert";
import {
  Category,
  GraphqlCategory,
  ProductsGraphql,
} from "../../@types/globals";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_PRODUCT,
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_CATEGORIES,
} from "../../querys/query.graphql";

const CategoryInitial = [
  {
    id: "",
    name: "",
    productConnection: [],
  },
];

export default function Users() {
  const alert = useAlert();
  const [categories, setCategories] = useState<Category[]>(CategoryInitial);

  const { data, refetch } = useQuery<GraphqlCategory>(GET_CATEGORIES);
  const { data: dataProducts } = useQuery<ProductsGraphql>(
    GET_PRODUCTS_CATEGORIES
  );
  const [
    createCategoryProduct,
    { data: dataCategory, error },
  ] = useMutation<any>(CREATE_CATEGORY_PRODUCT);

  const [createCategory, { data: category }] = useMutation<any>(
    CREATE_CATEGORY
  );

  const [productsList, setProductsList] = useState<any>();
  const [addProduct, setAddProduct] = useState(false);

  const [addCategory, setAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (data) {
      const { categories } = data;
      setCategories(categories);
    }
  }, [data]);

  useEffect(() => {
    if (dataProducts) {
      const { Products } = dataProducts;
      setProductsList(Products);
    }
  }, [dataProducts]);

  async function handleCreateProductCategory(
    productId: string,
    categoryId: string
  ) {
    createCategoryProduct({
      variables: {
        productId,
        categoryId,
      },
    })
      .then(() => {
        refetch();
        alert.success("Product added in category");
      })
      .catch((e) => alert.error(e.message));
  }

  async function handleCreateCategory() {
    createCategory({
      variables: {
        name: categoryName,
      },
    })
      .then(() => {
        refetch();
        alert.success(`Category ${categoryName} Added!`);
        setAddCategory(false);
        setCategoryName("");
      })
      .catch((e) => alert.error(e.message));
  }

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Ecommerce: Category</title>
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
                    Category Name
                  </th>
                  <th className="flex flex-row font-semibold text-sm uppercase px-6 py-4">
                    Products
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    Add Product
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={category.id + 2}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p
                            className={` bg-green-${
                              9 - index
                            }00 text-white b font-semibold px-2 rounded-full`}
                          >
                            {category.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row">
                        <div className="flex flex-col">
                          {category.productConnection?.length >= 1 ? (
                            category.productConnection.map((connection) => (
                              <p
                                key={connection.product.id + Math.random()}
                                className="text-gray-500 text-sm font-semibold tracking-wide"
                              >
                                {connection.product.name}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">
                              {" "}
                            </p>
                          )}
                        </div>
                        <p
                          onClick={() =>
                            setAddProduct(addProduct ? false : true)
                          }
                          className="hover:text-green-200 ml-5 cursor-pointer text-light-blue-500 mr-2"
                        >
                          <svg
                            className=""
                            width="12"
                            height="20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
                            />
                          </svg>
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {productsList?.length >= 1 ? (
                        productsList.map((prod) => (
                          <p
                            key={prod.id + 3}
                            className={
                              !addProduct
                                ? `hidden m-1 hover:bg-gray-300 cursor-pointer font-normal text-gray-500`
                                : "m-1 hover:bg-gray-300 cursor-pointer font-normal text-gray-500"
                            }
                            onClick={() =>
                              handleCreateProductCategory(prod.id, category.id)
                            }
                          >
                            {prod.name}
                          </p>
                        ))
                      ) : (
                        <p> No product list</p>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-green-200 cursor-pointer hover:bg-green-300">
                  <td className="px-6 py-4">
                    <p
                      onClick={() => setAddCategory(addCategory ? false : true)}
                      className={
                        addCategory
                          ? `hidden`
                          : "text-gray-600  text-md font-bold tracking-wide"
                      }
                    >
                      ADD CATEGORY
                    </p>

                    <div className={!addCategory ? `hidden` : "flex flex-row"}>
                      <input
                        type="text"
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-green-400  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder={"Category Name"}
                      />
                      <button
                        onClick={() => handleCreateCategory()}
                        className="bg-blue-500 ml-3 flex justify-center px-2 items-center text-white  rounded-md focus:outline-none"
                      >
                        ADD
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-lef"></td>

                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
