export default function SignUp() {
  return (
    <div className="SignUp w-1/2 bg-white p-5 border border-brown-500 rounded">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className="Tiltle text-3xl text-black text-center mb-5">Sign Up</div>
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
          <label>Password:</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 border border-brown-500 rounded"
          />
          <br />
          <label>Repeat Password:</label>
          <br />
          <input
            type="password"
            placeholder="Enter repeat password"
            className="w-full p-2 border border-brown-500 rounded"
          />
          <br />
        </form>
        <div className="Other">
          <a href="#" className="text-brown-500 float-left my-1">
            Điều khoản của chúng tôi
          </a>
        </div>
        <button className="SU w-full bg-brown-500 p-2 rounded text-white text-center hover:opacity-50">
          Sign Up
        </button>
        <p className="Or text-center my-1">or</p>
        <button className="Google w-full bg-white p-2 border border-brown-500 rounded text-black text-center hover:opacity-50">
          <span className="material-icons mr-2"></span>Google
        </button>
        <p className="Suggest text-center my-1">
          Already have an account?
          <a href="/signin" className="text-brown-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
