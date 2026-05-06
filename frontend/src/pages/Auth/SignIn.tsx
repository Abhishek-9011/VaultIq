import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Lock } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  //@ts-ignore
  const usernameRef = useRef<HTMLInputElement>();

  //@ts-ignore
  const passwordRef = useRef<HTMLInputElement>();

  async function signIn() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      toast.success("Welcome back!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error("Invalid credentials!");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center relative overflow-hidden px-4">

      <div className="absolute w-[500px] h-[500px] bg-pink-600/30 blur-3xl rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-3xl rounded-full bottom-[-100px] left-[-100px]" />

      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] relative z-10">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome Back
          </h1>

          <p className="text-gray-300">
            Sign in to continue
          </p>
        </div>

        <div className="space-y-5">

          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />

            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-pink-400 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />

            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-pink-400 transition-all"
            />
          </div>

          <button
            onClick={signIn}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-pink-500/30"
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-white hover:text-pink-300 transition-colors underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;