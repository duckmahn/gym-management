export default function SignIn() {
  return (
    <div className="w-screen h-screen">
      <div className="SignIn w-1/2 bg-white p-5 border border-brown-500 rounded">
        <div className="Tiltle text-3xl text-black text-center mb-5">
          Sign In
        </div>
        <div className="Content">
          <form>
            <label>UserName:</label>
            <br />
            <input
              type="text"
              placeholder="Enter UserName"
              className="w-full p-2 border border-brown-500 rounded"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border border-brown-500 rounded"
            />
            <br />
          </form>
          <div className="Other">
            <a href="#" className="text-brown-500 float-right mb-1.5">
              Forgot password?
            </a>
          </div>
          <button className="SI w-full bg-brown-500 p-2 rounded text-white text-center hover:opacity-50">
            Sign In
          </button>
          <p className="Or text-center my-1">or</p>
          <button className="Google w-full bg-white p-2 border border-brown-500 rounded text-black text-center hover:opacity-50">
            Google
          </button>
          <p className="Suggest text-center my-1">
            Don't have an account?
            <a href="/signup" className="text-brown-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
