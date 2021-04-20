import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { NextPage } from "next";
import Popup from "reactjs-popup";
import { FcBusinesswoman } from "react-icons/fc";
import { useAlert } from "react-alert";
import { setHeaderToken, api } from "../../services/api";
import { AxiosRequest, PropsPopup } from "../../@types/globals";
import { CREATE_USER, UPDATE_USER } from "../../querys/query.graphql";

const overlayStyle = {
  backdropFilter: "blur(1px)",
  transition: "backdropFilter 2s",
};

const EditUser: NextPage<PropsPopup> = ({ userEdit, edit, refetchData }) => {
  const [createuser, { data }] = useMutation(CREATE_USER);
  const [updateUser, { data: UserUpadted }] = useMutation(UPDATE_USER);
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [userLogged, setUserLogged] = useState("");
  const [images, setImages] = useState("");
  const alert = useAlert();

  useEffect(() => {
    const userIdentifcation = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userIdentifcation) {
      const { id } = JSON.parse(String(userIdentifcation));
      setHeaderToken(token);
      setUserLogged(id);
    }
  }, []);

  function HandleOnImageChange(event) {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImages(event.target.files[0]);
    }
  }

  async function handleUploadImage(): Promise<AxiosRequest> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new FormData();
        data.append("image", images);
        await api
          .post("/upload", data)
          .then((result) => {
            resolve(result);
          })
          .catch(console.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function handleUpdateUser(userFormEdit) {
    let result: AxiosRequest;
    if (images) {
      result = await handleUploadImage();
    }

    updateUser({
      variables: {
        id: userFormEdit.id,
        name: name !== undefined ? name : userFormEdit.name,
        email: email !== undefined ? email : userFormEdit.email,
        password: password !== undefined ? password : null,
        profile_url: result ? result.data[0] : null,
      },
    })
      .then(() => {
        window.location.reload();
        alert.success(`User ${name} successfully updated`);
      })
      .catch((e) => alert.error(e.message));
  }

  return (
    <Popup
      className="bg-gray-500 flex flex-col justify-center rounded-3xl"
      trigger={
        edit ? (
          <a className="w-full cursor-pointer">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:text-yellow-800"
            >
              <path
                fillRule="evenodd"
                d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        ) : (
          <button className="bg-green-500 ml-4 hover:bg-green-400 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
            <svg
              className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
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
            New user
          </button>
        )
      }
      modal
      nested
      {...{ overlayStyle }}
    >
      {(close: any) => (
        <div className="bg-gray-600 rounded-b-xl rounded-t-lg">
          <button
            className="bg-red-500 text-gray-100 object-right absolute -right-0 -top-2 z-50  w-6 rounded-xl"
            onClick={close}
          >
            &times;
          </button>
          <>
            <div className="relative pt-3 sm:max-w-xl sm:mx-auto">
              <div className="relative px-4 py-6 bg-gray-50 mx-8 md:mx-0 rounded-b-lg sm:p-10">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center space-x-5">
                    <div className="h-14 w-14 bg-gray-800 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                      <FcBusinesswoman size={300}></FcBusinesswoman>
                    </div>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                      <h2 className="leading-relaxed">
                        {edit ? `Update ${userEdit.name}` : "Create an user"}
                      </h2>
                      <p className="text-sm text-gray-500 font-normal leading-relaxed">
                        In this popup you can create a new user, or edit an
                        already created one.
                      </p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="flex flex-col">
                        <label className="leading-loose">Name</label>
                        <input
                          type="text"
                          required
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-green-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder={edit ? `${userEdit.name}` : "Elon Musk"}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Email</label>
                        <input
                          type="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-green-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder={
                            edit ? `${userEdit.email}` : "email@company.com"
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Password</label>
                        <input
                          type="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-green-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="*********"
                        />
                      </div>
                      <div className="flex items-center space-x-10 "></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Profile photo
                        </label>
                        <div
                          className={
                            images
                              ? "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-green-500 border-dashed rounded-md"
                              : "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                          }
                        >
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-10 w-10 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  accept="image/*"
                                  name="file-upload"
                                  type="file"
                                  onChange={(e) => HandleOnImageChange(e)}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">
                      <button
                        onClick={() => close()}
                        className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          close();
                          handleUpdateUser(userEdit);
                        }}
                        className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                      >
                        {edit ? "Update" : "Create"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </Popup>
  );
};

export default EditUser;
