import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_PRODUCT } from "../../querys/query.graphql";
import AddProduct from "./AddProduct";
import { useAlert } from "react-alert";

export default function ListItem({ product }) {
  const [like, setLike] = useState<number>(0);
  const alert = useAlert();
  const [deleteProduct, { data }] = useMutation(DELETE_PRODUCT);

  function handleDeleteProduct(id) {
    deleteProduct({
      variables: {
        id,
      },
    }).catch(() => {
      alert.error("Product belongs to a category!");
    });
  }

  useEffect(() => {
    setLike(Math.floor(Math.random() * 10));
  }, [product]);

  return (
    <article className="cursor-pointer mt-10 ml-10 hover:bg-gray-50 hover:border-transparent hover:shadow-lg group rounded-lg  border border-gray-200 max-w-md p-4 flex space-x-4">
      {product.product_url_image.length >= 1 ? (
        <img
          src={product.product_url_image[0]}
          alt=""
          className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
          width="144"
          height="144"
        />
      ) : (
        <div
          style={{ width: "144px", height: "144px" }}
          className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
        ></div>
      )}

      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-md font-semibold text-gray-600 mb-0.5">
          {product.name}
        </h2>
        <dl>
          <div className="flex flex-wrap text-sm text-gray-900 font-light">
            <dt className="sr-only">description</dt>
            <dd> · {product.description}</dd>
          </div>

          <div className="mt-3">
            <hr></hr>
            <dt className="sr-only">price</dt>
            <h3 className="text-sm font-normal text-gray-800 mb-0.5">
              {" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </h3>
          </div>
          <div className="flex-none w-full mt-0.5 font-normal">
            <h4 className="text-xs font-normal text-gray-800 mb-0.5">
              by {product.userConnection.name}
            </h4>
          </div>
          <div className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
            {/* <dt className="text-amber-500">
            <span className="sr-only ">Rating</span>
            <svg
              onClick={() => setLike(like + 1)}
              width="20"
              height="20"
              fill="currentColor"
              className=""
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                className="text-red-300 hover:text-red-900"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </dt>
          <dd>{like}</dd> */}
            <AddProduct
              navbar={false}
              edit={true}
              productEdit={product}
            ></AddProduct>
            <p
              onClick={() => handleDeleteProduct(product.id)}
              className="hover:text-red-400"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </p>
          </div>
        </dl>
      </div>
    </article>
  );
}
