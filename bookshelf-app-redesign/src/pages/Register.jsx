import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../configs/firebase-config";
import FormWrapper from "../components/FormWrapper";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        navigate("/login");
      })
      .catch((error) => {
        const errororCode = error.code;
        const errorMessage = error.message;
        console.log("Error occured: ", errororCode, errorMessage);
      });
  };

  return (
    <FormWrapper title="Register">
      <h1 className="mb-5 text-center text-4xl">Register</h1>
      <form className="text-sm" onSubmit={handleRegister}>
        <label
          htmlFor="username"
          className="mb-2 inline-block w-full font-bold"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email" className="mb-2 inline-block w-full font-bold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label
          htmlFor="password"
          className="mb-2 inline-block w-full font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mb-6 inline-block w-full rounded-md bg-blue-600 py-2 tracking-wide text-white transition duration-300 hover:bg-blue-800"
        >
          Register
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="inline-block text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </FormWrapper>
  );
};

export default Register;
