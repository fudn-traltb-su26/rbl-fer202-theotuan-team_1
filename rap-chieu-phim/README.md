# 🎬 Rạp Chiếu Phim Online

Web đặt vé xem phim trực tuyến — Bài tập nhóm môn **FER202** tại FPT University.

> Cho phép người dùng xem danh sách phim đang chiếu, chọn suất chiếu, chọn ghế và đặt vé nhanh chóng.

---

## 👥 Thành viên nhóm

| STT | Họ và tên | Nhiệm vụ |
|-----|-----------|----------|
| 1 | Nguyễn Xuân Thịnh | Tạo GitHub repo, cấu hình Vite project, tổ chức thư mục |
| 2 | Nguyễn Hữu Tấn Đạt | Thiết kế màn hình Trang chủ + Danh sách phim |
| 3 | Nguyễn Minh Huy | Thiết kế màn hình Chi tiết sách + Giỏ hàng |
| 4 | Bùi Thuỳ Dung | Thiết kế db.json — cấu trúc dữ liệu booking, categories |
| 5 | Huỳnh Thị Thuý Kiều | Vẽ Component Tree, viết README.md, tổng hợp prompt log |

---

## 🛠️ Công nghệ sử dụng

- **React 19** — Xây dựng giao diện người dùng
- **Vite 8** — Build tool, dev server tốc độ cao
- **React Router DOM v7** — Điều hướng giữa các trang
- **Axios** — Gọi API từ json-server
- **Bootstrap 5 + React Bootstrap** — Giao diện, layout responsive
- **json-server** — Mock REST API từ file `db.json`

---

## 📁 Cấu trúc thư mục

```
rap-chieu-phim/
├── public/                 # Tài nguyên tĩnh
├── src/
│   ├── assets/             # Hình ảnh, icon, font
│   ├── components/         # Các component dùng chung
│   ├── context/            # React Context (state toàn cục)
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Các trang (Home, Detail, Booking...)
│   ├── services/           # Gọi API (axios)
│   ├── App.jsx             # Cấu hình Routes
│   └── main.jsx            # Entry point
├── db.json                 # Dữ liệu mẫu (json-server)
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Hướng dẫn cài đặt và chạy

### Yêu cầu

- Node.js **>= 18.x**
- npm **>= 9.x**

Kiểm tra phiên bản:
```bash
node -v
npm -v
```

### Bước 1 — Clone repository

```bash
git clone https://github.com/fudn-traltb-su26/rbl-fer202-theotuan-team_1.git
cd rbl-fer202-theotuan-team_1/rap-chieu-phim
```

### Bước 2 — Cài đặt dependencies

```bash
npm install
```

### Bước 3 — Chạy json-server (mock API)

Mở terminal thứ nhất:
```bash
npx json-server --watch db.json --port 3001
```

API sẽ chạy tại: `http://localhost:3001`

| Endpoint | Mô tả |
|----------|-------|
| `GET /movies` | Danh sách phim |
| `GET /movies/:id` | Chi tiết phim |
| `GET /genres` | Danh sách thể loại |
| `GET /theaters` | Danh sách rạp |
| `GET /showtimes?movie_id=1` | Suất chiếu theo phim |
| `GET /seats?theater_id=1` | Ghế theo rạp |
| `GET /bookings?user_id=1` | Lịch sử đặt vé |
| `POST /bookings` | Tạo booking mới |

### Bước 4 — Chạy ứng dụng React

Mở terminal thứ hai:
```bash
npm run dev
```

Ứng dụng chạy tại: `http://localhost:5173`

---

## 📦 Các lệnh hữu ích

```bash
npm run dev       # Chạy development server
npm run build     # Build production
npm run preview   # Xem bản build production
npm run lint      # Kiểm tra lỗi ESLint
```

---

## 🔗 Link tham khảo

- GitHub Repository: https://github.com/fudn-traltb-su26/rbl-fer202-theotuan-team_1
- json-server docs: https://github.com/typicode/json-server
- React Router v7: https://reactrouter.com