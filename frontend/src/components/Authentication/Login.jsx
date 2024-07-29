import { useState } from "react";

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
  return (
    <>
      <form action="">
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
