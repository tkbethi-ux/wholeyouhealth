"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and info */}
      <div className="relative w-full md:w-1/2 bg-blue-50 flex flex-col justify-center items-center p-10 text-center">
        <div className="relative w-full h-96 md:h-full">
          <Image
            src="/images/login.jpg" // <--- put your image in /public/images
            alt="Telemedicine Illustration"
            fill
            priority
            className="object-cover object-center rounded-2xl md:rounded-none"
          />
        </div>

        {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50 to-blue-800/70 rounded-2xl md:rounded-none"></div> */}
        

        <div className="absolute z-10 px-20 text-black -mt-150">
          <h1 className="text-4xl font-bold mb-4">WholeYou Health</h1>
          <p className="text-lg text-black-100 max-w-md mb-6">
            Your trusted partner for online consultations, digital prescriptions,
            and personalized health management — anytime, anywhere.
          </p>
          <p className="text-sm text-black-200 italic">
            “Healthcare made simple, secure, and accessible.”
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            {isLogin ? "Welcome Back 👋" : "Create Your Account"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-gray-500 mt-6 text-sm">
            {isLogin ? "New to WholeYou Health?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-1 font-medium hover:underline"
            >
              {isLogin ? "Create one" : "Login"}
            </button>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Info at bottom */}
          <p className="text-sm text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
