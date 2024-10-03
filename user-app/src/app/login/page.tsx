import "./userLogin.css";

export default function Home1() {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center bg-white p-5 border border-black rounded">
        <div className="text-2xl text-black text-center mb-5">Log in</div>
        <div className="content">
          <form>
            <label>Telephone</label>
            <br />
            <input
              type="tel"
              placeholder="Enter telephone"
              className="w-full p-2 border border-brown-700 rounded mb-4"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border border-brown-700 rounded mb-4"
            />
            <br />
          </form>
          <div className="other text-right">
            <a href="..." className="text-brown-700">
              Forgot password?
            </a>
          </div>
          <button className="w-full bg-brown-700 p-2 rounded text-white text-center mb-2">
            Login
          </button>
          <p className="text-center my-2">or</p>
          <button className="w-full bg-white p-2 border border-brown-700 rounded text-black text-center mb-2">
            Google
          </button>
          <p className="text-center my-2">
            Bạn chưa có tài khoản?{" "}
            <a href="..." className="text-brown-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
