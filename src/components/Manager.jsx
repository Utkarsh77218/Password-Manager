import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.info("Text Copied!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "text" &&
      ref.current.src.includes("icons/eyecross.png")
        ? "password"
        : "text";
    ref.current.src = ref.current.src.includes("icons/eyecross.png")
      ? "icons/eye.png"
      : "icons/eyecross.png";
  };

  const savePassword = () => {
    if (form.site !== "" && form.username !== "" && form.password !== "") {
      const newPassword = { ...form, id: uuidv4() };
      const newPasswordArray = [...passwordArray, newPassword];
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      setForm({ site: "", username: "", password: "" });

      toast.success("Password Saved!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } else {
      toast.error("Please Enter All The Fields!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.find((item) => item.id === id));
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    let choice = confirm("Are you sure you want to delete this password?");
    if (choice) {
      const newPasswordArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    }

    toast.success("Deleted Successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition="Slide"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-5 md:mycontainer min-h-[84.7vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">OP</span>
          <span className="text-green-500">/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            id="input-url"
            name="site"
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            value={form.site}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              id="input-username"
              name="username"
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              value={form.username}
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full px-4 py-1"
                id="input-password"
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
                ref={passwordRef}
                type="password"
                value={form.password}
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  className="p-1"
                  src="icons/eye.png"
                  alt="eye"
                  ref={ref}
                  width={26}
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
            onClick={savePassword}
          >
            <FaPlus />
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords To Show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-12">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <FaCopy
                            className="ml-2 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          />
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <FaCopy
                            className="ml-2 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                          <FaCopy
                            className="ml-2 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          />
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <span className="flex justify-center items-center">
                          <FaEdit
                            className="mx-2 cursor-pointer"
                            onClick={() => editPassword(item.id)}
                          />
                          <FaTrash
                            className="cursor-pointer"
                            onClick={() => deletePassword(item.id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
