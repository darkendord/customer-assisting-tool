import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginEmployee } from "../features/auth/authThunk";
import { fetchEmployeeByEmail } from "../features/employees/employeeThunks";

import { useAuthStatus } from "../hooks/useAuthStatus";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, employee } = useAppSelector((state) => state.auth);
  const employeeState = useAppSelector((state) => state.employee);

  const { isLoggedIn } = useAuthStatus();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLocalError(null);

    const result = await dispatch(fetchEmployeeByEmail(email));
    console.log("Fetch Employee Result:", result);

    if (fetchEmployeeByEmail.rejected.match(result)) {
      setLocalError("Employee not found or not authorized.");
      return;
    }

    try {
      const response = await dispatch(loginEmployee({ email, password })).unwrap();
      console.log("Login successful", response);
      navigate("/dashboard");
    } catch (error) {
      setLocalError("Login Failed: " + (error as string));
      console.error("Login Failed: ", error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 mx-auto">
      <div className="w-full max-w-md bg-white p-8">
        <div className="flex flex-col items-center">
          {/* Generic user icon SVG */}
          <div className="bg-[#3a1b10] rounded-full p-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c3.866 0 7 1.343 7 3v2H5v-2c0-1.657 3.134-3 7-3zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#3a1b10] mb-2">
            Sign in to CTM
          </h2>
          <p className="text-sm text-gray-500 mb-6">Enter your email and password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3a1b10]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-lg bg-[#fbf4e9] px-3 py-2 text-base text-[#3a1b10] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3a1b10] border border-gray-200"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-[#3a1b10]">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#5c3a23] hover:text-[#3a1b10]">
                  Forgot password?
                </a>
              </div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg bg-[#fbf4e9] px-3 py-2 text-base text-[#3a1b10] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3a1b10] border border-gray-200"
            />
          </div>
          {(localError || error || employeeState.error) && (
            <p className="text-sm text-red-600 text-center">
              {localError || error || employeeState.error}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-[#3a1b10] px-3 py-2 text-base font-semibold text-white shadow hover:bg-[#5c3a23] transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}