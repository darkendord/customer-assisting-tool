import { useAuthStatus } from "../hooks/useAuthStatus.ts";

function Products() {
  const { isLoggedIn, user, loading } = useAuthStatus();
  console.log(isLoggedIn, user, loading);
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold tracking-tight text-[#3a1b10] mb-4">Products</h2>
      </div>
    </div>
  )
}

export default Products