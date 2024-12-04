function ForgotPassword() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
          <h1 className="text-center text-2xl font-bold mb-4">Forgot Password</h1>
          <form>
            <label className="block mb-2">Enter your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transform transition-all duration-300 hover:scale-105"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default ForgotPassword;
  