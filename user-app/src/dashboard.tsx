import "./dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="left">
                <h1>GYMHUFLIT</h1>
                <hr/>
                <ul className="content">
                    <li>Quản lý</li>
                    <li>Lịch</li>
                    <li>Huấn luyện viên</li>
                    <li>Tài chính</li>
                    <li>Cơ sở vật chất</li>
                    <li>Khách hàng</li>
                    <li>Cài đặt</li>
                    <li>Đăng xuất</li>
                </ul>
            </div>
            <div className="right">
               <div className="search">
                    <input type="search" placeholder="Tìm kiếm"/>
               </div>
               <button>Tìm kiếm</button>
            </div>
        </div>
    );
}