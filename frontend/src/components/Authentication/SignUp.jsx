import { useState } from "react";

function SignUp() {
  const userData = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    pic: "",
  };
  const [user, setUser] = useState(userData);
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleFile = (e) => {
    setUser({ ...user, pic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Name
          </label>
          <input
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onChange={handleChnage}
            required
          />
        </div>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Email
          </label>
          <input
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChnage}
            required
          />
        </div>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Password
          </label>
          <input
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChnage}
            required
          />
        </div>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Confirm Password
          </label>
          <input
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300"
            type="password"
            name="confirmpassword"
            placeholder="Enter confirm password"
            onChange={handleChnage}
            required
          />
        </div>
        <div className="mt-2">
          <label className="text-stone-400" htmlFor="">
            Picture
          </label>
          <input
            className="mt-2 w-full bg-stone-900 border border-stone-800 p-2 rounded-md outline-none text-stone-300 block  text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-stone-400
      hover:file:bg-violet-100"
            type="file"
            name="file"
            onChange={handleFile}
            required
          />
        </div>
        <div className="mt-2">
          <input
            className="bg-[#14c871] text-stone-50 mt-4 py-2 px-4 rounded-lg uppercase text-1xl font-semibold cursor-pointer"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
