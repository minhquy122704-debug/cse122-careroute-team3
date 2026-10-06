## Đề xuất dự án: CareRoute - Hệ thống hỗ trợ tra cứu và điều phối y tế cộng đồng
Mã môn học: CSE122

Nhóm thực hiện: cse122-careroute-team3

Thành viên nhóm:

Phạm Minh Quý (Trưởng nhóm / SV3 - Phụ trách phân hệ Biên tập viên, Quản trị viên & Tích hợp chung)

Phạm Minh Quân (SV1 - Phụ trách phân hệ Người dân)

Mai Ngọc Bút (SV2 - Phụ trách phân hệ Cơ sở y tế)

## 1. Tổng quan dự án (Project Overview)

CareRoute là nền tảng web hướng đến cộng đồng nhằm giải quyết các bài toán cốt lõi trong việc tiếp cận dịch vụ y tế. Hệ thống cung cấp giải pháp kết nối thông minh giữa Người dân, Cơ sở y tế, Biên tập viên và Quản trị viên, kết hợp các mô phỏng trí tuệ nhân tạo (AI) để tối ưu hóa quá trình tra cứu thông tin y tế, điều phối dịch vụ và quản lý dữ liệu vận hành.

## 2. Phát biểu vấn đề (Problem Statement)

Hệ thống tập trung giải quyết 4 bài toán thực tiễn sau:

P1 (Ngữ cảnh Người dân): Người dân gặp nhiều khó khăn trong việc tra cứu nhanh chóng thông tin dịch vụ y tế chính xác, đúng tuyến, phù hợp với triệu chứng thực tế và điều kiện cá nhân.

P2 (Ngữ cảnh Cơ sở y tế): Các cơ sở y tế thiếu một kênh trực quan, hiệu quả để cập nhật, quản lý thông tin dịch vụ và xuất bản các hướng dẫn khám chữa bệnh chuẩn hóa cho người dân.

P3 (Ngữ cảnh Biên tập viên): Biên tập viên mất nhiều thời gian kiểm duyệt nội dung thủ công, đồng thời gặp khó khăn trong việc phát hiện và xử lý các thông tin y tế đã cũ, lỗi thời.

P4 (Giải pháp tích hợp AI): Cần ứng dụng các mô hình AI thông minh đóng vai trò trợ lý ảo nhằm tự động hóa việc định tuyến thông tin, tạo checklist chuẩn bị và giám sát độ mới của dữ liệu.

## 3. Luồng người dùng (User Flows)
Vai trò 1: Người dân (Citizen)
Luồng tra cứu thông tin: Trang chủ → Nhập triệu chứng/từ khóa → Hệ thống kích hoạt AI-1 (Care Information Router) phân tích và đề xuất dịch vụ → Xem trang chi tiết dịch vụ y tế.

Luồng lập Checklist khám bệnh: Xem chi tiết dịch vụ → Chọn tạo checklist → Hệ thống kích hoạt AI-2 (Checklist Generator) tạo danh sách chuẩn bị → Lưu vào LocalStorage / Tùy chỉnh cá nhân.

Vai trò 2: Cơ sở y tế (Healthcare Facility)
Luồng quản lý dịch vụ: Đăng nhập → Bảng điều khiển (facility-dashboard.html) → Quản lý dịch vụ (facility-service-management.html) → Thực hiện các thao tác CRUD (Thêm, Sửa, Xóa, Lưu trữ).

Luồng quản lý hướng dẫn: Truy cập trang quản lý hướng dẫn (facility-guidance-management.html) → Cập nhật các bước quy trình khám chữa bệnh.

Vai trò 3: Biên tập viên & Quản trị viên (Reviewer & Admin)
Luồng kiểm duyệt: Đăng nhập → Hàng chờ duyệt (reviewer-review-queue.html) → Phê duyệt hoặc từ chối nội dung do cơ sở y tế gửi lên.

Luồng giám sát nội dung cũ: Truy cập reviewer-freshness-monitor.html → Sử dụng AI-3 (Freshness Assistant) quét dữ liệu cũ và chọn phương án xử lý.

## 4. Mục tiêu dự án (Project Objectives)
Xây dựng giao diện toàn diện: Hoàn thiện hệ thống giao diện trực quan, responsive bằng HTML5, CSS (Flexbox/Grid) và JavaScript cho 4 vai trò chính với hơn 12 màn hình cốt lõi.

Thực hiện thao tác CRUD & Quản lý dữ liệu: Xây dựng đầy đủ tính năng Thêm, Sửa, Xóa, Xem dữ liệu động sử dụng LocalStorage trên trình duyệt.

Tích hợp tính năng AI mô phỏng:

AI-1 (Care Information Router): Phân tích triệu chứng và đề xuất dịch vụ y tế phù hợp.

AI-2 (Checklist Generator): Tự động sinh danh sách chuẩn bị khi đi khám bệnh.

AI-3 (Freshness Assistant): Quét và hỗ trợ xử lý dữ liệu cũ, lỗi thời.

Quản lý dự án chuyên nghiệp: Áp dụng mô hình Git Branching Workflow và quản lý tiến độ thông qua Trello/Jira.

## 5. Phạm vi hệ thống & Phân chia vai trò (Scope & Roles)
Vai trò Người dân (Citizen): Tra cứu thông tin dịch vụ y tế, nhận gợi ý từ AI-1 và lập danh sách checklist cá nhân bằng AI-2 (citizen-care-search.html, citizen-care-detail.html, citizen-care-checklist.html).

Vai trò Cơ sở y tế (Healthcare Facility): Quản lý bảng điều khiển, thực hiện CRUD dịch vụ y tế và cập nhật hướng dẫn quy trình khám chữa bệnh (facility-dashboard.html, facility-service-management.html, facility-guidance-management.html).

Vai trò Biên tập viên (Reviewer): Quản lý hàng chờ duyệt nội dung do cơ sở y tế gửi lên, đánh giá phản hồi và giám sát độ mới nội dung bằng trợ lý AI-3 (reviewer-review-queue.html, reviewer-feedback-review.html, reviewer-freshness-monitor.html).

Vai trò Quản trị viên (Admin): Quản lý toàn diện hệ thống, kiểm soát danh sách cơ sở y tế toàn hệ thống và quản lý danh mục phân loại Taxonomy (admin-dashboard.html, admin-facility-management.html, admin-category-management.html).

## 6. Công nghệ sử dụng (Technology Stack)
Frontend: HTML5, CSS3, JavaScript (Vanilla JS).

UI/UX Framework & Icons: CSS custom variables, Google Fonts (Inter).

Version Control: Git & GitHub.

Project Management: Trello.