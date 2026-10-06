# Tài liệu Ngữ cảnh, Vấn đề, Luồng người dùng & Bảng kiểm kê màn hình
**Đề tài:** CareRoute - Hệ thống hỗ trợ tra cứu và điều phối y tế cộng đồng  
**Nhóm:** cse122-careroute-team3
## 1. Ngữ cảnh & Vấn đề (Context & Problems)
P1 (Ngữ cảnh Người dân): Người dân gặp khó khăn trong việc tra cứu nhanh thông tin dịch vụ y tế chính xác, đúng tuyến và phù hợp với triệu chứng thực tế.

P2 (Ngữ cảnh Cơ sở y tế): Các cơ sở y tế thiếu một kênh trực quan để cập nhật, quản lý thông tin dịch vụ và hướng dẫn khám chữa bệnh cho người dân.

P3 (Ngữ cảnh Biên tập viên): Biên tập viên mất nhiều thời gian kiểm duyệt nội dung thủ công và khó phát hiện các thông tin đã cũ, lỗi thời.

P4 (Giải pháp tích hợp AI): Ứng dụng các mô hình AI hỗ trợ thông minh nhằm tối ưu hóa trải nghiệm toàn hệ thống.

## 2. Luồng người dùng (User Flows)
Vai trò 1: Người dân (Citizen)
Luồng tra cứu thông tin: Trang chủ → Nhập triệu chứng/từ khóa → Hệ thống kích hoạt AI-1 (Care Information Router) phân tích và đề xuất dịch vụ → Xem trang chi tiết dịch vụ y tế.

Luồng lập Checklist khám bệnh: Xem chi tiết dịch vụ → Chọn tạo checklist → Hệ thống kích hoạt AI-2 (Checklist Generator) tạo danh sách chuẩn bị → Lưu vào LocalStorage / Tùy chỉnh cá nhân.

Vai trò 2: Cơ sở y tế (Healthcare Facility)
Luồng quản lý dịch vụ: Đăng nhập → Bảng điều khiển (facility-dashboard.html) → Quản lý dịch vụ (facility-service-management.html) → Thực hiện các thao tác CRUD (Thêm, Sửa, Xóa, Lưu trữ).

Luồng quản lý hướng dẫn: Truy cập trang quản lý hướng dẫn (facility-guidance-management.html) → Cập nhật các bước quy trình khám chữa bệnh.

Vai trò 3: Biên tập viên & Quản trị viên (Reviewer & Admin)
Luồng kiểm duyệt: Đăng nhập → Hàng chờ duyệt (reviewer-review-queue.html) → Phê duyệt hoặc từ chối nội dung do cơ sở y tế gửi lên.

Luồng giám sát nội dung cũ: Truy cập reviewer-freshness-monitor.html → Sử dụng AI-3 (Freshness Assistant) quét dữ liệu cũ và chọn phương án xử lý.

## 3. Bảng kiểm kê màn hình (Screen Inventory Table)

| STT | Tên màn hình / Chức năng | Tên tệp mã nguồn (File name) | Vai trò phụ trách | Thành viên thực hiện |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Mẫu tra cứu & Gợi ý thông minh | `citizen-care-search.html` | Người dân | Quân (SV1)[cite: 2] |
| **2** | Mẫu chi tiết dịch vụ/cơ sở y tế | `citizen-care-detail.html` | Người dân | Quân (SV1)[cite: 2] |
| **3** | Mẫu danh sách kiểm tra (Checklist) | `citizen-care-checklist.html` | Người dân | Quân (SV1)[cite: 2] |
| **4** | Bảng điều khiển cơ sở y tế | `facility-dashboard.html` | Cơ sở y tế | Bút (SV2)[cite: 2] |
| **5** | Trang quản lý dịch vụ y tế (CRUD) | `facility-service-management.html` | Cơ sở y tế | Bút (SV2)[cite: 2] |
| **6** | Trang quản lý hướng dẫn khám bệnh | `facility-guidance-management.html` | Cơ sở y tế | Bút (SV2)[cite: 2] |
| **7** | Hàng chờ duyệt nội dung | `reviewer-review-queue.html` | Biên tập viên | Bạn (SV3)[cite: 2] |
| **8** | Trang đánh giá và phản hồi duyệt | `reviewer-feedback-review.html` | Biên tập viên | Bạn (SV3)[cite: 2] |
| **9** | Giám sát độ mới nội dung (AI-3) | `reviewer-freshness-monitor.html` | Biên tập viên | Bạn (SV3)[cite: 2] |
| **10** | Bảng điều khiển quản trị hệ thống | `admin-dashboard.html` | Quản trị viên | Bạn (SV3)[cite: 2] |
| **11** | Trang quản lý cơ sở y tế toàn hệ thống | `admin-facility-management.html` | Quản trị viên | Bạn (SV3)[cite: 2] |
| **12** | Trang quản lý danh mục (Taxonomy) | `admin-category-management.html` | Quản trị viên | Bạn (SV3)[cite: 2] |
| **13** | Trang đăng nhập / Chọn vai trò | `login.html` | Dùng chung | Cả nhóm[cite: 2] |
| **14** | Trang báo lỗi không tìm thấy trang | `404.html` | Dùng chung | Cả nhóm[cite: 2] |