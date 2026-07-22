TRƯỜNG ĐẠI HỌC FPT
KHOA CÔNG NGHỆ THÔNG TIN
BÁO CÁO CÔNG VIỆC
Kiểm thử Component & Viết Unit Test
Môn: Software Project (SWP391) / Phát triển Ứng dụng Web với ReactJS (FER202)
Project: TicketNow_SWP391

I. THÔNG TIN NHÓM
Tên nhóm	[Điền tên nhóm]
Mã lớp học phần	[Mã lớp]
Giảng viên hướng dẫn	[Tên giảng viên]
Link GitHub Repo	https://github.com/TanDat-2005/FER202_SU26_TanDatNH
Tuần báo cáo	Báo cáo kết quả viết Unit Test cho Component Payment
Ngày nộp	[dd/mm/yyyy]

II. PHÂN CÔNG CÔNG VIỆC
Ghi rõ nhiệm vụ từng thành viên và % hoàn thành. Cột Kết quả ghi "Đạt" / "Một phần" / "Chưa đạt".

STT	Họ và tên	Nhiệm vụ được giao	Kết quả thực hiện	% HT
1	[Họ tên]	Nghiên cứu công cụ Jest và React Testing Library	Đạt	100%
2	[Họ tên]	Viết prompt AI sinh mã kiểm thử cho Payment.js	Đạt	100%
3	[Họ tên]	Khắc phục lỗi cấu hình Jest (CSS, jest-dom)	Đạt	100%
4	[Họ tên]	Mở rộng 20 test case và chạy kiểm thử	Đạt	100%
5	[Họ tên]	Làm slide và chuẩn bị tài liệu thuyết trình	Đạt	100%

Người chủ trì tuần này:	[Họ và tên thành viên]
Link commit GitHub tuần này:	[https://github.com/.../commits/...]


III. NỘI DUNG ĐÃ THỰC HIỆN
Chủ đề báo cáo: Áp dụng AI (Prompt Engineering) để viết Unit Test cho ứng dụng React bằng Jest và React Testing Library.

3.1. Danh sách công việc
Đánh dấu cột Trạng thái: [x] = Xong  |  [~] = Một phần  |  [ ] = Chưa làm

#	Công việc cần thực hiện	T.thái	Người thực hiện
1	Cấu hình môi trường Jest, cài đặt @testing-library/jest-dom	[x]	[Tên SV]
2	Prompt sinh 15 test case cơ bản cho TicketPayment / Payment.js	[x]	[Tên SV]
3	Prompt chọn lọc 3-4 test case tiêu biểu để thuyết trình	[x]	[Tên SV]
4	Prompt mở rộng phạm vi kiểm thử lên 20 test case (edge cases, API errors)	[x]	[Tên SV]
5	Khắc phục lỗi cấu hình khi chạy test (CSS import, mock fetch)	[x]	[Tên SV]

3.2. Mô tả chi tiết cách triển khai
Nhóm đã tiếp cận việc viết kiểm thử tự động bằng cách sử dụng công cụ AI để tăng tốc độ phát triển. Quy trình thực hiện qua các bước Prompt Engineering rõ ràng:
- **Bước 1**: Đưa ra yêu cầu cụ thể (context, setup, assertion) để AI sinh 15 test case chính cho component Payment. Bao gồm các kịch bản: tải component hợp lệ, thiếu token, tính tổng tiền, xử lý API lỗi (500), v.v.
- **Bước 2**: Tối ưu hóa cho thuyết trình bằng cách yêu cầu AI chọn ra 3-4 test case tiêu biểu nhất thể hiện logic tính toán, mock API và chuyển hướng UI.
- **Bước 3**: Mở rộng độ phủ (coverage) lên 20 test case, tập trung vào các trường hợp biên, lỗi dữ liệu (ví dụ: vé = 0, lỗi mạng 404, timeout).
- **Bước 4**: Trong quá trình chạy test, gặp phải lỗi về import CSS và thiếu matchers của DOM. Nhóm đã tìm hiểu và cấu hình `moduleNameMapper` trong file cấu hình Jest để mock các file `.css`, cũng như import `@testing-library/jest-dom` vào file `setupTests.js`.


IV. KẾT QUẢ ĐẠT ĐƯỢC
4.1. Kết quả kỹ thuật đạt được
1.	Hoàn thiện file `front-end/test/Payment.test.js` với 20 test cases chạy ổn định (PASS).
2.	Cấu hình thành công môi trường kiểm thử cho toàn dự án TicketNow_SWP391.
3.	Hoàn thành slide thuyết trình giải thích quy trình tự động hóa kiểm thử: https://www.canva.com/design/DAG2wrl_-8k/dgTZ6x7UCKi3FXn76KXfHw/edit

4.2. Screenshot / Demo kết quả
[Chèn Screenshot 1 tại đây]
Hình 1: Màn hình console hiển thị toàn bộ 20 test case chạy thành công (PASS).

[Chèn Screenshot 2 tại đây]
Hình 2: Màn hình UI của Component Payment đang được kiểm thử.


V. CHECKLIST ĐẦU RA — KIỂM THỬ
Đánh dấu ☑ vào cột "HT?" cho mỗi đầu ra đã hoàn thành. Ghi rõ file/folder/link lưu kết quả.

#	Yêu cầu đầu ra	HT?	Vị trí lưu kết quả (file / folder / link)	Ghi chú
1	Hoàn thiện file test cho Payment.js với 20 test cases	[x]	`front-end/test/Payment.test.js`	Đạt độ phủ tốt cho logic và UI
2	Cấu hình Jest chạy không có console error liên quan đến import CSS	[x]	File cấu hình Jest / `setupTests.js`	Đã fix lỗi
3	Slide báo cáo giải thích quy trình Prompt Engineering cho unit test	[x]	Link Canva đính kèm	Hoàn thành


VI. HẠN CHẾ & LỖI GẶP PHẢI
6.1. Bảng lỗi kỹ thuật
Liệt kê chi tiết các lỗi đã gặp và xử lý trong quá trình test.

#	Mô tả lỗi (copy error message nếu có)	Nguyên nhân (đoán)	Cách khắc phục	T.thái
1	Lỗi "SyntaxError: Unexpected token '.'" khi import file .css	Jest là môi trường Node.js không hiểu cú pháp import CSS	Thêm `moduleNameMapper` trong cấu hình Jest để trả về mock object cho các file tĩnh	Đã fix
2	Lỗi "TypeError: expect(...).toBeInTheDocument is not a function"	Chưa import thư viện jest-dom để mở rộng matcher của Jest	Cài đặt `@testing-library/jest-dom` và import vào `setupTests.js`	Đã fix
3	Cảnh báo liên quan đến 'act(...)' khi render component có fetch API	State cập nhật sau khi component đã render hoặc unmount trong lúc chạy test	Sử dụng `findBy...` hoặc bọc các hành động cập nhật state bằng `waitFor`	Đã fix

6.2. Hạn chế về kiến thức & chất lượng
•	Mặc dù đã hoàn thành 20 test cases cho Payment, độ phủ (Test Coverage) ở các component khác vẫn cần phải cải thiện.
•	Chưa tích hợp CI/CD để tự động chạy các bài test này mỗi khi có pull request mới trên GitHub.
