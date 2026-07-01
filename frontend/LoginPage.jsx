
function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* Left Side - Chess Image */}
      <div
        className="w-1/2 hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.magnific.com/free-vector/chess-king-abstract-low-poly-design-strategy-concept-from-dot-line-vector-illustration_24126552.htm#fromView=keyword&page=1&position=8&uuid=b0e91d3b-f896-4df1-a8f9-7c4b090b8270&query=Chess+king')",
        }}
      >
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-900 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">

          <h2 className="text-3xl font-bold text-center mb-2">
            Login
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Welcome back , Tactician
          </p>

          <form>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="text-right mb-5">
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition duration-300"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-5">
            <p className="text-gray-600">
              Don't have an account?
            </p>

            <button className="mt-2 text-blue-600 font-semibold hover:underline">
              Create New Account
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;