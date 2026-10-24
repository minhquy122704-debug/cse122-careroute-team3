# Phân tích Vai trò và Tính năng (Roles and Features)

## 1. Tổng quan các vai trò (User Roles)

Hệ thống **CareRoute** phân chia rõ ràng 4 nhóm người dùng chính với các quyền hạn và không gian làm việc riêng biệt:
* **Người dân (Citizen):** Người có nhu cầu tra cứu thông tin y tế, tìm kiếm cơ sở khám chữa bệnh đúng tuyến và chuẩn bị quy trình đi khám.
* **Cơ sở y tế (Healthcare Facility):** Đại diện bệnh viện/phòng khám chịu trách nhiệm cập nhật danh mục dịch vụ và hướng dẫn khám chữa bệnh.
* **Biên tập viên (Reviewer):** Nhân sự kiểm duyệt nội dung, duyệt thông tin do cơ sở y tế gửi lên và giám sát độ mới của dữ liệu.
* **Quản trị viên (Admin):** Người quản lý cấp cao kiểm soát toàn bộ hệ thống, danh sách cơ sở y tế và danh mục hệ thống (Taxonomy).

## 2. Chi tiết tính năng theo từng vai trò

* **Vai trò 1**: Người dân (Citizen)
Tra cứu & Gợi ý thông minh (AI-1): Nhập triệu chứng hoặc từ khóa để hệ thống phân tích và đề xuất dịch vụ y tế phù hợp (citizen-care-search.html).
Chi tiết dịch vụ: Xem thông tin chi tiết về cơ sở y tế, chuyên khoa, chi phí và thời gian làm việc (citizen-care-detail.html).
Lập Checklist khám bệnh (AI-2): Tự động tạo danh sách các giấy tờ, vật dụng cần chuẩn bị khi đi khám và lưu trữ cá nhân (citizen-care-checklist.html).

* **Vai trò 2**: Cơ sở y tế (Healthcare Facility)
Bảng điều khiển cơ sở: Thống kê nhanh số lượng dịch vụ, lượt tra cứu và trạng thái hoạt động (facility-dashboard.html).
Quản lý dịch vụ y tế (CRUD): Thêm, sửa, xóa, lưu trữ các gói dịch vụ khám chữa bệnh của cơ sở (facility-service-management.html).
Quản lý hướng dẫn khám bệnh: Cập nhật các bước quy trình, thủ tục tiếp nhận bệnh nhân (facility-guidance-management.html).

* **Vai trò 3**: Biên tập viên (Reviewer)
Hàng chờ duyệt nội dung: Tiếp nhận danh sách các dịch vụ/hướng dẫn do cơ sở y tế gửi lên để kiểm tra tính chính xác (reviewer-review-queue.html).
Đánh giá và phản hồi: Gửi nhận xét, phê duyệt hoặc yêu cầu chỉnh sửa nội dung (reviewer-feedback-review.html).
Giám sát độ mới nội dung (AI-3): Sử dụng trợ lý AI quét các dữ liệu cũ, lỗi thời để đề xuất phương án cập nhật hoặc gỡ bỏ (reviewer-freshness-monitor.html).

* **Vai trò 4**: Quản trị viên (Admin)
Bảng điều khiển quản trị: Tổng quan toàn hệ thống về số lượng cơ sở y tế, tài khoản và hoạt động kiểm duyệt (admin-dashboard.html).
Quản lý cơ sở y tế toàn hệ thống: Thêm mới, khóa hoặc phân quyền cho các cơ sở y tế trên nền tảng (admin-facility-management.html).
Quản lý danh mục (Taxonomy): Quản lý cây danh mục bệnh lý, chuyên khoa và từ khóa chuẩn hóa (admin-category-management.html).