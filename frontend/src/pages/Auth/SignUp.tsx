import { useRef } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Lock } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  //@ts-ignore
  const usernameRef = useRef<HTMLInputElement>();

  //@ts-ignore
  const passwordRef = useRef<HTMLInputElement>();

  async function signUp() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`,
        {
          username,
          password,
        }
      );

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      toast.error("Signup failed!");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center relative overflow-hidden px-4">
      
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] relative z-10">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Create Account
          </h1>

          <p className="text-gray-300">
            Start your journey with us
          </p>
        </div>

        <div className="space-y-5">

          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />

            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-purple-400 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />

            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-purple-400 transition-all"
            />
          </div>

          <button
            onClick={signUp}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            Create Account
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-white hover:text-purple-300 transition-colors underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;