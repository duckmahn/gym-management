import "./signUp.css";

export default function SignUp() {
    return (
        <div className="signUp">
            <div className="tiltle">Sign Up</div>
            <div className="content">
                <form>
                    <label>Name</label><br/>
                    <input type="text" placeholder="Enter name"/><br/>
                    <label>Phone</label><br/>
                    <input type="tel" placeholder="Enter phone"/><br/>
                    <label>Password</label><br/>
                    <input type="password" placeholder="Enter password"/><br/>
                    <label>Repeat Password</label><br/>
                    <input type="password" placeholder="Enter repeat password"/><br/>
                </form>
                <div className="other">
                    <a href="...">Điều khoản của chúng tôi</a>
                </div>
                <button className="SU">Sign up</button><br/>
                <p className="or">or</p><br/>
                <button className="google">Google</button>
                <p className="suggest">Bạn chưa có tài khoản? <a href="...">Log in</a></p>
            </div>
        </div>
    );
}