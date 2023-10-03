import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Header from "../components/Header";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="flex items-center justify-center  h-screen bg-cover bg-no-repeat bg-center bg-[url(https://wallpapercave.com/wp/wp2808714.jpg)]">
          <div className="bg-white font-semibold text-center rounded-3xl w-full mt-4 mb-4 sm:py-4 sm:w-1/2 border shadow-2xl px-2 py-4 sm:px-20 sm:items-center ">
            {/**<img
            class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="product designer"
  /> */}
            <h1 className=" font-bold text-xl text-amber-500">SIGN UP</h1>
            <h1 className="flex justify-center m-4 text-lg font-extrabold text-red-700">
              {" "}
              WELCOME TO SAR JEWEL !
            </h1>
            {isLoading && <Loader />}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <form onSubmit={submitHandler}>
                <input
                  className="w-full px-5 mb-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-yellow-500 text-gray-100 w-full py-4 rounded-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="ml-3">Login</span>
                </button>
                <h3 className="mt-6 text-sm text-gray-600 text-center">
                  <p className="mb-0 mr-2">
                    Don't have an account?
                    <span className="text-red-500  text-lg font-semibold">
                      <Link to="/register"> Register</Link>
                    </span>
                  </p>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
