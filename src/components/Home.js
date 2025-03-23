import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Nhớ cài đặt bootstrap qua npm hoặc thêm link CDN trong index.html

const Home = () => {
  return (
    <div className="container py-5">
      <div className="row text-center mb-5">
        <div className="col-12">
          <h1 className="display-4 fw-bold">Chào mừng đến với Hệ thống Quản lý Người dùng</h1>
          <p className="lead text-muted">
            Giải pháp xác thực và phân quyền mạnh mẽ với JWT
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Xác thực JWT</h5>
              <p className="card-text">
                Đảm bảo an toàn cho người dùng với hệ thống xác thực dựa trên JSON Web Token (JWT), dễ dàng tích hợp và bảo mật cao.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Quản lý Phân quyền</h5>
              <p className="card-text">
                Kiểm soát truy cập URL linh hoạt với hệ thống phân quyền theo vai trò (role) và nhóm vai trò (group-role).
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Quản lý Người dùng</h5>
              <p className="card-text">
                Dễ dàng thêm, sửa, xóa người dùng và phân trang danh sách người dùng một cách hiệu quả.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-center mt-5">
        <div className="col-12">
          <a href="/login" className="btn btn-primary btn-lg">
            Bắt đầu ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;