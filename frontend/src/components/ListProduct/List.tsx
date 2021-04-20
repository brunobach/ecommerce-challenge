import AddProduct from "./AddProduct";

export default function List({ children }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 divide-gray-100">
      {children}
      <article className="cursor-pointer hover:shadow-lg  rounded-lg border-dashed  border-2   mt-10 ml-10 group max-w-md p-4 flex space-x-4 hover:border-transparent">
        <AddProduct navbar={false} edit={false}></AddProduct>
      </article>
    </ul>
  );
}
