(() => {
  const authForm = document.getElementById("authForm");
  if (!authForm) return;

  const formTitle = document.getElementById("formTitle");
  const formSubtitle = document.getElementById("formSubtitle");
  const submitButton = document.getElementById("submitButton");
  const switchMode = document.getElementById("switchMode");
  const formStatus = document.getElementById("formStatus");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.getElementById("passwordToggle");
  const rememberEmail = document.getElementById("rememberEmail");
  const forgotDialog = document.getElementById("forgotDialog");
  const toast = document.getElementById("toast");
  let isRegistering = false;
  let toastTimer;

  function showToast(title, message) {
    document.getElementById("toastTitle").textContent = title;
    document.getElementById("toastMessage").textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3400);
  }

  function setMode(registering) {
    isRegistering = registering;
    formStatus.textContent = "";
    formStatus.classList.remove("success");
    formTitle.textContent = registering ? "Tạo tài khoản CareRoute" : "Chào mừng bạn trở lại";
    formSubtitle.textContent = registering
      ? "Tạo tài khoản để bắt đầu sử dụng CareRoute."
      : "Chọn vai trò và đăng nhập để tiếp tục.";
    submitButton.textContent = registering ? "Tạo tài khoản" : "Đăng nhập";
    switchMode.innerHTML = registering
      ? 'Đã có tài khoản? <a href="#login" id="loginLink">Đăng nhập ngay</a>'
      : 'Chưa có tài khoản? <a href="#register" id="registerLink">Đăng ký ngay</a>';
    passwordInput.autocomplete = registering ? "new-password" : "current-password";
  }

  function showFormMessage(message, isSuccess = false) {
    formStatus.textContent = message;
    formStatus.classList.toggle("success", isSuccess);
  }

  document.querySelectorAll('input[name="role"]').forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll(".role-option").forEach((option) => {
        option.classList.toggle("selected", option.contains(input) && input.checked);
      });
      formStatus.textContent = "";
    });
  });

  const requestedRole = new URLSearchParams(window.location.search).get("role");
  if (requestedRole) {
    const roleInput = [...authForm.querySelectorAll('input[name="role"]')]
      .find((input) => input.value === requestedRole);
    if (roleInput) {
      roleInput.checked = true;
      roleInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  switchMode.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    event.preventDefault();
    setMode(!isRegistering);
  });

  document.getElementById("headerRegister").addEventListener("click", (event) => {
    event.preventDefault();
    setMode(true);
    document.getElementById("loginCard").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.getElementById("headerLogin").addEventListener("click", (event) => {
    event.preventDefault();
    setMode(false);
    document.getElementById("loginCard").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  passwordToggle.addEventListener("click", () => {
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    passwordToggle.setAttribute("aria-label", shouldShow ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    passwordToggle.title = shouldShow ? "Ẩn mật khẩu" : "Hiện mật khẩu";
  });

  rememberEmail.addEventListener("change", () => {
    try {
      if (rememberEmail.checked && emailInput.value.trim()) {
        localStorage.setItem("careroute-remembered-email", emailInput.value.trim());
      } else {
        localStorage.removeItem("careroute-remembered-email");
      }
    } catch (error) {
      console.error("Không thể lưu tùy chọn ghi nhớ email:", error);
      showFormMessage("Trình duyệt không cho phép lưu tùy chọn ghi nhớ email.");
    }
  });

  emailInput.addEventListener("input", () => {
    if (!rememberEmail.checked) return;
    try {
      if (emailInput.value.trim()) {
        localStorage.setItem("careroute-remembered-email", emailInput.value.trim());
      } else {
        localStorage.removeItem("careroute-remembered-email");
      }
    } catch (error) {
      console.error("Không thể cập nhật email đã ghi nhớ:", error);
      rememberEmail.checked = false;
      showFormMessage("Không thể lưu email trong trình duyệt này.");
    }
  });

  try {
    const savedEmail = localStorage.getItem("careroute-remembered-email");
    if (savedEmail) {
      emailInput.value = savedEmail;
      rememberEmail.checked = true;
    }
  } catch (error) {
    console.error("Không thể khôi phục email đã ghi nhớ:", error);
  }

  authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!emailInput.value.trim()) {
      emailInput.setCustomValidity("Vui lòng nhập email hoặc số điện thoại.");
      emailInput.reportValidity();
      emailInput.setCustomValidity("");
      emailInput.focus();
      return;
    }
    if (!passwordInput.value) {
      passwordInput.setCustomValidity("Vui lòng nhập mật khẩu.");
      passwordInput.reportValidity();
      passwordInput.setCustomValidity("");
      passwordInput.focus();
      return;
    }
    if (isRegistering) {
      showFormMessage("Giao diện đăng ký đã sẵn sàng; cần kết nối dịch vụ tài khoản để tạo tài khoản thật.");
      return;
    }
    const selectedRole = authForm.querySelector('input[name="role"]:checked');
    const roleNames = {
      citizen: "Người dân",
      facility: "Cơ sở y tế",
      reviewer: "Kiểm duyệt viên",
      admin: "Quản trị viên"
    };
    const destinations = {
      citizen: "citizen-care-search.html",
      facility: "facility-dashboard.html",
      reviewer: "reviewer-review-queue.html",
      admin: "admin-dashboard.html"
    };
    const destination = destinations[selectedRole.value];
    if (!destination) {
      showFormMessage("Vui lòng chọn một vai trò hợp lệ.");
      return;
    }
    const identifier = emailInput.value.trim();
    const displayName = identifier.includes("@") ? identifier.split("@")[0] : `Khách hàng ${identifier.slice(-4)}`;
    const demoUser = {
      name: displayName,
      email: identifier,
      role: selectedRole.value === "citizen" ? "user" : selectedRole.value,
      roleName: roleNames[selectedRole.value],
      letters: displayName.slice(0, 2).toLocaleUpperCase("vi")
    };
    try {
      localStorage.setItem("careroute_user", JSON.stringify(demoUser));
    } catch (error) {
      console.error("Không thể lưu phiên đăng nhập demo:", error);
      showFormMessage("Không thể lưu phiên đăng nhập trong trình duyệt này. Hãy kiểm tra cài đặt bộ nhớ rồi thử lại.");
      return;
    }
    showFormMessage(`Đăng nhập demo với vai trò ${roleNames[selectedRole.value]}. Đang mở giao diện...`, true);
    submitButton.disabled = true;
    document.body.classList.add("page-leaving");
    window.setTimeout(() => window.location.assign(destination), 180);
  });

  document.getElementById("forgotLink").addEventListener("click", (event) => {
    event.preventDefault();
    const recoveryEmail = document.getElementById("recoveryEmail");
    recoveryEmail.value = emailInput.value.includes("@") ? emailInput.value.trim() : "";
    forgotDialog.showModal();
    recoveryEmail.focus();
  });
  document.getElementById("closeForgot").addEventListener("click", () => forgotDialog.close());
  document.getElementById("forgotForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const address = document.getElementById("recoveryEmail").value;
    forgotDialog.close();
    showToast("Chế độ bản demo", `Chức năng gửi email khôi phục cho ${address} chưa được kết nối.`);
  });
  forgotDialog.addEventListener("click", (event) => {
    if (event.target === forgotDialog) forgotDialog.close();
  });

  document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("siteSearch").value.trim();
    if (query) showToast("Tìm kiếm bản demo", `Đã nhận từ khóa “${query}”. Hãy đăng nhập để tiếp tục tra cứu.`);
  });

  document.querySelectorAll("[data-notice]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Thông tin", link.dataset.notice);
    });
  });
})();

(() => {
  const searchForm = document.querySelector(".error-content #searchForm");
  if (!searchForm) return;

  const toast = document.getElementById("toast");
  let toastTimer;

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("siteSearch").value.trim();
    if (!query) {
      document.getElementById("siteSearch").focus();
      return;
    }
    document.getElementById("toastTitle").textContent = "Chưa thể tìm thấy trang";
    document.getElementById("toastMessage").textContent = `Từ khóa “${query}” đã được ghi nhận. Hãy quay về trang chủ để tiếp tục tra cứu.`;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3500);
  });
})();