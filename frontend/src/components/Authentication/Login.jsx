import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const userData = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userData);
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  //navigator
  const navigate = useNavigate();
  //Toest
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast({
        title: "please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:5000/api/user/login", user, config)
        .then((result) => {
          console.log(result.data);
          if (result.data.status === "Success") {
            toast({
              title: "login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            navigate("/chats");
          } else {
            toast({
              title: "Error Occured!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
        });
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Email
          </label>
          <input
            onChange={handleChnage}
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Password
          </label>
          <input
            onChange={handleChnage}
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="mt-2">
          <input
            className="bg-[#14c871] text-stone-50 mt-4 py-2 px-4 rounded-lg uppercase text-1xl font-semibold cursor-pointer"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </>
  );
}

export default Login;
