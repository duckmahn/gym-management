import "./userLogin.css";

export default function Home1() {
    return (
        <div className="userLogin">
            <div className="tiltle">Log in</div>
            <div className="content">
                <form>
                    <label>Telephone</label><br/>
                    <input type="tel" placeholder="Enter telephone"/><br/>
                    <label>Password</label><br/>
                    <input type="password" placeholder="Enter password"/><br/>
                </form>
                <div className="other">
                    <a href="...">Forgot password?</a>
                </div>
                <button className="login">Login</button><br/>
                <p className="or">or</p><br/>
                <button className="google">Google</button>
                <p className="suggest">Bạn chưa có tài khoản? <a href="...">Sign up</a></p>
            </div>
        </div>
    );
}