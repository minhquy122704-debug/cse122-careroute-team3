/**
 * CareRoute - Central API & Mock Data Store
 * Quản lý dữ liệu tập trung, LocalStorage và mô phỏng AI cho toàn bộ 4 vai trò
 */

const CareRouteDB = {
  KEYS: {
    FACILITIES: 'careroute_facilities',
    SERVICES: 'careroute_services',
    GUIDANCES: 'careroute_guidances',
    CHECKLISTS: 'careroute_checklists',
    REVIEW_QUEUE: 'careroute_review_queue',
    CATEGORIES: 'careroute_categories',
    AUDIT_LOGS: 'careroute_audit_logs',
    STATS: 'careroute_stats'
  },

  // Dữ liệu ban đầu mặc định chuẩn y tế
  INITIAL_DATA: {
    facilities: [
      {
        id: "fac-1",
        name: "Bệnh viện Đa khoa Tâm Anh Hà Nội",
        shortName: "BVĐK Tâm Anh",
        type: "Bệnh viện Đa khoa Tư nhân",
        tier: "Tuyến Trung ương / Quốc tế",
        address: "108 Phố Hoàng Như Tiếp, Bồ Đề, Long Biên, Hà Nội",
        phone: "1800 6858",
        email: "cskh@tamanhhospital.vn",
        workingHours: "07:00 - 19:30 (Thứ 2 - CN)",
        emergency: "24/7",
        rating: 4.9,
        reviewCount: 12480,
        verified: true,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=300&q=80",
        coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        insuranceAccepted: ["BHYT Nhà nước", "Bảo hiểm Tư nhân", "Bảo lãnh viện phí trực tiếp"],
        description: "Bệnh viện Đa khoa Tâm Anh là hệ sinh thái y tế chất lượng cao, trang bị cơ sở vật chất chuẩn quốc tế và trang thiết bị hiện đại bậc nhất."
      },
      {
        id: "fac-2",
        name: "Bệnh viện Bạch Mai",
        shortName: "BV Bạch Mai",
        type: "Bệnh viện Đa khoa Công lập",
        tier: "Tuyến Đặc biệt",
        address: "78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
        phone: "024 3869 3731",
        email: "contact@bachmai.gov.vn",
        workingHours: "06:30 - 17:00 (Thứ 2 - Thứ 7)",
        emergency: "24/7",
        rating: 4.7,
        reviewCount: 38200,
        verified: true,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80",
        coverImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
        insuranceAccepted: ["BHYT Nhà nước đúng tuyến", "BHYT thông tuyến", "Bảo lãnh tư nhân"],
        description: "Bệnh viện hạng đặc biệt hàng đầu cả nước với các chuyên khoa mũi nhọn: Tim mạch, Cấp cứu, Hồi sức tích cực, Thần kinh và Tiêu hóa."
      },
      {
        id: "fac-3",
        name: "Bệnh viện Đại học Y Dược TP.HCM",
        shortName: "BV ĐHYD TP.HCM",
        type: "Bệnh viện Đa khoa Công lập",
        tier: "Tuyến 1",
        address: "215 Hồng Bàng, Phường 11, Quận 5, TP. Hồ Chí Minh",
        phone: "028 3855 4269",
        email: "bvdhyd@umc.edu.vn",
        workingHours: "05:00 - 16:30 (Thứ 2 - Thứ 7)",
        emergency: "24/7",
        rating: 4.8,
        reviewCount: 29150,
        verified: true,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80",
        coverImage: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
        insuranceAccepted: ["BHYT Toàn quốc", "Bảo hiểm Dịch vụ"],
        description: "Địa chỉ khám chữa bệnh uy tín ứng dụng công nghệ số toàn diện, kết hợp mô hình Viện - Trường hiện đại chuẩn quốc tế."
      },
      {
        id: "fac-4",
        name: "Bệnh viện Quốc tế Vinmec Times City",
        shortName: "Vinmec Times City",
        type: "Bệnh viện Đa khoa Quốc tế",
        tier: "Tư nhân Đạt chuẩn JCI",
        address: "458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội",
        phone: "024 3974 3556",
        email: "info@vinmec.com",
        workingHours: "07:30 - 17:00 (Thứ 2 - Thứ 7)",
        emergency: "24/7",
        rating: 4.9,
        reviewCount: 8940,
        verified: true,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=300&q=80",
        coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
        insuranceAccepted: ["BHYT Nhà nước", "Bảo lãnh viện phí 40+ hãng", "Thẻ Vinmec"],
        description: "Bệnh viện đạt chứng chỉ quốc tế JCI với dịch vụ chăm sóc hoàn hảo, phòng bệnh chuẩn khách sạn 5 sao."
      }
    ],

    services: [
      {
        id: "srv-1",
        facilityId: "fac-1",
        facilityName: "Bệnh viện Đa khoa Tâm Anh Hà Nội",
        name: "Chụp cộng hưởng từ sọ não (MRI Não 3.0 Tesla)",
        category: "Chẩn đoán hình ảnh",
        price: "2.800.000đ - 3.500.000đ",
        duration: "30 - 45 phút",
        preparation: "Tháo bỏ kim loại, báo tiền sử cấy ghép tim/tai, không cần nhịn ăn trừ trường hợp tiêm thuốc đối quang.",
        bhytCoverage: "Hỗ trợ 80% nếu có chỉ định đúng tuyến",
        status: "active",
        searches: 3840,
        lastUpdated: "2026-09-15",
        verified: true,
        description: "Khảo sát chi tiết nhu mô não, mạch máu não bằng máy MRI 3.0 Tesla không xâm lấn, phát hiện sớm đột quỵ, u não và dị dạng mạch máu."
      },
      {
        id: "srv-2",
        facilityId: "fac-1",
        facilityName: "Bệnh viện Đa khoa Tâm Anh Hà Nội",
        name: "Khám sức khỏe tổng quát chuyên sâu VIP",
        category: "Khám tổng quát",
        price: "4.200.000đ - 6.800.000đ",
        duration: "3 - 4 giờ",
        preparation: "Nhịn ăn sáng tối thiểu 8 tiếng, uống nước lọc vừa phải, nhịn tiểu trước khi siêu âm ổ bụng.",
        bhytCoverage: "Không áp dụng BHYT (Thanh toán theo gói dịch vụ)",
        status: "active",
        searches: 2950,
        lastUpdated: "2026-09-20",
        verified: true,
        description: "Gói khám tầm soát toàn diện 28 danh mục: xét nghiệm máu sinh hóa, siêu âm tim, nội soi tai mũi họng, chụp X-quang kỹ thuật số."
      },
      {
        id: "srv-3",
        facilityId: "fac-1",
        facilityName: "Bệnh viện Đa khoa Tâm Anh Hà Nội",
        name: "Nội soi tiêu hóa không đau (Dạ dày - Đại tràng)",
        category: "Tiêu hóa & Gan mật",
        price: "2.100.000đ - 4.500.000đ",
        duration: "45 - 60 phút",
        preparation: "Nhịn ăn tối thiểu 6-8 giờ, uống thuốc làm sạch đại tràng trước 4-6 giờ theo chỉ dẫn, có người nhà đi cùng.",
        bhytCoverage: "Áp dụng theo danh mục BHYT quy định",
        status: "active",
        searches: 2110,
        lastUpdated: "2026-08-10",
        verified: true,
        description: "Nội soi ứng dụng công nghệ NBI phóng đại nhu mô tế bào, giúp tầm soát ung thư sớm đường tiêu hóa an toàn không gây khó chịu."
      },
      {
        id: "srv-4",
        facilityId: "fac-2",
        facilityName: "Bệnh viện Bạch Mai",
        name: "Khám và Siêu âm tim Doppler màu chuyên sâu",
        category: "Tim mạch & Mạch máu",
        price: "500.000đ - 1.200.000đ",
        duration: "30 phút",
        preparation: "Mang theo đơn thuốc cũ và kết quả điện tim gần nhất, mặc áo rộng rãi thoải mái.",
        bhytCoverage: "Được BHYT chi trả 80% - 100% đúng tuyến",
        status: "active",
        searches: 4520,
        lastUpdated: "2026-05-10", // Lâu chưa cập nhật để test AI-3
        verified: true,
        description: "Đánh giá chức năng bơm máu của tim, phát hiện hở/hẹp van tim, bệnh cơ tim thiếu máu cục bộ bởi chuyên gia Viện Tim mạch Quốc gia."
      },
      {
        id: "srv-5",
        facilityId: "fac-3",
        facilityName: "Bệnh viện Đại học Y Dược TP.HCM",
        name: "Tầm soát và Điều trị Thoái hóa cột sống - Cơ xương khớp",
        category: "Cơ xương khớp",
        price: "800.000đ - 2.400.000đ",
        duration: "40 phút",
        preparation: "Mang theo phim X-quang/MRI cũ nếu có, liệt kê các hoạt động đau nhiều nhất.",
        bhytCoverage: "Áp dụng BHYT đúng tuyến",
        status: "active",
        searches: 1890,
        lastUpdated: "2025-11-20", // Quá hạn 10 tháng để test AI-3
        verified: false,
        description: "Khám chuyên gia Cơ Xương Khớp hàng đầu, phối hợp đo mật độ xương DEXA và tiêm nội khớp dưới hướng dẫn siêu âm."
      },
      {
        id: "srv-6",
        facilityId: "fac-4",
        facilityName: "Bệnh viện Quốc tế Vinmec Times City",
        name: "Gói Quản lý Thai sản & Sinh con trọn gói",
        category: "Sản - Phụ khoa",
        price: "25.000.000đ - 45.000.000đ",
        duration: "Theo dõi suốt thai kỳ",
        preparation: "Khám định kỳ theo tuần thai, làm xét nghiệm NIPT sàng lọc dị tật.",
        bhytCoverage: "Bảo lãnh thai sản tư nhân",
        status: "active",
        searches: 1650,
        lastUpdated: "2026-10-01",
        verified: true,
        description: "Chăm sóc sản phụ toàn diện chuẩn JCI với đội ngũ bác sĩ sản phụ khoa đầu ngành và phòng sinh gia đình tiện nghi."
      }
    ],

    guidances: [
      {
        id: "gui-1",
        facilityId: "fac-1",
        title: "Quy trình Khám bệnh Ngoại trú có thẻ BHYT",
        category: "Khám BHYT",
        targetAudience: "Bệnh nhân có thẻ BHYT và Căn cước công dân gắn chip",
        estimatedTime: "60 - 90 phút",
        steps: [
          { step: 1, title: "Đăng ký & Lấy số", content: "Đến Quầy 1-4 Tầng 1, quét mã CCCD hoặc ứng dụng VNeID/VssID để xác thực BHYT và nhận số thứ tự phòng khám." },
          { step: 2, title: "Khám lâm sàng tại Phòng chuyên khoa", content: "Đến phòng khám chuyên khoa ghi trên phiếu, chờ gọi tên và trao đổi triệu chứng với bác sĩ." },
          { step: 3, title: "Thực hiện Cận lâm sàng (nếu có)", content: "Theo chỉ định bác sĩ đến phòng xét nghiệm máu (Tầng 2) hoặc chụp X-quang/MRI (Tầng B1)." },
          { step: 4, title: "Bác sĩ kết luận & Kê đơn thuốc", content: "Quay lại phòng khám ban đầu nhận kết luận, nghe tư vấn phác đồ và nhận đơn thuốc điện tử." },
          { step: 5, title: "Thanh toán viện phí chênh lệch & Nhận thuốc", content: "Đến Quầy Dược BHYT Tầng 1 thanh toán đồng chi trả và nhận thuốc kèm hướng dẫn sử dụng." }
        ],
        updatedAt: "2026-09-18",
        status: "published"
      },
      {
        id: "gui-2",
        facilityId: "fac-1",
        title: "Hướng dẫn Chuẩn bị trước khi Chụp MRI & Nội soi tiêu hóa",
        category: "Chuẩn bị cận lâm sàng",
        targetAudience: "Bệnh nhân có chỉ định Chụp cộng hưởng từ hoặc Nội soi",
        estimatedTime: "2 - 4 giờ trước khi khám",
        steps: [
          { step: 1, title: "Tuân thủ chế độ nhịn ăn", content: "Nhịn ăn hoàn toàn tối thiểu 6 tiếng trước giờ chụp/nội soi. Có thể uống vài ngụm nước lọc trước 2 tiếng." },
          { step: 2, title: "Tháo tư trang kim loại", content: "Tháo trang sức, kính mắt, răng giả tháo lắp, đồng hồ và thay trang phục chuyên dụng của bệnh viện." },
          { step: 3, title: "Khai báo tiền sử bệnh lý", content: "Khai báo rõ với điều dưỡng nếu có van tim nhân tạo, máy tạo nhịp, dị ứng thuốc gây mê hoặc thuốc cản quang." },
          { step: 4, title: "Sau khi thực hiện", content: "Nghỉ ngơi tại phòng theo dõi 15-30 phút sau gây mê trước khi ra về hoặc tiếp tục nhận kết quả." }
        ],
        updatedAt: "2026-08-25",
        status: "published"
      }
    ],

    categories: [
      { id: "cat-1", name: "Chẩn đoán hình ảnh", code: "IMG", icon: "scan", description: "MRI, CT-Scanner, X-Quang, Siêu âm màu 4D", count: 18, color: "emerald" },
      { id: "cat-2", name: "Tim mạch & Mạch máu", code: "CARD", icon: "heart-pulse", description: "Khám tim, đo điện tâm đồ, holter huyết áp", count: 14, color: "rose" },
      { id: "cat-3", name: "Tiêu hóa & Gan mật", code: "GI", icon: "activity", description: "Nội soi dạ dày, đại tràng không đau, tầm soát HP", count: 12, color: "amber" },
      { id: "cat-4", name: "Khám tổng quát & Tầm soát", code: "GEN", icon: "shield-check", description: "Gói khám sức khỏe định kỳ, tầm soát ung thư", count: 24, color: "blue" },
      { id: "cat-5", name: "Cơ xương khớp", code: "ORTHO", icon: "bone", description: "Điều trị thoái hóa cột sống, thoát vị đĩa đệm", count: 9, color: "indigo" },
      { id: "cat-6", name: "Sản - Phụ khoa", code: "OBGYN", icon: "baby", description: "Quản lý thai kỳ, sinh trọn gói, khám phụ khoa", count: 11, color: "pink" },
      { id: "cat-7", name: "Nhi khoa & Tiêm chủng", code: "PEDI", icon: "smile", description: "Khám nhi tổng quát, tư vấn dinh dưỡng, vaccine", count: 15, color: "cyan" },
      { id: "cat-8", name: "Tai Mũi Họng & Mắt", code: "ENT", icon: "eye", description: "Nội soi TMH ống mềm, đo thị lực, phẫu thuật Lasik", count: 8, color: "teal" }
    ],

    reviewQueue: [
      {
        id: "rev-101",
        facilityId: "fac-1",
        facilityName: "BV Đa khoa Tâm Anh",
        type: "service",
        title: "Cập nhật Gói Khám Tầm soát Đột quỵ Não Chuyên sâu 2026",
        submittedBy: "BS. Trần Văn Hùng (Trưởng khoa CĐHA)",
        submittedAt: "2026-10-05 14:30",
        priority: "high",
        status: "pending",
        changeType: "update",
        diffSummary: "Bổ sung kỹ thuật chụp mạch MRA 3.0T và điều chỉnh giá từ 3.200.000đ thành 3.500.000đ",
        originalData: { price: "3.200.000đ", duration: "30 phút" },
        newData: { price: "3.500.000đ", duration: "45 phút", notes: "Kèm tư vấn dinh dưỡng sau khám" },
        aiCheck: {
          flag: "warning",
          message: "Giá dịch vụ tăng 9.3% so với phiên bản trước. Cần xác thực văn bản phê duyệt giá từ CSYT."
        }
      },
      {
        id: "rev-102",
        facilityId: "fac-2",
        facilityName: "Bệnh viện Bạch Mai",
        type: "guidance",
        title: "Quy trình Cấp cứu Can thiệp Mạch vành Cấp 24/7",
        submittedBy: "ThS. Lê Hoàng Nam",
        submittedAt: "2026-10-06 09:15",
        priority: "urgent",
        status: "pending",
        changeType: "create",
        diffSummary: "Tạo mới quy trình tiếp nhận khẩn cấp bệnh nhân nhồi máu cơ tim cấp qua đường dây nóng",
        originalData: null,
        newData: { hotline: "1900 8888", timeWindow: "< 60 phút cửa - bóng" },
        aiCheck: {
          flag: "good",
          message: "Quy trình chuẩn hóa cao, định dạng rõ ràng, phù hợp tiêu chuẩn BYT."
        }
      },
      {
        id: "rev-103",
        facilityId: "fac-3",
        facilityName: "BV ĐHYD TP.HCM",
        type: "service",
        title: "Dịch vụ Đặt hẹn Khám Chuyên gia Online qua VNeID",
        submittedBy: "Nguyễn Thị Mai (P. CNTT)",
        submittedAt: "2026-10-04 16:40",
        priority: "medium",
        status: "approved",
        changeType: "update",
        diffSummary: "Tích hợp cổng liên thông định danh điện tử mức độ 2 cho bệnh nhân tái khám",
        aiCheck: { flag: "good", message: "Khớp dữ liệu cổng dịch vụ công y tế quốc gia." }
      }
    ],

    checklists: [
      {
        id: "chk-1",
        serviceId: "srv-1",
        serviceName: "Chụp cộng hưởng từ sọ não (MRI Não)",
        items: [
          { id: "item-1", text: "Căn cước công dân gắn chip hoặc tài khoản VNeID mức 2", required: true, checked: true },
          { id: "item-2", text: "Thẻ Bảo hiểm Y tế gốc còn hạn sử dụng", required: true, checked: true },
          { id: "item-3", text: "Giấy chuyển tuyến đúng tuyến (nếu khám BHYT chuyển viện)", required: true, checked: false },
          { id: "item-4", text: "Kết quả X-Quang, CT, MRI hoặc đơn thuốc cũ đã dùng trong 3 tháng", required: false, checked: false },
          { id: "item-5", text: "Tháo bỏ trang sức kim loại, kẹp tóc, máy trợ thính trước khi vào phòng máy", required: true, checked: true },
          { id: "item-6", text: "Báo với bác sĩ nếu có que cấy ghép, khớp nhân tạo, máy tạo nhịp hoặc đang mang thai", required: true, checked: false }
        ]
      }
    ],

    auditLogs: [
      { id: "log-1", time: "10 phút trước", user: "Admin (Nguyễn Hoàng)", action: "Phê duyệt tài khoản", target: "BVĐK Tâm Anh - Xác thực Verified Badge" },
      { id: "log-2", time: "25 phút trước", user: "Reviewer (Trần Minh)", action: "Duyệt dịch vụ", target: "Dịch vụ Đặt hẹn Khám Chuyên gia Online" },
      { id: "log-3", time: "1 giờ trước", user: "Cơ sở y tế (Tâm Anh)", action: "Gửi yêu cầu duyệt", target: "Cập nhật Gói Khám Tầm soát Đột quỵ" },
      { id: "log-4", time: "3 giờ trước", user: "AI Assistant", action: "Cảnh báo độ mới", target: "Phát hiện 2 dịch vụ chưa cập nhật > 6 tháng" }
    ],

    stats: {
      totalSearches: 12480,
      activeServices: 24,
      avgRating: 4.9,
      pendingReviews: 8,
      monthlySearches: [
        { month: "T5", count: 4200, height: "45%" },
        { month: "T6", count: 6100, height: "65%" },
        { month: "T7", count: 8300, height: "80%" },
        { month: "T8", count: 6900, height: "70%" },
        { month: "T9", count: 10800, height: "92%" },
        { month: "T10", count: 12480, height: "100%" }
      ],
      topServices: [
        { name: "Chụp sọ não MRI", percent: 85, count: "3.840 lượt" },
        { name: "Khám tổng quát VIP", percent: 65, count: "2.950 lượt" },
        { name: "Nội soi tiêu hóa không đau", percent: 50, count: "2.110 lượt" },
        { name: "Siêu âm tim Doppler", percent: 40, count: "1.890 lượt" }
      ]
    }
  },

  // Khởi tạo Database nếu chưa có
  init() {
    for (const [key, value] of Object.entries(this.KEYS)) {
      const dbKey = key.toLowerCase();
      if (!localStorage.getItem(value)) {
        if (this.INITIAL_DATA[dbKey]) {
          localStorage.setItem(value, JSON.stringify(this.INITIAL_DATA[dbKey]));
        }
      }
    }
  },

  // Getter & Setter tổng quát
  get(keyName) {
    const storageKey = this.KEYS[keyName.toUpperCase()];
    if (!storageKey) return [];
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : (this.INITIAL_DATA[keyName.toLowerCase()] || []);
    } catch (e) {
      console.error("Lỗi đọc LocalStorage", e);
      return this.INITIAL_DATA[keyName.toLowerCase()] || [];
    }
  },

  set(keyName, data) {
    const storageKey = this.KEYS[keyName.toUpperCase()];
    if (!storageKey) return false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Lỗi ghi LocalStorage", e);
      return false;
    }
  },

  resetAll() {
    for (const [key, value] of Object.entries(this.KEYS)) {
      const dbKey = key.toLowerCase();
      if (this.INITIAL_DATA[dbKey]) {
        localStorage.setItem(value, JSON.stringify(this.INITIAL_DATA[dbKey]));
      }
    }
  },

  // ===== CÁC THAO TÁC CRUD NGHIỆP VỤ =====

  // 1. Dịch vụ (Services)
  getServices(facilityId = null) {
    const list = this.get('SERVICES');
    if (facilityId) {
      return list.filter(s => s.facilityId === facilityId);
    }
    return list;
  },

  getServiceById(id) {
    return this.getServices().find(s => s.id === id) || null;
  },

  saveService(serviceData) {
    const list = this.getServices();
    if (serviceData.id) {
      const index = list.findIndex(s => s.id === serviceData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...serviceData, lastUpdated: new Date().toISOString().split('T')[0] };
      } else {
        list.unshift(serviceData);
      }
    } else {
      serviceData.id = 'srv-' + Date.now();
      serviceData.lastUpdated = new Date().toISOString().split('T')[0];
      serviceData.searches = 0;
      serviceData.verified = false;
      list.unshift(serviceData);
    }
    this.set('SERVICES', list);
    return serviceData;
  },

  deleteService(id) {
    let list = this.getServices();
    list = list.filter(s => s.id !== id);
    this.set('SERVICES', list);
    return true;
  },

  // 2. Cơ sở y tế (Facilities)
  getFacilities() {
    return this.get('FACILITIES');
  },

  getFacilityById(id) {
    return this.getFacilities().find(f => f.id === id) || null;
  },

  saveFacility(facilityData) {
    const list = this.getFacilities();
    if (facilityData.id) {
      const idx = list.findIndex(f => f.id === facilityData.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...facilityData };
    } else {
      facilityData.id = 'fac-' + Date.now();
      facilityData.rating = 5.0;
      facilityData.reviewCount = 1;
      list.unshift(facilityData);
    }
    this.set('FACILITIES', list);
    return facilityData;
  },

  // 3. Quy trình hướng dẫn (Guidances)
  getGuidances(facilityId = null) {
    const list = this.get('GUIDANCES');
    if (facilityId) return list.filter(g => g.facilityId === facilityId);
    return list;
  },

  saveGuidance(data) {
    const list = this.getGuidances();
    if (data.id) {
      const idx = list.findIndex(g => g.id === data.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      data.id = 'gui-' + Date.now();
      data.updatedAt = new Date().toISOString().split('T')[0];
      list.unshift(data);
    }
    this.set('GUIDANCES', list);
    return data;
  },

  deleteGuidance(id) {
    let list = this.getGuidances();
    list = list.filter(g => g.id !== id);
    this.set('GUIDANCES', list);
    return true;
  },

  // 4. Hàng chờ duyệt (Review Queue)
  getReviewQueue() {
    return this.get('REVIEW_QUEUE');
  },

  updateReviewStatus(id, newStatus, feedbackText = '') {
    const queue = this.getReviewQueue();
    const item = queue.find(q => q.id === id);
    if (item) {
      item.status = newStatus;
      item.reviewerFeedback = feedbackText;
      item.reviewedAt = new Date().toLocaleString('vi-VN');
      this.set('REVIEW_QUEUE', queue);

      // Thêm log
      this.addAuditLog('Biên tập viên', `${newStatus === 'approved' ? 'Phê duyệt' : 'Từ chối'} nội dung`, item.title);
      return true;
    }
    return false;
  },

  // 5. Taxonomy & Categories
  getCategories() {
    return this.get('CATEGORIES');
  },

  saveCategory(cat) {
    const list = this.getCategories();
    if (cat.id) {
      const idx = list.findIndex(c => c.id === cat.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...cat };
    } else {
      cat.id = 'cat-' + Date.now();
      cat.count = 0;
      list.unshift(cat);
    }
    this.set('CATEGORIES', list);
    return cat;
  },

  deleteCategory(id) {
    let list = this.getCategories();
    list = list.filter(c => c.id !== id);
    this.set('CATEGORIES', list);
    return true;
  },

  // 6. Audit Logs
  getAuditLogs() {
    return this.get('AUDIT_LOGS');
  },

  addAuditLog(user, action, target) {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: 'log-' + Date.now(),
      time: 'Vừa xong',
      user,
      action,
      target
    });
    this.set('AUDIT_LOGS', logs.slice(0, 30));
  },

  // ===== MÔ PHỎNG 3 TÍNH NĂNG AI THEO YÊU CẦU ĐỀ TÀI =====

  /**
   * AI-1: Care Information Router
   * Phân tích triệu chứng / từ khóa, đề xuất dịch vụ, chuyên khoa và CSYT kèm giải thích
   */
  async runAIRouter(queryText) {
    // Giả lập độ trễ AI xử lý 600ms
    await new Promise(res => setTimeout(res, 600));

    const lower = queryText.toLowerCase().trim();
    if (!lower) {
      return {
        success: false,
        error: "Vui lòng nhập triệu chứng, bộ phận khó chịu hoặc dịch vụ bạn muốn khám."
      };
    }

    // Từ điển phân tích triệu chứng
    const rules = [
      {
        keywords: ["đau đầu", "chóng mặt", "mất ngủ", "sọ não", "mri", "tai biến", "đột quỵ", "tê bì"],
        category: "Chẩn đoán hình ảnh",
        recommendedServiceId: "srv-1",
        confidence: "96%",
        reason: "Các triệu chứng đau đầu kéo dài kèm chóng mặt hoặc nguy cơ mạch máu não thường cần khảo sát hình ảnh học sọ não không xâm lấn (MRI 3.0T) để tầm soát dị dạng mạch, u não hoặc thiếu máu não cục bộ.",
        disclaimer: "Kết quả này chỉ mang tính chất định hướng dịch vụ khám và điều phối tiếp nhận, không thay thế chẩn đoán bệnh của bác sĩ chuyên khoa."
      },
      {
        keywords: ["đau bụng", "ợ chua", "đầy hơi", "dạ dày", "đại tràng", "nội soi", "tiêu hóa", "buồn nôn"],
        category: "Tiêu hóa & Gan mật",
        recommendedServiceId: "srv-3",
        confidence: "94%",
        reason: "Biểu hiện đau vùng thượng vị, ợ hơi, khó tiêu chỉ ra các vấn đề liên quan đến niêm mạc dạ dày hoặc tá tràng. Nội soi tiêu hóa không đau là phương pháp vàng giúp quan sát trực tiếp tổn thương.",
        disclaimer: "Vui lòng tuân thủ hướng dẫn nhịn ăn 6-8 tiếng trước khi thực hiện nội soi."
      },
      {
        keywords: ["tức ngực", "khó thở", "hồi hộp", "tim đập nhanh", "huyết áp", "tim mạch", "điện tim"],
        category: "Tim mạch & Mạch máu",
        recommendedServiceId: "srv-4",
        confidence: "98%",
        reason: "Cảm giác đau thắt ngực hoặc hồi hộp là dấu hiệu cảnh báo bệnh lý mạch vành hoặc van tim. Cần ưu tiên khám tim mạch và siêu âm tim Doppler màu để đánh giá huyết động học sớm.",
        disclaimer: "Nếu có cơn đau thắt ngực lan ra cánh tay trái dữ dội, hãy đến phòng Cấp cứu gần nhất ngay lập tức."
      },
      {
        keywords: ["đau lưng", "mỏi gối", "cột sống", "xương khớp", "khớp gối", "thoái hóa", "tê chân"],
        category: "Cơ xương khớp",
        recommendedServiceId: "srv-5",
        confidence: "91%",
        reason: "Đau mỏi cột sống thắt lưng lan chân là dấu hiệu điển hình của thoái hóa đốt sống hoặc chèn ép rễ thần kinh. Khám chuyên khoa Cơ Xương Khớp kết hợp chụp cộng hưởng từ giúp định vị chính xác vị trí thoát vị.",
        disclaimer: "Tránh vận động mạnh hoặc mang vác vật nặng trong thời gian chờ khám."
      },
      {
        keywords: ["tổng quát", "kiểm tra sức khỏe", "định kỳ", "xét nghiệm máu", "tầm soát"],
        category: "Khám tổng quát & Tầm soát",
        recommendedServiceId: "srv-2",
        confidence: "95%",
        reason: "Gói khám tổng quát VIP giúp đánh giá đồng thời chức năng gan, thận, tim phổi, đường huyết và tầm soát sớm các yếu tố nguy cơ tim mạch - ung thư.",
        disclaimer: "Nên thực hiện lấy máu xét nghiệm vào buổi sáng khi chưa ăn uống."
      }
    ];

    // Tìm rule khớp nhất
    let matched = null;
    for (const rule of rules) {
      if (rule.keywords.some(kw => lower.includes(kw))) {
        matched = rule;
        break;
      }
    }

    if (!matched) {
      // Fallback AI thông minh
      matched = {
        keywords: ["mặc định"],
        category: "Khám tổng quát & Tầm soát",
        recommendedServiceId: "srv-2",
        confidence: "78%",
        reason: `Dựa trên mô tả "${queryText}", hệ thống đề xuất bạn nên bắt đầu bằng Khám lâm sàng Tổng quát để bác sĩ khám ban đầu và chỉ định chuyên khoa thích hợp.`,
        disclaimer: "Định hướng thông tin khám bệnh CareRoute nhằm hỗ trợ bạn chuẩn bị hồ sơ đầy đủ."
      };
    }

    const service = this.getServiceById(matched.recommendedServiceId) || this.getServices()[0];
    const facility = this.getFacilityById(service.facilityId) || this.getFacilities()[0];

    return {
      success: true,
      data: {
        category: matched.category,
        confidence: matched.confidence,
        reason: matched.reason,
        disclaimer: matched.disclaimer,
        recommendedService: service,
        recommendedFacility: facility
      }
    };
  },

  /**
   * AI-2: Checklist Generator
   * Tự động sinh danh sách chuẩn bị (giấy tờ, thủ tục, chuẩn bị cơ thể) dựa trên dịch vụ
   */
  async generateChecklistAI(serviceId, patientType = 'bhyt') {
    await new Promise(res => setTimeout(res, 500));

    const service = this.getServiceById(serviceId) || this.getServices()[0];
    const items = [
      { id: 'c-1', text: 'Căn cước công dân gắn chip (hoặc VNeID định danh điện tử mức 2)', category: 'Giấy tờ tùy thân', required: true, checked: true },
      { id: 'c-2', text: patientType === 'bhyt' ? 'Thẻ BHYT còn hạn hoặc hình ảnh thẻ trên ứng dụng VssID' : 'Thẻ Bảo hiểm sức khỏe tư nhân / Thẻ bảo lãnh viện phí', category: 'Bảo hiểm & Chi phí', required: true, checked: true },
      { id: 'c-3', text: 'Sổ khám bệnh, đơn thuốc cũ hoặc kết quả xét nghiệm/X-quang trong 6 tháng gần nhất', category: 'Hồ sơ y tế', required: false, checked: false }
    ];

    // Thêm các yêu cầu chuyên biệt theo dịch vụ
    if (service.name.toLowerCase().includes('mri') || service.name.toLowerCase().includes('cộng hưởng từ')) {
      items.push(
        { id: 'c-4', text: 'Tháo toàn bộ trang sức kim loại, kẹp tóc, máy trợ thính trước khi chụp', category: 'Chuẩn bị phòng máy', required: true, checked: false },
        { id: 'c-5', text: 'Thông báo với bác sĩ nếu có que cấy ghép kim loại, stent mạch vành hoặc van tim nhân tạo', category: 'An toàn y khoa', required: true, checked: false }
      );
    } else if (service.name.toLowerCase().includes('nội soi')) {
      items.push(
        { id: 'c-4', text: 'Nhịn ăn uống hoàn toàn ít nhất 6 tiếng trước giờ nội soi', category: 'Chuẩn bị cơ thể', required: true, checked: false },
        { id: 'c-5', text: 'Cần có người nhà đi cùng hỗ trợ sau khi gây mê / tiền mê', category: 'Hỗ trợ bệnh nhân', required: true, checked: false }
      );
    } else if (service.name.toLowerCase().includes('tổng quát') || service.name.toLowerCase().includes('xét nghiệm')) {
      items.push(
        { id: 'c-4', text: 'Nhịn ăn sáng và không uống các loại nước ngọt, sữa, cà phê trước khi lấy máu', category: 'Chuẩn bị xét nghiệm', required: true, checked: false },
        { id: 'c-5', text: 'Uống nước lọc và nhịn tiểu khoảng 30 phút trước khi siêu âm ổ bụng', category: 'Chuẩn bị siêu âm', required: false, checked: false }
      );
    } else {
      items.push(
        { id: 'c-4', text: 'Ghi chú lại các triệu chứng xuất hiện nhiều nhất và thời điểm khởi phát', category: 'Trao đổi bác sĩ', required: false, checked: false }
      );
    }

    return {
      serviceName: service.name,
      facilityName: service.facilityName,
      items,
      aiNote: "Checklist được tạo tự động bởi AI-2 dựa trên quy chuẩn an toàn tiếp nhận của cơ sở y tế."
    };
  },

  /**
   * AI-3: Freshness Assistant
   * Quét và phát hiện các bài viết, dịch vụ, quy trình cũ quá 6 tháng hoặc có dấu hiệu lỗi thời
   */
  async scanFreshnessAI() {
    await new Promise(res => setTimeout(res, 700));

    const services = this.getServices();
    const currentDate = new Date('2026-10-06');
    const results = [];

    services.forEach(srv => {
      const updateDate = new Date(srv.lastUpdated);
      const diffMonths = Math.floor((currentDate - updateDate) / (1000 * 60 * 60 * 24 * 30));

      let riskLevel = 'fresh';
      let aiAdvice = 'Nội dung cập nhật gần đây, thông tin chính xác.';
      let score = 95;

      if (diffMonths >= 10) {
        riskLevel = 'critical';
        score = 42;
        aiAdvice = `Đã hơn ${diffMonths} tháng chưa được cơ sở y tế rà soát. Nguy cơ giá dịch vụ, lịch trực và chỉ định đã thay đổi. Cần gửi thông báo yêu cầu cập nhật ngay.`;
      } else if (diffMonths >= 5) {
        riskLevel = 'warning';
        score = 68;
        aiAdvice = `Đã ${diffMonths} tháng kể từ lần sửa đổi cuối. Đề xuất gửi thư nhắc nhở CSYT xác nhận lại quy trình.`;
      }

      results.push({
        id: srv.id,
        title: srv.name,
        facilityName: srv.facilityName,
        category: srv.category,
        lastUpdated: srv.lastUpdated,
        diffMonths,
        riskLevel,
        score,
        aiAdvice
      });
    });

    // Sắp xếp các mục nguy cơ cao lên đầu
    results.sort((a, b) => a.score - b.score);

    return {
      totalScanned: results.length,
      outdatedCount: results.filter(r => r.riskLevel === 'critical').length,
      warningCount: results.filter(r => r.riskLevel === 'warning').length,
      items: results
    };
  }
};

// Tự động khởi tạo kho dữ liệu khi nạp script
CareRouteDB.init();

// Xuất ra window
window.CareRouteDB = CareRouteDB;
