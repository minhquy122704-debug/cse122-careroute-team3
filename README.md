# CareRoute - Hệ thống hỗ trợ tra cứu và điều phối y tế cộng đồng

## Ngữ cảnh
Trong bối cảnh y tế cộng đồng hiện nay, người dân thường gặp khó khăn trong việc tiếp cận thông tin chính xác về các dịch vụ y tế, quy trình khám chữa bệnh đúng tuyến cũng như việc lựa chọn cơ sở y tế phù hợp với triệu chứng thực tế của bản thân. Đồng thời, các cơ sở y tế và nhà quản lý cũng cần một nền tảng trực quan để cập nhật, quản lý thông tin y tế một cách nhanh chóng, minh bạch.

## Phát biểu vấn đề
- **Vấn đề 1 (Người dân):** Khó khăn trong việc tra cứu nhanh thông tin dịch vụ y tế, chưa nắm rõ quy trình khám bệnh đúng tuyến và thiếu công cụ chuẩn bị thủ tục (checklist) trước khi đến cơ sở y tế.
- **Vấn đề 2 (Cơ sở y tế):** Thiếu kênh trực quan và thuận tiện để cập nhật, quản lý thông tin dịch vụ, giờ giấc hoạt động và các hướng dẫn khám chữa bệnh cho cộng đồng.
- **Vấn đề 3 (Biên tập viên / Quản trị viên):** Quá tải trong công tác kiểm duyệt nội dung thủ công do các cơ sở y tế gửi lên, khó kiểm soát và phát hiện các thông tin y tế đã cũ, lỗi thời.

## Mục tiêu
- Xây dựng hệ thống web frontend hoàn chỉnh cho đề tài **CareRoute** phục vụ 4 nhóm vai trò cốt lõi (Người dân, Cơ sở y tế, Biên tập viên, Quản trị viên).
- Ứng dụng các tính năng hỗ trợ thông minh bằng AI để nâng cao trải nghiệm tra cứu và quản lý dữ liệu.
- Thiết lập cấu trúc dự án chuẩn, quản lý tiến độ minh bạch qua Trello, Figma và GitHub.

## Các vai trò
1. **Người dân (Citizen):** Tra cứu thông tin, tìm kiếm cơ sở y tế, xem chi tiết dịch vụ và lập danh sách kiểm tra (checklist) khám bệnh cá nhân.
2. **Cơ sở y tế (Healthcare Facility):** Đăng nhập, quản lý thông tin cơ sở, thực hiện CRUD các dịch vụ y tế và cập nhật hướng dẫn khám chữa bệnh.
3. **Biên tập viên (Reviewer):** Tiếp nhận hàng chờ duyệt nội dung, kiểm tra, phê duyệt hoặc từ chối thông tin do cơ sở y tế cung cấp và giám sát độ mới của dữ liệu.
4. **Quản trị viên (Admin):** Quản lý toàn diện hệ thống, kiểm soát tài khoản cơ sở y tế, quản lý danh mục (taxonomy) và giám sát hệ thống.

## Luồng người dùng
- **Người dân:** Trang chủ -> Nhập triệu chứng/từ khóa -> Hệ thống gợi ý dịch vụ/cơ sở y tế phù hợp -> Xem chi tiết và tạo checklist chuẩn bị khám bệnh.
- **Cơ sở y tế:** Đăng nhập -> Vào bảng điều khiển (Dashboard) -> Cập nhật thông tin dịch vụ & quy trình hướng dẫn khám bệnh.
- **Biên tập viên:** Kiểm tra hàng chờ nội dung -> Xét duyệt hoặc phản hồi -> Sử dụng công cụ giám sát độ mới để xử lý các dữ liệu cũ.

## Bảng kiểm kê màn hình
| STT | Tên màn hình / Chức năng | Tên tệp mã nguồn (File name) | Vai trò phụ trách | Thành viên thực hiện |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Mẫu tra cứu & Gợi ý thông minh | `citizen-care-search.html` | Người dân | Quân (SV1) |
| 2 | Mẫu chi tiết dịch vụ/cơ sở y tế | `citizen-care-detail.html` | Người dân | Quân (SV1) |
| 3 | Mẫu danh sách kiểm tra (Checklist) | `citizen-care-checklist.html` | Người dân | Quân (SV1) |
| 4 | Bảng điều khiển cơ sở y tế | `facility-dashboard.html` | Cơ sở y tế | Bút (SV2)[cite: 2] |
| 5 | Trang quản lý dịch vụ y tế (CRUD) | `facility-service-management.html` | Cơ sở y tế | Bút (SV2) |
| 6 | Trang quản lý hướng dẫn khám bệnh | `facility-guidance-management.html` | Cơ sở y tế | Bút (SV2) |
| 7 | Hàng chờ duyệt nội dung | `reviewer-review-queue.html` | Biên tập viên | Bạn (SV3) |
| 8 | Trang đánh giá và phản hồi duyệt | `reviewer-feedback-review.html` | Biên tập viên | Bạn (SV3) |
| 9 | Giám sát độ mới nội dung (AI-3) | `reviewer-freshness-monitor.html` | Biên tập viên | Bạn (SV3) |
| 10 | Bảng điều khiển quản trị hệ thống | `admin-dashboard.html` | Quản trị viên | Bạn (SV3) |
| 11 | Trang quản lý cơ sở y tế toàn hệ thống | `admin-facility-management.html` | Quản trị viên | Bạn (SV3) |
| 12 | Trang quản lý danh mục (Taxonomy) | `admin-category-management.html` | Quản trị viên | Bạn (SV3) |

## Tính năng AI
- **AI-1 (Care Information Router):** Phân tích triệu chứng hoặc từ khóa do người dân nhập vào để điều phối, gợi ý danh mục dịch vụ và cơ sở y tế phù hợp nhất.
- **AI-2 (Checklist Generator):** Tự động sinh danh sách các giấy tờ, thủ tục và bước chuẩn bị cần thiết cho người dân dựa trên dịch vụ y tế đã chọn.
- **AI-3 (Freshness Assistant):** Hỗ trợ biên tập viên quét các bài viết/hướng dẫn cũ, lâu ngày chưa cập nhật để đưa ra cảnh báo và đề xuất chỉnh sửa.

## Công nghệ
- **Frontend:** HTML5, CSS3, JavaScript.
- **Lưu trữ dữ liệu giả lập:** LocalStorage / JSON.
- **Thiết kế UI/UX:** Figma.
- **Quản lý phiên bản & Mã nguồn:** Git, GitHub.
- **Quản lý tiến độ:** Trello.

## Thành viên nhóm
- **Nhóm trưởng & Thành viên 3 (SV3):** Quản lý chung, tài liệu, phụ trách vai trò Biên tập viên & Quản trị viên.
- **Thành viên 1 (Quân - SV1):** Phụ trách thiết kế và lập trình luồng Người dân.
- **Thành viên 2 (Bút - SV2):** Phụ trách thiết kế và lập trình luồng Cơ sở y tế.

## Phân công công việc
- Phân chia chi tiết qua 15 task trên Trello, quản lý theo các giai đoạn: Phân tích yêu cầu, Thiết kế giao diện (Figma), Lập trình tính năng theo vai trò, Kiểm thử và Hoàn thiện báo cáo/Video demo.

## Quy trình Git
- Sử dụng nhánh chính `main`. Các thành viên thực hiện clone repository, thực hiện `git pull` trước khi làm việc và `git push` lên nhánh `main` sau khi hoàn thành task.

## Figma / Canva
- Link thiết kế giao diện chi tiết trên Figma của nhóm: *[https://www.figma.com/design/yRPsl2coYwjC13kBhhLKEz/CareRoute---UI-Design?node-id=0-1&t=H6S6YA57MTtvuzha-1]*

## Demo
- Link xem trước sản phẩm trực tiếp (GitHub Pages / Vercel): *[Chèn link demo tại đây]*

## Minh chứng OBS
- Link video quay màn hình demo sản phẩm và giải thích code qua OBS:
 *[Chèn link video OBS tại đây]*
 *[Chèn link video OBS tại đây]*
 *[Chèn link video OBS tại đây]*
 

## Khai báo sử dụng AI
- Sử dụng các công cụ AI hỗ trợ trong quá trình định hình ý tưởng cấu trúc, kiểm tra mã nguồn, hỗ trợ viết tài liệu hướng dẫn và tối ưu hóa giao diện người dùng theo đúng quy chế học phần.