# ImFree – Nền tảng chia sẻ nguồn lực nhàn rỗi dành cho sinh viên
> **Đề tài tham gia:** Advanced Information Systems Contest 2026 (AISC'26)  
> **Đơn vị:** Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT)  
> **Chủ đề:** Digital Business Ideas  

---

## 📖 Giới thiệu dự án (Overview)
**ImFree** là nền tảng kinh tế chia sẻ ngang hàng (P2P Campus Sharing Economy) dành riêng cho cộng đồng sinh viên đại học, tập trung giải quyết bài toán lãng phí tài nguyên và rào cản chi phí thông qua 2 trụ cột:
1. **Asset Sharing (Cho thuê tài sản nhàn rỗi):** Máy ảnh, tripod, máy chiếu, laptop, thiết bị đồ án...
2. **Skill Sharing (Cung cấp kỹ năng & dịch vụ):** Thiết kế slide/poster, chỉnh sửa video, lập trình, gia sư...

Nền tảng được bảo vệ bởi **Hạ tầng niềm tin (Trust Infrastructure)** bao gồm: Xác thực sinh viên (Student KYC), Đặt cọc ký quỹ (Escrow), Đối chiếu hiện trạng tài sản bằng hình ảnh trước/sau bàn giao (Condition Inspection), và Hệ thống điểm uy tín đa vai trò (Trust Score).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)
* **Mobile App:** Flutter (Cross-platform Android/iOS), BLoC State Management, Dio Networking.
* **Backend:** Node.js, NestJS (Modular Architecture, Swagger OpenAPI).
* **Database & ORM:** PostgreSQL 16 (chạy qua Docker), Prisma Next ORM.
* **Infrastructure & DevOps:** Docker, Docker Compose, GitHub Actions CI/CD.

---

## 📂 Cấu trúc Repository (Monorepo)
```text
ImFree/
├── .github/workflows/       # Quy trình CI/CD tự động kiểm tra code
├── docs/                    # Tài liệu phân tích, ERD Diagram, thiết kế hệ thống
├── deployment/              # Cấu hình Docker, Nginx triển khai server
├── imfree-backend/          # Mã nguồn máy chủ NestJS & Prisma
├── imfree-mobile/           # Mã nguồn ứng dụng Flutter
├── docker-compose.yml       # Cấu hình khởi động PostgreSQL & Redis container
└── README.md
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy dự án (Getting Started)

### 1. Yêu cầu môi trường (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt sẵn:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (Khuyên dùng v20.x hoặc v22.x LTS)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (bắt buộc để chạy PostgreSQL Database)
* [Flutter SDK](https://docs.flutter.dev/get-started/install) (nếu muốn chạy mobile app)

---

### 2. Clone mã nguồn về máy
Mở Terminal hoặc Command Prompt, chạy lệnh:
```bash
git clone https://github.com/phamhuy273/ImFree.git
cd ImFree
```

---

### 3. Khởi động Cơ sở dữ liệu (PostgreSQL qua Docker)
Từ thư mục gốc `ImFree`, chạy lệnh sau để bật PostgreSQL và Redis:
```bash
docker compose up -d
```
> 💡 *Lệnh này sẽ tự động tạo một container PostgreSQL 16 trên cổng `5432` với user `postgres` và database `imfree_db`.*

---

### 4. Cài đặt và Chạy Backend (NestJS Server)

#### Bước 4.1: Di chuyển vào thư mục backend và cài đặt thư viện
```bash
cd imfree-backend
npm install
```

#### Bước 4.2: Cấu hình biến môi trường (`.env`)
Tạo file `.env` bên trong thư mục `imfree-backend` (hoặc copy từ `.env.example`):
```env
DATABASE_URL="postgresql://postgres:rootpassword@localhost:5432/imfree_db?schema=public"
PORT=3000
JWT_SECRET="imfree_jwt_secret_dev_2026"
```

#### Bước 4.3: Đồng bộ Database Schema (Prisma Next)
Chạy 2 lệnh sau để sinh kiểu dữ liệu và tự động tạo bảng trong PostgreSQL:
```bash
# 1. Sinh contract types cho TypeScript
npm run contract:emit

# 2. Khởi tạo và tạo các bảng trong Database
npx prisma db init
```

#### Bước 4.4: Khởi chạy máy chủ ở chế độ Development
```bash
npm run start:dev
```

Sau khi chạy thành công, máy chủ sẽ lắng nghe tại:
* 🌐 **API Base URL:** `http://localhost:3000/api/v1`
* 📄 **Swagger API Docs (Giao diện Test API):** `http://localhost:3000/api/docs`

---

### 5. Chạy Ứng dụng Di động (Flutter Mobile App)
*(Dành cho thành viên phát triển App)*

Mở một cửa sổ Terminal mới:
```bash
cd imfree-mobile
flutter pub get
flutter run
```

---

## 🧪 Tài khoản & API Test mẫu
Bạn có thể mở `http://localhost:3000/api/docs` để test trực tiếp các API:
1. **Đăng ký tài khoản sinh viên:** `POST /api/v1/auth/register` (Email bắt buộc có đuôi `.edu.vn`).
2. **Đăng nhập:** `POST /api/v1/auth/login`.
3. **Xem hồ sơ cá nhân:** `GET /api/v1/auth/me` (Sử dụng `access_token` nhận được sau khi login).

---

## 👥 Đội ngũ Phát triển
Dự án được xây dựng và phát triển bởi sinh viên **Trường Đại học Công nghệ Thông tin - ĐHQG-HCM (UIT)** tham gia cuộc thi AISC'26.