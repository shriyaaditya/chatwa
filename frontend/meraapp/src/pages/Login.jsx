'use client'

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Cool SVG Animation */}
        <div className="hidden md:block relative">
          <svg
            className="w-full h-auto"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            
            
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 500}
                cy={Math.random() * 400}
                r={Math.random() * 2 + 1}
                fill="currentColor"
                className="text-primary-foreground"
              >
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur={`${Math.random() * 3 + 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Moon */}
            <circle cx="400" cy="100" r="60" fill="currentColor" className="text-primary-foreground">
              <animate
                attributeName="cy"
                values="100;110;100"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Moon craters */}
            <circle cx="380" cy="80" r="10" fill="currentColor" className="text-primary/30" />
            <circle cx="420" cy="120" r="15" fill="currentColor" className="text-primary/30" />
            <circle cx="390" cy="110" r="8" fill="currentColor" className="text-primary/30" />

            {/* Meteors */}
            {[...Array(3)].map((_, i) => (
              <line
                key={i}
                x1={-50 + i * 200}
                y1={-50 + i * 100}
                x2={50 + i * 200}
                y2={50 + i * 100}
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="500 400"
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                />
              </line>
            ))}
          </svg>
        </div>

        {/* Right side - Login Form */}
        <div className={`bg-card rounded-[32px] p-8 md:p-12 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-primary text-3xl font-bold">Welcome To Family</h1>
              <p className="text-muted-foreground text-sm">
                A community of over hundreds of members
                <br/>
                To share arts and ideas
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    className="appearance-none relative block w-full px-3 py-2 placeholder-muted-foreground text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm pl-10 bg-background"
                    placeholder="Username/email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="appearance-none relative block w-full px-3 py-2 placeholder-muted-foreground text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm pl-10 bg-background"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-input text-primary focus:ring-ring"
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Loading..." : "Login"}
              </button>
              <div className="flex justify-center text-center text-sm">Don't have an account? Create one!&nbsp;<a href="/signup" className="text-primary underline hover:text-primary/70 ">SignUp</a></div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

