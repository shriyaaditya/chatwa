"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUp(formData); 
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sign Up Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center flex flex-col">
          <span className="text-primary text-3xl  font-bold">Welcome To The Family</span>
            <p className="mt-6 text-2xl font-extrabold">
              Create your account
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Join us and start your journey
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-full shadow-sm space-y-4">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 placeholder-muted-foreground text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pl-10 bg-background"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 placeholder-muted-foreground text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pl-10 bg-background"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 placeholder-muted-foreground text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pl-10 bg-background"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-[13px] px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            <div className="flex justify-center text-center text-sm">Already have an account?&nbsp;<a href="/login" className="text-primary underline hover:text-primary/70 ">Login</a></div>

          </form>
        </div>
      </div>

      {/* Animated Boat Section */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 400 400"
            className="w-[80%] max-w-[500px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="text-primary/30" stopColor="currentColor">
                  <animate
                    attributeName="stop-opacity"
                    values="0.3;0.5;0.3"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" className="text-secondary/50" stopColor="currentColor">
                  <animate
                    attributeName="stop-opacity"
                    values="0.5;0.7;0.5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <filter id="waterGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Waves */}
            {[...Array(3)].map((_, i) => (
              <path
                key={i}
                d={`M0,${220 + i * 20} C 100,${200 + i * 20} 200,${240 + i * 20} 400,${220 + i * 20}`}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="8"
                filter="url(#waterGlow)"
                opacity={0.8 - i * 0.2}
              >
                <animate
                  attributeName="d"
                  values={`
                    M0,${220 + i * 20} C 100,${200 + i * 20} 200,${240 + i * 20} 400,${220 + i * 20};
                    M0,${220 + i * 20} C 100,${240 + i * 20} 200,${200 + i * 20} 400,${220 + i * 20};
                    M0,${220 + i * 20} C 100,${200 + i * 20} 200,${240 + i * 20} 400,${220 + i * 20}
                  `}
                  dur={`${4 + i}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}

            {/* Boat */}
            <g filter="url(#waterGlow)">
              <path
                d="M180,200 L220,200 L240,220 L160,220 Z"
                className="text-primary"
                fill="currentColor"
              >
                <animate
                  attributeName="transform"
                  type="translate"
                  values="0,0; 0,-5; 0,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Sail */}
              <path
                d="M200,140 L200,200 L240,200 Z"
                className="text-secondary"
                fill="currentColor"
                opacity="0.8"
              >
                <animate
                  attributeName="transform"
                  type="rotate"
                  values="-5,200,170; 5,200,170; -5,200,170"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Mast */}
              <line
                x1="200"
                y1="140"
                x2="200"
                y2="200"
                className="text-primary"
                stroke="currentColor"
                strokeWidth="3"
              />
            </g>

            {/* Stars/Sparkles */}
            {[...Array(10)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 400}
                cy={Math.random() * 200}
                r="1.5"
                className="text-primary"
                fill="currentColor"
                opacity="0.6"
                filter="url(#waterGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${2 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

