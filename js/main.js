/**
 * CareRoute - Main UI & Global Interaction Controller
 * Hệ thống điều phối giao diện, chuyển đổi vai trò, thông báo Toast, Modal và Header/Sidebar
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo Lucide Icons nếu có thư viện
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Gắn Thanh điều hướng nhanh vai trò (Role Switcher Floating Widget)
  renderRoleSwitcher();

  // 3. Xử lý Sidebar Toggle trên mobile/tablet
  initMobileSidebar();

  // 4. Highlight Menu hiện tại
  highlightActiveMenu();
});

/**
 * Hiển thị thông báo Toast đẹp mắt
 */
function showToast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('careroute-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'careroute-toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-4 opacity-0`;

  let bgClass = 'bg-white text-slate-800 border-slate-200';
  let iconHtml = '<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 shrink-0"></i>';

  if (type === 'success') {
    bgClass = 'bg-emerald-900/90 text-white border-emerald-700/50 shadow-emerald-950/20';
    iconHtml = '<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 shrink-0"></i>';
  } else if (type === 'warning') {
    bgClass = 'bg-amber-900/90 text-white border-amber-700/50 shadow-amber-950/20';
    iconHtml = '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400 shrink-0"></i>';
  } else if (type === 'error') {
    bgClass = 'bg-rose-900/90 text-white border-rose-700/50 shadow-rose-950/20';
    iconHtml = '<i data-lucide="x-circle" class="w-5 h-5 text-rose-400 shrink-0"></i>';
  } else if (type === 'info') {
    bgClass = 'bg-slate-900/90 text-white border-slate-700/50 shadow-slate-950/20';
    iconHtml = '<i data-lucide="info" class="w-5 h-5 text-teal-400 shrink-0"></i>';
  }

  toast.className += ` ${bgClass}`;
  toast.innerHTML = `
    ${iconHtml}
    <div class="flex-1 leading-snug">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-white/60 hover:text-white p-1 ml-1 rounded-lg">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Điều khiển Modal mở / đóng
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
}

/**
 * Thanh chuyển đổi vai trò (Role Switcher) nhanh
 */
function renderRoleSwitcher() {
  if (document.getElementById('role-switcher-btn')) return;

  const currentPath = window.location.pathname;

  const widget = document.createElement('div');
  widget.id = 'role-switcher-container';
  widget.className = 'fixed bottom-6 left-6 z-50';

  widget.innerHTML = `
    <div class="relative group">
      <!-- Main Trigger Button -->
      <button id="role-switcher-btn" class="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 text-white hover:bg-slate-900 rounded-full shadow-2xl border border-slate-700/60 backdrop-blur-md text-xs font-semibold tracking-wide transition-all transform hover:scale-105">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Chuyển Vai Trò</span>
        <i data-lucide="chevron-up" class="w-3.5 h-3.5 transition-transform group-hover:-rotate-180"></i>
      </button>

      <!-- Dropdown Menu -->
      <div class="absolute bottom-full left-0 mb-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-2.5 hidden group-hover:block transition-all">
        <div class="px-3 py-2 border-b border-slate-100 mb-1.5 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Hệ thống CareRoute</span>
          <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">4 Vai Trò</span>
        </div>

        <div class="space-y-1">
          <!-- Hub -->
          <a href="../index.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
            <div class="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">🏠</div>
            <div class="flex-1">
              <p class="font-semibold text-slate-900">Trang Chủ Tổng Hợp</p>
              <p class="text-[10px] text-slate-500">Cổng kết nối toàn bộ hệ thống</p>
            </div>
          </a>

          <!-- Role 1: Citizen -->
          <div class="pt-1 border-t border-slate-100">
            <p class="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">1. Người Dân (Citizen)</p>
            <a href="citizen-care-search.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
              <i data-lucide="search" class="w-4 h-4 text-emerald-600"></i> Tra cứu & AI-1 Router
            </a>
            <a href="citizen-care-detail.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
              <i data-lucide="building-2" class="w-4 h-4 text-emerald-600"></i> Chi tiết cơ sở & dịch vụ
            </a>
            <a href="citizen-care-checklist.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
              <i data-lucide="check-square" class="w-4 h-4 text-emerald-600"></i> AI-2 Lập Checklist chuẩn bị
            </a>
          </div>

          <!-- Role 2: Facility -->
          <div class="pt-1 border-t border-slate-100">
            <p class="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">2. Cơ Sở Y Tế (Facility)</p>
            <a href="facility-dashboard.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              <i data-lucide="layout-dashboard" class="w-4 h-4 text-teal-600"></i> Bảng điều khiển CSYT
            </a>
            <a href="facility-service-management.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              <i data-lucide="stethoscope" class="w-4 h-4 text-teal-600"></i> Quản lý dịch vụ (CRUD)
            </a>
            <a href="facility-guidance-management.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700">
              <i data-lucide="map" class="w-4 h-4 text-teal-600"></i> Quy trình hướng dẫn khám
            </a>
          </div>

          <!-- Role 3: Reviewer -->
          <div class="pt-1 border-t border-slate-100">
            <p class="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">3. Biên Tập Viên (Reviewer)</p>
            <a href="reviewer-review-queue.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700">
              <i data-lucide="list-checks" class="w-4 h-4 text-amber-600"></i> Hàng chờ duyệt nội dung
            </a>
            <a href="reviewer-feedback-review.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700">
              <i data-lucide="message-square-diff" class="w-4 h-4 text-amber-600"></i> Đánh giá & Phản hồi
            </a>
            <a href="reviewer-freshness-monitor.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-600"></i> AI-3 Giám sát độ mới
            </a>
          </div>

          <!-- Role 4: Admin -->
          <div class="pt-1 border-t border-slate-100">
            <p class="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">4. Quản Trị Viên (Admin)</p>
            <a href="admin-dashboard.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              <i data-lucide="shield" class="w-4 h-4 text-blue-600"></i> Bảng điều khiển quản trị
            </a>
            <a href="admin-facility-management.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              <i data-lucide="building" class="w-4 h-4 text-blue-600"></i> Quản lý CSYT toàn quốc
            </a>
            <a href="admin-category-management.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              <i data-lucide="tags" class="w-4 h-4 text-blue-600"></i> Phân loại Taxonomy
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widget);
  if (window.lucide) window.lucide.createIcons();
}

/**
 * Highlight link điều hướng đang xem
 */
function highlightActiveMenu() {
  const currentFile = window.location.pathname.split('/').pop();
  if (!currentFile) return;

  const links = document.querySelectorAll('nav a, aside a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(currentFile)) {
      link.classList.add('bg-emerald-50', 'text-emerald-700', 'font-semibold');
    }
  });
}

/**
 * Mobile Sidebar Toggle
 */
function initMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggle') || document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('appSidebar') || document.querySelector('aside');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      sidebar.classList.toggle('translate-x-0');
    });
  }
}

// Global helper exports
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;

if (window.location.pathname.endsWith("/404.html")) {

    (() => {
      const searchForm = document.getElementById("searchForm");
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
}

if (window.location.pathname.endsWith("/admin-category-management.html")) {

      (() => {
        const storageKey = "careroute.admin.categories";
        const tree = document.querySelector("#category-tree");
        const form = document.querySelector("#category-form");
        const nameInput = document.querySelector("#category-name");
        const descriptionInput = document.querySelector("#category-description");
        const parentSelect = document.querySelector("#category-parent");
        const formHeading = document.querySelector("#form-heading");
        const saveButton = document.querySelector("#save-category-button");
        const formMessage = document.querySelector("#form-message");
        const toast = document.querySelector("#toast");
        let categories = [];
        let editingId = null;
        let toastTimer;

        function loadCategories(defaultCategories) {
          try {
            const saved = localStorage.getItem(storageKey);
            if (!saved) return defaultCategories;
            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed) || parsed.some((category) => !category.id || !category.name)) {
              throw new Error("Dữ liệu danh mục đã lưu không hợp lệ.");
            }
            return parsed;
          } catch (error) {
            console.error("Không thể tải danh mục đã lưu:", error);
            window.setTimeout(() => showToast("Không thể đọc dữ liệu đã lưu; đang dùng danh mục từ JSON."), 0);
            return defaultCategories;
          }
        }

        function persistCategories() {
          try {
            localStorage.setItem(storageKey, JSON.stringify(categories));
            return true;
          } catch (error) {
            console.error("Không thể lưu danh mục:", error);
            showToast("Không thể lưu dữ liệu trên thiết bị này.");
            return false;
          }
        }

        function escapeHtml(value) {
          return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          })[character]);
        }

        function childrenOf(parentId) {
          return categories.filter((category) => category.parentId === parentId);
        }

        function renderTree() {
          const roots = childrenOf(null);
          if (!roots.length) {
            tree.innerHTML = '<div class="empty-tree">Chưa có danh mục. Hãy tạo danh mục đầu tiên.</div>';
            return;
          }

          tree.innerHTML = roots.map((parent) => {
            const children = childrenOf(parent.id);
            const childRows = children.map((category) => `
              <div class="category-row child-row" data-category-id="${escapeHtml(category.id)}">
                <span class="nav-icon" aria-hidden="true">
                  <img src="../assets/icons/folder-open-svgrepo-com.svg" alt="" />
                </span>
                <span class="category-name">${escapeHtml(category.name)}</span>
                <span class="service-count">${category.serviceCount === undefined ? escapeHtml(category.status || "Không rõ trạng thái") : `${Number(category.serviceCount) || 0} dịch vụ`}</span>
                <span class="category-actions">
                  <button class="icon-button" type="button" data-action="edit" data-id="${escapeHtml(category.id)}" aria-label="Sửa ${escapeHtml(category.name)}" title="Chỉnh sửa">
                    <img src="../assets/icons/edit-square-svgrepo-com.svg" alt="" />
                  </button>
                  <button class="icon-button delete" type="button" data-action="delete" data-id="${escapeHtml(category.id)}" aria-label="Xóa ${escapeHtml(category.name)}" title="Xóa">
                    <img src="../assets/icons/delete-bin-line-svgrepo-com.svg" alt="" />
                  </button>
                </span>
              </div>`).join("");

            return `
              <div class="tree-group" data-group-id="${escapeHtml(parent.id)}">
                <div class="category-row parent-row" data-category-id="${escapeHtml(parent.id)}">
                  <button class="expand-button" type="button" data-action="toggle" data-id="${escapeHtml(parent.id)}" aria-label="Thu gọn ${escapeHtml(parent.name)}" aria-expanded="true">
                    <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
                  </button>
                  <span class="category-name">${escapeHtml(parent.name)}</span>
                  <span class="category-meta">${children.length} nhóm con · ${escapeHtml(parent.status || "Không rõ trạng thái")}</span>
                  <span class="category-actions">
                    <button class="icon-button" type="button" data-action="edit" data-id="${escapeHtml(parent.id)}" aria-label="Sửa ${escapeHtml(parent.name)}" title="Chỉnh sửa">
                      <img src="../assets/icons/edit-square-svgrepo-com.svg" alt="" />
                    </button>
                    <button class="icon-button delete" type="button" data-action="delete" data-id="${escapeHtml(parent.id)}" aria-label="Xóa ${escapeHtml(parent.name)}" title="Xóa">
                      <img src="../assets/icons/delete-bin-line-svgrepo-com.svg" alt="" />
                    </button>
                  </span>
                </div>
                <div class="child-list">${childRows || '<div class="empty-tree">Chưa có danh mục con</div>'}</div>
              </div>`;
          }).join("");
        }

        function renderParentOptions(selectedId = "") {
          const current = categories.find((category) => category.id === editingId);
          const availableParents = categories.filter((category) => category.parentId === null && category.id !== editingId);
          parentSelect.innerHTML = '<option value="">Không có (danh mục cha)</option>' +
            availableParents.map((category) =>
              `<option value="${escapeHtml(category.id)}"${category.id === selectedId ? " selected" : ""}>${escapeHtml(category.name)}</option>`
            ).join("");

          if (current && current.parentId && !availableParents.some((category) => category.id === current.parentId)) {
            parentSelect.value = "";
          }
        }

        function resetForm() {
          editingId = null;
          form.reset();
          formHeading.textContent = "Chi tiết Danh mục chỉnh sửa";
          saveButton.textContent = "Lưu Thay Đổi";
          formMessage.textContent = "";
          renderParentOptions();
        }

        function startCreate() {
          resetForm();
          formHeading.textContent = "Thêm danh mục mới";
          saveButton.textContent = "Tạo Danh Mục";
          nameInput.focus();
        }

        function startEdit(id) {
          const category = categories.find((item) => item.id === id);
          if (!category) return;
          editingId = id;
          formHeading.textContent = "Chi tiết Danh mục chỉnh sửa";
          saveButton.textContent = "Lưu Thay Đổi";
          nameInput.value = category.name;
          descriptionInput.value = category.description || "";
          renderParentOptions(category.parentId || "");
          formMessage.textContent = "";
        }

        function showToast(message) {
          toast.textContent = message;
          toast.hidden = false;
          window.clearTimeout(toastTimer);
          toastTimer = window.setTimeout(() => {
            toast.hidden = true;
          }, 2800);
        }

        function deleteCategory(id) {
          const category = categories.find((item) => item.id === id);
          if (!category) return;
          const descendants = childrenOf(id);
          const prompt = descendants.length
            ? `Xóa "${category.name}" và ${descendants.length} danh mục con?`
            : `Xóa danh mục "${category.name}"?`;
          if (!window.confirm(prompt)) return;

          categories = categories.filter((item) => item.id !== id && item.parentId !== id);
          if (!persistCategories()) return;
          renderTree();
          if (editingId === id || descendants.some((item) => item.id === editingId)) resetForm();
          showToast("Đã xóa danh mục.");
        }

        tree.addEventListener("click", (event) => {
          const button = event.target.closest("button[data-action]");
          if (!button) return;
          const { action, id } = button.dataset;
          if (action === "edit") startEdit(id);
          if (action === "delete") deleteCategory(id);
          if (action === "toggle") {
            const group = tree.querySelector(`[data-group-id="${CSS.escape(id)}"]`);
            const isCollapsed = group.classList.toggle("collapsed");
            button.setAttribute("aria-expanded", String(!isCollapsed));
            button.setAttribute("aria-label", `${isCollapsed ? "Mở rộng" : "Thu gọn"} ${categories.find((item) => item.id === id)?.name || "danh mục"}`);
          }
        });

        document.querySelector("#add-category-button").addEventListener("click", startCreate);
        document.querySelector("#cancel-edit-button").addEventListener("click", resetForm);

        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const name = nameInput.value.trim();
          if (!name) {
            formMessage.textContent = "Vui lòng nhập tên danh mục.";
            nameInput.focus();
            return;
          }

          const parentId = parentSelect.value || null;
          if (editingId && parentId && childrenOf(editingId).length) {
            formMessage.textContent = "Hãy chuyển hoặc xóa các danh mục con trước khi chuyển danh mục này.";
            parentSelect.focus();
            return;
          }

          const category = {
            id: editingId || `category-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name,
            description: descriptionInput.value.trim(),
            parentId,
            serviceCount: editingId ? Number(categories.find((item) => item.id === editingId)?.serviceCount) || 0 : 0
          };
          const previous = categories;
          categories = editingId
            ? categories.map((item) => item.id === editingId ? category : item)
            : [...categories, category];

          if (!persistCategories()) {
            categories = previous;
            return;
          }

          renderTree();
          resetForm();
          showToast(editingId ? "Đã cập nhật danh mục." : "Đã tạo danh mục.");
        });

        fetch("../assets/data/categories.json")
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
          })
          .then((data) => {
            if (!Array.isArray(data)) throw new Error("categories.json phải chứa một danh sách.");
            const categoriesFromJson = data.map((category) => ({
              id: category.id,
              name: category.name,
              description: category.description || "",
              parentId: null,
              status: category.status
            }));
            categoriesFromJson.forEach((category, index) => {
              const parentName = data[index].parent_category;
              const parent = categoriesFromJson.find((item) => item.name === parentName);
              category.parentId = parent ? parent.id : null;
            });
            categories = loadCategories(categoriesFromJson);
            renderTree();
            if (categories.length) startEdit(categories[0].id);
          })
          .catch((error) => {
            console.error("Không thể tải danh mục:", error);
            tree.textContent = "Không thể tải danh mục. Vui lòng thử tải lại trang.";
            showToast("Không thể tải danh mục.");
          });
      })();
}

if (window.location.pathname.endsWith("/admin-dashboard.html")) {

      (() => {
        const numberFormat = new Intl.NumberFormat("vi-VN");
        const regionList = document.getElementById("regionList");

        function fetchJson(path) {
          return fetch(path).then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
          });
        }

        Promise.all([
          fetchJson("../assets/data/facilities.json"),
          fetchJson("../assets/data/reviews.json")
        ])
          .then(([facilities, reviews]) => {
            if (!Array.isArray(facilities) || !Array.isArray(reviews)) {
              throw new Error("Tệp facilities.json và reviews.json phải chứa danh sách.");
            }

            document.getElementById("facilityTotal").textContent = numberFormat.format(facilities.length);
            document.getElementById("serviceTotal").textContent = numberFormat.format(
              facilities.reduce((total, facility) => total + (Number(facility.services_count) || 0), 0)
            );
            document.getElementById("reviewTotal").textContent = numberFormat.format(reviews.length);

            const countsByRegion = facilities.reduce((counts, facility) => {
              counts.set(facility.location, (counts.get(facility.location) || 0) + 1);
              return counts;
            }, new Map());
            const totalFacilities = facilities.length;
            const regionRows = [...countsByRegion.entries()].map(([region, count]) => {
              const percentage = totalFacilities ? Math.round(count / totalFacilities * 100) : 0;
              const row = document.createElement("div");
              row.className = "region-row";
              const heading = document.createElement("div");
              heading.className = "region-heading";
              const name = document.createElement("span");
              name.className = "region-name";
              name.textContent = region;
              const value = document.createElement("span");
              value.className = "region-value";
              value.textContent = `${count} cơ sở (${percentage}%)`;
              heading.append(name, value);
              const track = document.createElement("div");
              track.className = "region-track";
              track.setAttribute("role", "img");
              track.setAttribute("aria-label", `${percentage} phần trăm`);
              const fill = document.createElement("div");
              fill.className = "region-fill";
              fill.style.width = `${percentage}%`;
              track.append(fill);
              row.append(heading, track);
              return row;
            });
            regionList.replaceChildren(...regionRows);
            if (!regionRows.length) regionList.textContent = "Chưa có dữ liệu khu vực.";
          })
          .catch((error) => {
            console.error("Không thể tải dữ liệu bảng điều khiển:", error);
            document.getElementById("facilityTotal").textContent = "Lỗi tải dữ liệu";
            document.getElementById("serviceTotal").textContent = "Lỗi tải dữ liệu";
            document.getElementById("reviewTotal").textContent = "Lỗi tải dữ liệu";
            regionList.textContent = "Không thể tải dữ liệu khu vực.";
          });
      })();
}

if (window.location.pathname.endsWith("/admin-facility-management.html")) {

      let facilities = [];
      let loadError = false;
      const pageSize = 4;
      let currentPage = 1;
      const rows = document.querySelector("#facility-rows");
      const searchInput = document.querySelector("#facility-search");
      const regionFilter = document.querySelector("#region-filter");
      const statusFilter = document.querySelector("#status-filter");
      const pagination = document.querySelector("#pagination");
      const resultCount = document.querySelector("#result-count");
      const dialog = document.querySelector("#facility-dialog");
      const form = document.querySelector("#facility-form");
      const formId = document.querySelector("#facility-id");
      const nameInput = document.querySelector("#facility-name");

      function getFilteredFacilities() {
        const query = searchInput.value.trim().toLocaleLowerCase("vi");
        return facilities.filter((facility) => {
          const matchesQuery = !query || `${facility.name} ${facility.type} ${facility.region}`.toLocaleLowerCase("vi").includes(query);
          const matchesRegion = !regionFilter.value || facility.regionCode === regionFilter.value;
          const matchesStatus = !statusFilter.value || facility.status === statusFilter.value;
          return matchesQuery && matchesRegion && matchesStatus;
        });
      }

      function renderPagination(totalPages) {
        pagination.replaceChildren();
        const previous = document.createElement("button");
        previous.type = "button";
        previous.className = "page-button";
        previous.textContent = "Trước";
        previous.disabled = currentPage === 1;
        previous.setAttribute("aria-label", "Trang trước");
        previous.addEventListener("click", () => {
          currentPage -= 1;
          renderFacilities();
        });
        pagination.append(previous);

        for (let page = 1; page <= totalPages; page += 1) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "page-button";
          button.textContent = String(page);
          button.setAttribute("aria-label", `Trang ${page}`);
          if (page === currentPage) button.setAttribute("aria-current", "page");
          button.addEventListener("click", () => {
            currentPage = page;
            renderFacilities();
          });
          pagination.append(button);
        }

        const next = document.createElement("button");
        next.type = "button";
        next.className = "page-button";
        next.textContent = "Sau";
        next.disabled = currentPage === totalPages;
        next.setAttribute("aria-label", "Trang sau");
        next.addEventListener("click", () => {
          currentPage += 1;
          renderFacilities();
        });
        pagination.append(next);
      }

      function renderFacilities() {
        const filteredFacilities = getFilteredFacilities();
        const totalPages = Math.max(1, Math.ceil(filteredFacilities.length / pageSize));
        currentPage = Math.min(currentPage, totalPages);
        const start = (currentPage - 1) * pageSize;
        const visibleFacilities = filteredFacilities.slice(start, start + pageSize);

        rows.replaceChildren();
        if (visibleFacilities.length === 0) {
          const row = document.createElement("tr");
          const cell = document.createElement("td");
          cell.className = "empty-row";
          cell.colSpan = 6;
          cell.textContent = loadError ? "Không thể tải dữ liệu cơ sở y tế." : "Không tìm thấy cơ sở y tế phù hợp.";
          row.append(cell);
          rows.append(row);
        } else {
          visibleFacilities.forEach((facility) => {
            const row = document.createElement("tr");
            const values = [
              { text: facility.name, className: "facility-name" },
              { text: facility.type },
              { text: facility.region },
              { text: String(facility.services) },
            ];

            values.forEach((value) => {
              const cell = document.createElement("td");
              cell.textContent = value.text;
              if (value.className) cell.className = value.className;
              row.append(cell);
            });

            const statusCell = document.createElement("td");
            const badge = document.createElement("span");
            badge.className = `status-badge${facility.status === "Tạm ngưng" ? " paused" : ""}`;
            badge.textContent = facility.status;
            statusCell.append(badge);
            row.append(statusCell);

            const actionsCell = document.createElement("td");
            const actions = document.createElement("div");
            actions.className = "row-actions";
            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "action-button";
            editButton.textContent = "Sửa";
            editButton.setAttribute("aria-label", `Sửa ${facility.name}`);
            editButton.addEventListener("click", () => openEditDialog(facility));
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "action-button delete";
            deleteButton.textContent = "Xóa";
            deleteButton.setAttribute("aria-label", `Xóa ${facility.name}`);
            deleteButton.addEventListener("click", () => deleteFacility(facility));
            actions.append(editButton, deleteButton);
            actionsCell.append(actions);
            row.append(actionsCell);
            rows.append(row);
          });
        }

        const firstResult = filteredFacilities.length ? start + 1 : 0;
        const lastResult = Math.min(start + pageSize, filteredFacilities.length);
        resultCount.textContent = `Hiển thị ${firstResult}-${lastResult} trong số ${filteredFacilities.length} cơ sở`;
        renderPagination(totalPages);
      }

      function openAddDialog() {
        form.reset();
        formId.value = "";
        document.querySelector("#dialog-title").textContent = "Thêm cơ sở y tế";
        dialog.showModal();
        nameInput.focus();
      }

      function openEditDialog(facility) {
        form.reset();
        formId.value = facility.id;
        nameInput.value = facility.name;
        document.querySelector("#facility-type").value = facility.type;
        document.querySelector("#facility-region").value = facility.regionCode;
        document.querySelector("#facility-services").value = String(facility.services);
        document.querySelector("#facility-status").value = facility.status;
        document.querySelector("#dialog-title").textContent = "Cập nhật cơ sở y tế";
        dialog.showModal();
        nameInput.focus();
      }

      function deleteFacility(facility) {
        if (!window.confirm(`Bạn có chắc muốn xóa "${facility.name}" khỏi danh sách?`)) return;
        const facilityIndex = facilities.findIndex((item) => item.id === facility.id);
        if (facilityIndex === -1) return;
        facilities.splice(facilityIndex, 1);
        renderFacilities();
      }

      document.querySelector("#add-facility").addEventListener("click", openAddDialog);
      document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
      document.querySelector("#cancel-dialog").addEventListener("click", () => dialog.close());
      searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderFacilities();
      });
      regionFilter.addEventListener("change", () => {
        currentPage = 1;
        renderFacilities();
      });
      statusFilter.addEventListener("change", () => {
        currentPage = 1;
        renderFacilities();
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const selectedRegion = document.querySelector("#facility-region").value;
        const facility = {
          id: formId.value || `facility-${Date.now()}`,
          name: nameInput.value.trim(),
          type: document.querySelector("#facility-type").value,
          region: selectedRegion,
          regionCode: selectedRegion,
          services: Number(document.querySelector("#facility-services").value),
          status: document.querySelector("#facility-status").value,
        };

        if (formId.value) {
          const facilityIndex = facilities.findIndex((item) => item.id === formId.value);
          if (facilityIndex === -1) return;
          facilities[facilityIndex] = facility;
        } else {
          facilities.unshift(facility);
        }

        dialog.close();
        currentPage = 1;
        searchInput.value = "";
        regionFilter.value = "";
        statusFilter.value = "";
        renderFacilities();
      });

      fetch("../assets/data/facilities.json")
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) throw new Error("facilities.json phải chứa một danh sách.");
          facilities = data.map((facility) => ({
            id: facility.id,
            name: facility.name,
            type: facility.type,
            region: facility.location,
            regionCode: facility.location,
            services: Number(facility.services_count) || 0,
            status: facility.status
          }));
          renderFacilities();
        })
        .catch((error) => {
          console.error("Không thể tải danh sách cơ sở y tế:", error);
          loadError = true;
          renderFacilities();
        });
}

if (window.location.pathname.endsWith("/citizen-care-checklist.html")) {

        (() => {
            const STORAGE_KEY = 'careroute_checklist_v1';
            const categories = {
                documents: {
                    title: 'Giấy tờ cần mang',
                    icon: '../assets/icons/list-svgrepo-com.svg'
                },
                preparation: {
                    title: 'Chuẩn bị trước khám',
                    icon: '../assets/icons/briefcase-svgrepo-com.svg'
                },
                notes: {
                    title: 'Lưu ý đặc biệt',
                    icon: '../assets/icons/notification-bell-alert-alarm-clock-time-watch-svgrepo-com.svg'
                }
            };
            const specialtySuggestions = {
                'Thần kinh': {
                    preparation: ['Ghi lại các triệu chứng đau đầu chi tiết'],
                    notes: ['Không đeo đồ trang sức kim loại khi đi chụp MRI', 'Nên đi cùng người thân nếu có chụp thuốc cản quang']
                },
                'Nhi khoa': {
                    preparation: ['Ghi lại diễn biến triệu chứng, nhiệt độ và thuốc trẻ đã dùng'],
                    notes: ['Mang theo sổ tiêm chủng và hồ sơ khám bệnh trước đây của trẻ']
                },
                'Tim mạch': {
                    preparation: ['Ghi lại các triệu chứng như đau ngực, hồi hộp hoặc khó thở'],
                    notes: ['Mang theo nhật ký đo huyết áp hoặc nhịp tim nếu có']
                },
                'Xương khớp': {
                    preparation: ['Ghi lại vị trí đau và các hoạt động làm triệu chứng thay đổi'],
                    notes: ['Mang theo phim chụp hoặc kết quả khám xương khớp trước đây nếu có']
                },
                'Sản phụ khoa': {
                    preparation: ['Ghi lại ngày đầu kỳ kinh gần nhất nếu phù hợp'],
                    notes: ['Mang theo hồ sơ khám phụ khoa hoặc thai sản trước đây nếu có']
                },
                'Khám tổng quát': {
                    preparation: ['Ghi lại các vấn đề sức khỏe muốn trao đổi với bác sĩ'],
                    notes: ['Thông báo với cơ sở y tế về bệnh nền, dị ứng và thuốc đang dùng']
                }
            };
            const grid = document.getElementById('checklist-grid');
            const addForm = document.getElementById('add-form');
            const recommendationForm = document.getElementById('recommendation-form');
            const specialtySearch = document.getElementById('specialty-search');
            const procedureSearch = document.getElementById('procedure-search');
            const recommendationStatus = document.getElementById('recommendation-status');
            let checklist = {
                specialty: 'Thần kinh',
                procedure: '',
                tasks: []
            };

            function createTask(category, text, done = false, custom = false) {
                return {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                    category,
                    text,
                    done,
                    custom
                };
            }

            function generateTasks(specialty, procedure) {
                const suggestions = specialtySuggestions[specialty] || specialtySuggestions['Khám tổng quát'];
                const byCategory = {
                    documents: [
                        { text: 'Căn cước công dân (bản gốc)', done: true },
                        { text: 'Thẻ Bảo hiểm y tế (nếu có)', done: true },
                        { text: `Hồ sơ khám ${specialty.toLowerCase()} trước đây`, done: false }
                    ],
                    preparation: [
                        { text: suggestions.preparation[0], done: true },
                        { text: 'Xác nhận yêu cầu nhịn ăn hoặc điều chỉnh thuốc với cơ sở y tế', done: false },
                        { text: 'Chuẩn bị danh sách thuốc đang sử dụng để trao đổi với bác sĩ', done: true }
                    ],
                    notes: (suggestions.notes || []).map((text, index) => ({ text, done: index === 0 }))
                };

                if (procedure.trim()) {
                    const procedureText = procedure.trim();
                    byCategory.preparation.push({ text: `Xác nhận hướng dẫn chuẩn bị cho dịch vụ ${procedureText}`, done: false });
                    if (/mri|cộng hưởng từ/i.test(procedureText)) {
                        byCategory.notes.push({
                            text: 'Báo nhân viên y tế nếu có thiết bị kim loại cấy ghép hoặc máy tạo nhịp',
                            done: false
                        });
                    } else if (/xét nghiệm máu|lấy máu/i.test(procedureText)) {
                        byCategory.notes.push({ text: 'Hỏi cơ sở y tế liệu xét nghiệm có yêu cầu nhịn ăn hay không', done: false });
                    } else if (/điện não đồ|eeg/i.test(procedureText)) {
                        byCategory.preparation.push({ text: 'Hỏi cơ sở y tế cách chuẩn bị trước khi đo điện não đồ', done: false });
                    }
                }

                return Object.entries(byCategory).flatMap(([category, items]) =>
                    items.map(item => createTask(category, item.text, item.done))
                );
            }

            function setSaveStatus(message, isError = false) {
                const status = document.getElementById('save-status');
                status.classList.toggle('error', isError);
                status.querySelector('span').textContent = message;
            }

            function saveChecklist() {
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
                    setSaveStatus('Đã lưu tự động vào thiết bị cá nhân');
                    return true;
                } catch (error) {
                    console.error('Không thể lưu checklist vào localStorage:', error);
                    setSaveStatus('Không thể lưu. Hãy kiểm tra cài đặt lưu trữ của trình duyệt.', true);
                    return false;
                }
            }

            function loadChecklist() {
                let saved;
                try {
                    saved = localStorage.getItem(STORAGE_KEY);
                } catch (error) {
                    console.error('Không thể đọc checklist từ localStorage:', error);
                    setSaveStatus('Trình duyệt không cho phép đọc dữ liệu đã lưu.', true);
                    return false;
                }

                if (!saved) return false;
                try {
                    const parsed = JSON.parse(saved);
                    if (!parsed || !Array.isArray(parsed.tasks)) {
                        throw new Error('Dữ liệu checklist không đúng định dạng.');
                    }
                    checklist = {
                        specialty: typeof parsed.specialty === 'string' && specialtySuggestions[parsed.specialty]
                            ? parsed.specialty
                            : 'Thần kinh',
                        procedure: typeof parsed.procedure === 'string' ? parsed.procedure : '',
                        tasks: parsed.tasks.filter(task =>
                            task &&
                            typeof task.id === 'string' &&
                            Object.prototype.hasOwnProperty.call(categories, task.category) &&
                            typeof task.text === 'string' &&
                            typeof task.done === 'boolean'
                        ).map(task => ({
                            id: task.id,
                            category: task.category,
                            text: task.text,
                            done: task.done,
                            custom: Boolean(task.custom)
                        }))
                    };
                    return true;
                } catch (error) {
                    console.error('Dữ liệu checklist đã lưu bị lỗi:', error);
                    setSaveStatus('Dữ liệu checklist đã lưu không hợp lệ; đã tạo danh sách mới.', true);
                    return false;
                }
            }

            function updateProgress() {
                const total = checklist.tasks.length;
                const completed = checklist.tasks.filter(task => task.done).length;
                const percent = total ? Math.round(completed * 100 / total) : 0;
                document.getElementById('progress-fill').style.width = `${percent}%`;
                document.getElementById('progress-text').textContent = `${percent}%`;
                document.getElementById('progressbar').setAttribute('aria-valuenow', String(percent));
            }

            function renderChecklist() {
                grid.replaceChildren();
                Object.entries(categories).forEach(([category, config]) => {
                    const card = document.createElement('section');
                    card.className = 'check-card';
                    const heading = document.createElement('h2');
                    heading.className = 'card-heading';
                    const icon = document.createElement('img');
                    icon.src = config.icon;
                    icon.alt = '';
                    const title = document.createElement('span');
                    title.textContent = config.title;
                    heading.append(icon, title);

                    const list = document.createElement('ul');
                    list.className = 'task-list';
                    const tasks = checklist.tasks.filter(task => task.category === category);
                    if (!tasks.length) {
                        const empty = document.createElement('li');
                        empty.className = 'empty-card';
                        empty.textContent = 'Chưa có mục nào trong nhóm này.';
                        list.appendChild(empty);
                    }
                    tasks.forEach(task => {
                        const row = document.createElement('li');
                        row.className = 'task-row';
                        const label = document.createElement('label');
                        label.className = 'task-label';
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.checked = task.done;
                        checkbox.setAttribute('aria-label', `Đánh dấu hoàn thành: ${task.text}`);
                        checkbox.addEventListener('change', () => {
                            task.done = checkbox.checked;
                            saveChecklist();
                            updateProgress();
                        });
                        const text = document.createElement('span');
                        text.textContent = task.text;
                        label.append(checkbox, text);

                        const removeButton = document.createElement('button');
                        removeButton.type = 'button';
                        removeButton.className = 'delete-task';
                        removeButton.textContent = '×';
                        removeButton.setAttribute('aria-label', `Xóa mục: ${task.text}`);
                        removeButton.addEventListener('click', () => {
                            checklist.tasks = checklist.tasks.filter(item => item.id !== task.id);
                            saveChecklist();
                            renderChecklist();
                            showToast('Đã xóa mục khỏi checklist.');
                        });
                        row.append(label, removeButton);
                        list.appendChild(row);
                    });
                    card.append(heading, list);
                    grid.appendChild(card);
                });
                document.getElementById('checklist-title').textContent =
                    `Chuẩn bị cho cuộc hẹn khám ${checklist.specialty}`;
                updateProgress();
            }

            function showToast(message) {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = message;
                container.appendChild(toast);
                window.setTimeout(() => toast.remove(), 2800);
            }

            recommendationForm.addEventListener('submit', event => {
                event.preventDefault();
                const specialty = specialtySearch.value.trim();
                if (!Object.prototype.hasOwnProperty.call(specialtySuggestions, specialty)) {
                    recommendationStatus.textContent = 'Chọn một chuyên khoa trong danh sách gợi ý để tạo checklist phù hợp.';
                    recommendationStatus.classList.add('error');
                    specialtySearch.setAttribute('aria-invalid', 'true');
                    specialtySearch.focus();
                    return;
                }

                const procedure = procedureSearch.value.trim();
                const completed = new Map(checklist.tasks.map(task => [`${task.category}:${task.text}`, task.done]));
                const customTasks = checklist.tasks.filter(task => task.custom);
                const generated = generateTasks(specialty, procedure);
                generated.forEach(task => {
                    if (completed.has(`${task.category}:${task.text}`)) {
                        task.done = completed.get(`${task.category}:${task.text}`);
                    }
                });
                checklist = { specialty, procedure, tasks: [...generated, ...customTasks] };
                saveChecklist();
                renderChecklist();
                specialtySearch.setAttribute('aria-invalid', 'false');
                recommendationStatus.classList.remove('error');
                recommendationStatus.textContent = `Đã cập nhật checklist gợi ý cho chuyên khoa ${specialty}.`;
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            specialtySearch.addEventListener('input', () => {
                specialtySearch.removeAttribute('aria-invalid');
                recommendationStatus.textContent = '';
                recommendationStatus.classList.remove('error');
            });

            document.getElementById('toggle-add-form').addEventListener('click', event => {
                const isOpen = !addForm.hidden;
                addForm.hidden = isOpen;
                event.currentTarget.setAttribute('aria-expanded', String(!isOpen));
                if (!isOpen) document.getElementById('new-task').focus();
            });

            addForm.addEventListener('submit', event => {
                event.preventDefault();
                const input = document.getElementById('new-task');
                const text = input.value.trim();
                if (!text) {
                    input.focus();
                    return;
                }
                checklist.tasks.push(createTask(
                    document.getElementById('new-task-category').value,
                    text,
                    false,
                    true
                ));
                addForm.reset();
                saveChecklist();
                renderChecklist();
                showToast('Đã thêm công việc vào checklist.');
                document.getElementById('new-task').focus();
            });

            if (!loadChecklist()) {
                checklist.tasks = generateTasks(checklist.specialty, checklist.procedure);
                saveChecklist();
            }
            renderChecklist();
        })();
}

if (window.location.pathname.endsWith("/citizen-care-search.html")) {

        let currentLoginRole = 'user';

        document.addEventListener('DOMContentLoaded', function() {
            checkUserSession();
            setupCareInformationRouter();
            setupSearchFilters();
        });

        function normalizeSearchText(value) {
            return value
                .toLocaleLowerCase('vi')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }

        function setupCareInformationRouter() {
            const form = document.getElementById('search-form');
            const input = document.getElementById('site-search-input');
            const processing = document.getElementById('router-processing');
            const result = document.getElementById('router-result');
            const popover = document.getElementById('router-popover');
            const submit = document.getElementById('router-submit');
            const specialtyOutput = document.getElementById('router-specialty');
            const reasonOutput = document.getElementById('router-reason');
            const emergencyOutput = document.getElementById('router-emergency');
            const acceptedOutput = document.getElementById('router-accepted');
            let latestSuggestion = null;

            const emergencyTerms = [
                'kho tho', 'dau nguc du doi', 'bat tinh', 'dot quy', 'meo mieng',
                'yeu liet', 'chay mau nhieu', 'co giat', 'ngung tho'
            ];
            const containsTerm = (text, term) => (` ${text} `).includes(` ${term} `);
            const routes = [
                {
                    specialty: 'Nhi khoa',
                    keywords: ['tre em', 'em be', 'be bi', 'con toi', 'tre so sinh'],
                    reason: 'Thông tin cho thấy người cần khám là trẻ em; chuyên khoa Nhi là điểm bắt đầu phù hợp.'
                },
                {
                    specialty: 'Tim mạch',
                    keywords: ['dau nguc', 'tuc nguc', 'tim dap nhanh', 'hoi hop', 'huyet ap'],
                    reason: 'Các từ khóa về đau/tức ngực, nhịp tim hoặc huyết áp thường được điều phối đến chuyên khoa Tim mạch.'
                },
                {
                    specialty: 'Thần kinh',
                    keywords: ['dau dau', 'chong mat', 'te bi', 'run tay', 'mat ngu'],
                    reason: 'Các từ khóa về đau đầu, chóng mặt hoặc tê bì thường được điều phối đến chuyên khoa Thần kinh.'
                },
                {
                    specialty: 'Hô hấp',
                    keywords: ['ho', 'sot', 'dau hong', 'so mui', 'kho khan khi tho'],
                    reason: 'Các từ khóa về ho, sốt hoặc đau họng thường được điều phối đến chuyên khoa Hô hấp/Nội tổng quát.'
                },
                {
                    specialty: 'Tiêu hóa',
                    keywords: ['dau bung', 'buon non', 'tieu chay', 'tao bon', 'day bung'],
                    reason: 'Các từ khóa về đau bụng hoặc rối loạn tiêu hóa thường được điều phối đến chuyên khoa Tiêu hóa.'
                },
                {
                    specialty: 'Cơ xương khớp',
                    keywords: ['dau khop', 'dau lung', 'dau co', 'sung khop', 'han che van dong'],
                    reason: 'Các từ khóa về đau khớp, đau lưng hoặc hạn chế vận động thường được điều phối đến chuyên khoa Cơ xương khớp.'
                },
                {
                    specialty: 'Da liễu',
                    keywords: ['phat ban', 'ngua da', 'noi man', 'mun', 'bong troc'],
                    reason: 'Các từ khóa về phát ban, ngứa hoặc tổn thương da thường được điều phối đến chuyên khoa Da liễu.'
                }
            ];

            form.addEventListener('submit', event => {
                event.preventDefault();
                const symptoms = input.value.trim();
                if (symptoms.length < 3) {
                    showToast('Nhập ít nhất 3 ký tự để tìm kiếm hoặc mô tả triệu chứng.');
                    input.focus();
                    return;
                }
                input.dataset.routerMode = 'true';
                document.dispatchEvent(new Event('care-router:submitted'));
                const normalizedSymptoms = normalizeSearchText(symptoms);
                const isEmergency = emergencyTerms.some(term => containsTerm(normalizedSymptoms, term));
                const childTerms = ['tre em', 'em be', 'be bi', 'con toi', 'tre so sinh'];
                const words = normalizedSymptoms.split(/\s+/);
                const isChild = childTerms.some(term => containsTerm(normalizedSymptoms, term)) || words.some(word => word === 'tre' || word === 'be');
                const matchedRoute = isChild
                    ? routes[0]
                    : routes.slice(1).find(route => route.keywords.some(term => containsTerm(normalizedSymptoms, term)));
                latestSuggestion = {
                    specialty: isEmergency ? 'Cần hỗ trợ y tế khẩn cấp' : (matchedRoute ? matchedRoute.specialty : 'Nội tổng quát'),
                    reason: isEmergency
                        ? 'Mô tả có từ khóa cảnh báo cần được nhân viên y tế đánh giá khẩn cấp. Hệ thống không cố gắng phân loại thành khám chuyên khoa thông thường.'
                        : (matchedRoute ? matchedRoute.reason : 'Chưa có từ khóa chuyên khoa rõ ràng; khám Nội tổng quát là lựa chọn ban đầu để được đánh giá trực tiếp.'),
                    isEmergency
                };

                result.hidden = true;
                acceptedOutput.hidden = true;
                popover.hidden = false;
                processing.hidden = false;
                submit.disabled = true;
                window.setTimeout(() => {
                    specialtyOutput.textContent = `Chuyên khoa/dịch vụ gợi ý: ${latestSuggestion.specialty}`;
                    reasonOutput.textContent = `Vì sao có gợi ý này: ${latestSuggestion.reason}`;
                    emergencyOutput.hidden = !latestSuggestion.isEmergency;
                    emergencyOutput.textContent = latestSuggestion.isEmergency
                        ? 'Dấu hiệu có thể cần cấp cứu: gọi 115 hoặc đến khoa Cấp cứu gần nhất ngay. Không chờ phản hồi trực tuyến.'
                        : '';
                    processing.hidden = true;
                    result.hidden = false;
                    submit.disabled = false;
                }, 550);
            });

            input.addEventListener('input', () => {
                input.dataset.routerMode = 'false';
                result.hidden = true;
                processing.hidden = true;
                popover.hidden = true;
                acceptedOutput.hidden = true;
            });
            document.getElementById('router-edit').addEventListener('click', () => {
                popover.hidden = true;
                input.focus();
                input.select();
            });
            document.getElementById('router-accept').addEventListener('click', () => {
                if (!latestSuggestion) return;
                if (latestSuggestion.isEmergency) {
                    showToast('Hãy gọi 115 hoặc đến khoa Cấp cứu gần nhất ngay.');
                } else {
                    showToast(`Đã chấp nhận gợi ý ${latestSuggestion.specialty}.`);
                    input.value = '';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    document.getElementById('facility-search').value = '';
                    document.getElementById('facility-search').dispatchEvent(new Event('input', { bubbles: true }));
                    document.getElementById('facility-directory').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                popover.hidden = latestSuggestion.isEmergency ? false : true;
            });
        }

        function setupSearchFilters() {
            const siteSearch = document.getElementById('site-search-input');
            const facilitySearch = document.getElementById('facility-search');
            const typeFilter = document.getElementById('facility-type-filter');
            const siteStatus = document.getElementById('site-search-status');
            const facilityStatus = document.getElementById('facility-filter-status');
            const facilityCards = Array.from(document.querySelectorAll('.clinic-container [data-facility-type]'));
            const facilityListItems = Array.from(document.querySelectorAll('.clinic-item-card'));
            const articles = Array.from(document.querySelectorAll('.blog-card'));

            function applyFilters() {
                const routerMode = siteSearch.dataset.routerMode === 'true';
                const globalQuery = routerMode ? '' : normalizeSearchText(siteSearch.value);
                const facilityQuery = normalizeSearchText(facilitySearch.value);
                const selectedType = typeFilter.value;
                facilityCards.forEach(card => {
                    const text = normalizeSearchText(card.textContent);
                    const query = [globalQuery, facilityQuery]
                        .filter(Boolean)
                        .flatMap(term => term.split(/\s+/));
                    const matchesText = query.every(term => text.includes(term));
                    const matchesType = !selectedType || card.dataset.facilityType === selectedType;
                    card.hidden = !matchesText || !matchesType;
                });
                articles.forEach(article => {
                    const text = normalizeSearchText(article.textContent);
                    article.hidden = Boolean(globalQuery) && !globalQuery.split(/\s+/).every(term => text.includes(term));
                });

                const visibleFacilities = facilityListItems.filter(card => !card.hidden).length;
                const visibleArticles = articles.filter(article => !article.hidden).length;
                facilityStatus.textContent = `${visibleFacilities} cơ sở phù hợp`;
                siteStatus.textContent = globalQuery
                    ? `Tìm thấy ${visibleFacilities} cơ sở và ${visibleArticles} bài viết phù hợp với "${siteSearch.value.trim()}".`
                    : '';
            }

            siteSearch.addEventListener('input', applyFilters);
            document.addEventListener('care-router:submitted', applyFilters);
            facilitySearch.addEventListener('input', applyFilters);
            typeFilter.addEventListener('change', applyFilters);
            applyFilters();
        }

        window.showToast = function showToast(message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(50px)';
                toast.style.transition = 'all 0.3s';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        window.openAuthModal = function openAuthModal(defaultTab = 'login') {
            document.getElementById('auth-modal').classList.add('active');
            switchAuthTab(defaultTab);
        }

        window.closeAuthModal = function closeAuthModal() {
            document.getElementById('auth-modal').classList.remove('active');
        }

        window.switchAuthTab = function switchAuthTab(tab) {
            const loginBtn = document.getElementById('tab-btn-login');
            const regBtn = document.getElementById('tab-btn-register');
            const loginForm = document.getElementById('form-login');
            const regForm = document.getElementById('form-register');

            if (tab === 'login') {
                loginBtn.classList.add('active');
                regBtn.classList.remove('active');
                loginForm.style.display = 'block';
                regForm.style.display = 'none';
            } else {
                regBtn.classList.add('active');
                loginBtn.classList.remove('active');
                regForm.style.display = 'block';
                loginForm.style.display = 'none';
            }
        }

        window.selectLoginRole = function selectLoginRole(role) {
            currentLoginRole = role;
            const roleButtons = {
                user: document.getElementById('role-user-btn'),
                facility: document.getElementById('role-facility-btn'),
                reviewer: document.getElementById('role-reviewer-btn'),
                admin: document.getElementById('role-admin-btn')
            };
            const adminCodeWrap = document.getElementById('admin-code-wrap');

            Object.entries(roleButtons).forEach(([roleName, button]) => {
                const isSelected = roleName === role;
                button.classList.toggle('active', isSelected);
                button.setAttribute('aria-pressed', String(isSelected));
            });
            adminCodeWrap.classList.toggle('active', role === 'admin');
            document.getElementById('login-identifier-label').innerText =
                role === 'admin' ? 'Tên tài khoản / Email Admin' : 'Email hoặc số điện thoại';
        }

        window.togglePasswordVisibility = function togglePasswordVisibility(inputId) {
            const input = document.getElementById(inputId);
            input.type = input.type === 'password' ? 'text' : 'password';
        }

        window.handleLogin = function handleLogin(e) {
            e.preventDefault();
            const identifier = document.getElementById('login-identifier').value.trim();
            const adminCode = document.getElementById('admin-code').value.trim();

            if (currentLoginRole === 'admin') {
                if (adminCode !== 'ADMIN2026' && adminCode !== 'admin') {
                    showToast('❌ Mã xác thực Admin không hợp lệ! (Thử: ADMIN2026)');
                    return;
                }
                const adminUser = { name: 'Phạm Minh Quân (Admin)', email: identifier || 'admin@careroute.vn', role: 'admin', letters: 'AD' };
                localStorage.setItem('careroute_user', JSON.stringify(adminUser));
            } else {
                const nameParts = identifier.split('@')[0];
                const displayName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);
                const roleNames = {
                    user: 'Người dân',
                    facility: 'Cơ sở y tế',
                    reviewer: 'Kiểm duyệt viên'
                };
                const user = {
                    name: identifier.includes('@') ? displayName : 'Khách hàng ' + identifier.slice(-4),
                    email: identifier,
                    role: currentLoginRole,
                    roleName: roleNames[currentLoginRole],
                    letters: displayName.substring(0, 2).toUpperCase()
                };
                localStorage.setItem('careroute_user', JSON.stringify(user));
            }
            closeAuthModal();
            if (currentLoginRole === 'user') {
                checkUserSession();
                showToast('✅ Đăng nhập Người dân thành công!');
                return;
            }
            navigateToRole(currentLoginRole);
        }

        function navigateToRole(role) {
            const destinations = {
                facility: 'facility-dashboard.html',
                reviewer: 'reviewer-review-queue.html',
                admin: 'admin-dashboard.html'
            };
            const destination = destinations[role];
            if (!destination) {
                console.error('Không có giao diện đích cho vai trò:', role);
                showToast('Không tìm thấy giao diện phù hợp với vai trò đã chọn.');
                return;
            }
            document.body.classList.add('page-leaving');
            window.setTimeout(() => window.location.assign(destination), 180);
        }

        window.handleRegister = function handleRegister(e) {
            e.preventDefault();
            const fullname = document.getElementById('reg-fullname').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-password').value;
            const confirmPass = document.getElementById('reg-confirm-password').value;

            if (pass !== confirmPass) {
                showToast('❌ Mật khẩu xác nhận không khớp!');
                return;
            }
            const newUser = { name: fullname, email: email, role: 'user', letters: fullname.charAt(0).toUpperCase() };
            localStorage.setItem('careroute_user', JSON.stringify(newUser));
            showToast('🎉 Đăng ký tài khoản thành công!');
            closeAuthModal();
            checkUserSession();
        }

        function checkUserSession() {
            const savedUser = localStorage.getItem('careroute_user');
            const unloggedBox = document.getElementById('auth-buttons-unlogged');
            const loggedBox = document.getElementById('auth-user-logged');

            if (savedUser) {
                const user = JSON.parse(savedUser);
                unloggedBox.style.display = 'none';
                loggedBox.style.display = 'block';
                document.getElementById('header-username').innerText = user.name;
                document.getElementById('header-avatar-letters').innerText = user.letters || 'U';
                document.getElementById('dropdown-fullname').innerText = user.name;
                document.getElementById('dropdown-email').innerText = user.email || 'N/A';
                const badgeContainer = document.getElementById('admin-badge-container');
                const roleNames = {
                    user: 'Người dùng',
                    facility: 'Cơ sở y tế',
                    reviewer: 'Kiểm duyệt viên',
                    admin: 'Quản trị viên',
                    'Cơ sở Y tế': 'Cơ sở y tế'
                };
                if (user.role === 'admin') {
                    document.getElementById('header-role-text').innerText = roleNames.admin;
                    badgeContainer.innerHTML = '<span class="admin-badge-pill">ADMINISTRATOR</span>';
                } else {
                    document.getElementById('header-role-text').innerText =
                        user.roleName || roleNames[user.role] || roleNames.user;
                    badgeContainer.innerHTML = '';
                }
            } else {
                unloggedBox.style.display = 'flex';
                loggedBox.style.display = 'none';
            }
        }

        window.toggleUserMenu = function toggleUserMenu() {
            document.getElementById('user-dropdown-menu').classList.toggle('show');
        }

        window.logout = function logout() {
            localStorage.removeItem('careroute_user');
            document.getElementById('user-dropdown-menu').classList.remove('show');
            showToast('👋 Đã đăng xuất khỏi tài khoản!');
            checkUserSession();
        }
}

if (window.location.pathname.endsWith("/facility-dashboard.html")) {

    (() => {
      const periods = {
        3: [
          { label: "T8", value: 76 },
          { label: "T9", value: 88 },
          { label: "T10", value: 100 }
        ],
        6: [
          { label: "T5", value: 33 },
          { label: "T6", value: 47 },
          { label: "T7", value: 72 },
          { label: "T8", value: 56 },
          { label: "T9", value: 91 },
          { label: "T10", value: 100 }
        ],
        12: [
          { label: "T11", value: 27 },
          { label: "T12", value: 34 },
          { label: "T1", value: 40 },
          { label: "T2", value: 36 },
          { label: "T3", value: 45 },
          { label: "T4", value: 49 },
          { label: "T5", value: 53 },
          { label: "T6", value: 62 },
          { label: "T7", value: 73 },
          { label: "T8", value: 64 },
          { label: "T9", value: 87 },
          { label: "T10", value: 100 }
        ]
      };
      const services = [
        { name: "Chụp sọ não MRI", value: 76 },
        { name: "Khám tổng quát", value: 54 }
      ];
      const chart = document.getElementById("visitChartBars");
      const periodSelect = document.getElementById("periodSelect");
      const toast = document.getElementById("toast");
      let toastTimer;

      function showToast(title, message) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
      }

      function renderChart(monthCount) {
        const data = periods[monthCount];
        chart.replaceChildren(...data.map((month, index) => {
          const column = document.createElement("div");
          column.className = `chart-month${index === data.length - 1 ? " latest" : ""}`;
          const barWrap = document.createElement("div");
          barWrap.className = "chart-bar-wrap";
          const bar = document.createElement("div");
          bar.className = "chart-bar";
          bar.style.height = `${month.value}%`;
          bar.setAttribute("aria-hidden", "true");
          const label = document.createElement("span");
          label.className = "chart-label";
          label.textContent = month.label;
          column.append(barWrap, label);
          barWrap.append(bar);
          return column;
        }));
        chart.setAttribute("aria-label", `Lượt tra cứu theo tháng trong ${monthCount} tháng gần đây.`);
      }

      periodSelect.addEventListener("change", () => renderChart(Number(periodSelect.value)));

      function escapeCsv(value) {
        return `"${String(value).replace(/"/g, '""')}"`;
      }

      document.getElementById("exportButton").addEventListener("click", (event) => {
        const button = event.currentTarget;
        button.disabled = true;
        const monthCount = Number(periodSelect.value);
        const rows = [
          ["Báo cáo hoạt động cơ sở y tế - CareRoute"],
          ["Cơ sở", "Bệnh viện Đa khoa Tâm Anh"],
          ["Thời gian xuất", new Date().toLocaleString("vi-VN")],
          [],
          ["Chỉ số", "Giá trị"],
          ["Tổng lượt tra cứu", "12.480"],
          ["Dịch vụ đang hoạt động", "24"],
          ["Đánh giá trung bình", "4.9/5"],
          ["Phản hồi chờ xử lý", "8"],
          [],
          ["Tháng", "Lượt tra cứu (chỉ số tương đối)"],
          ...periods[monthCount].map((month) => [month.label, month.value]),
          [],
          ["Dịch vụ tìm kiếm", "Tỷ lệ lượt tìm kiếm (%)"],
          ...services.map((service) => [service.name, service.value])
        ];
        const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")}`;
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "baocao-hoatdong-careroute.csv";
        document.body.append(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        button.disabled = false;
        showToast("Đã xuất báo cáo", `Báo cáo CSV trong ${monthCount} tháng gần đây đã được tải xuống.`);
      });

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (event) => {
          if (!link.getAttribute("href").startsWith("#")) return;
          document.querySelectorAll(".nav-link").forEach((item) => {
            item.classList.toggle("active", item === link);
            if (item === link) item.setAttribute("aria-current", "page");
            else item.removeAttribute("aria-current");
          });
        });
      });

      document.querySelector(".metric-link").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelectorAll(".nav-link").forEach((item) => {
          item.classList.remove("active");
          item.removeAttribute("aria-current");
        });
        const feedbackNav = document.querySelector('.nav-link[href="facility-feedback-review.html"]');
        feedbackNav.classList.add("active");
        feedbackNav.setAttribute("aria-current", "page");
        showToast("8 phản hồi đang chờ", "Mở mục “Phản hồi & Đánh giá” để xem các yêu cầu cần xử lý.");
      });

      renderChart(Number(periodSelect.value));
    })();
}

if (window.location.pathname.endsWith("/facility-guidance-management.html")) {

    (() => {
      const storageKey = "careroute.facility.guidance.v1";
      const defaultData = {
        procedures: [{
          id: "procedure-mri",
          title: "Quy trình chụp MRI thần kinh sọ não",
          autoApply: true,
          steps: [
            { id: "step-registration", title: "Đăng ký hồ sơ tại quầy tiếp đón", description: "Vui lòng mang theo giấy tờ tùy thân, thẻ bảo hiểm (nếu có) và phiếu chỉ định để đăng ký tại quầy tiếp đón." },
            { id: "step-metal", title: "Tháo bỏ trang sức & vật dụng kim loại tại phòng chuẩn bị", description: "Yêu cầu tháo đồng hồ, chìa khóa, điện thoại để tránh ảnh hưởng từ trường mạnh của máy chụp MRI." }
          ]
        }]
      };
      const procedureCard = document.getElementById("procedureCard");
      const stepsList = document.getElementById("stepsList");
      const stepForm = document.getElementById("stepForm");
      const procedureModal = document.getElementById("procedureModal");
      const toast = document.getElementById("toast");
      let data = loadData();
      let activeProcedureId = data.procedures[0] ? data.procedures[0].id : null;
      let selectedStepId = data.procedures[0] && data.procedures[0].steps[1]
        ? data.procedures[0].steps[1].id
        : (data.procedures[0] && data.procedures[0].steps[0] ? data.procedures[0].steps[0].id : null);
      let toastTimer;
      let dragStepId = null;

      function loadData() {
        try {
          const saved = window.localStorage.getItem(storageKey);
          if (saved === null) return defaultData;
          const parsed = JSON.parse(saved);
          if (!parsed || !Array.isArray(parsed.procedures) || parsed.procedures.some((procedure) =>
            !procedure || typeof procedure.id !== "string" || typeof procedure.title !== "string" ||
            typeof procedure.autoApply !== "boolean" || !Array.isArray(procedure.steps) ||
            procedure.steps.some((step) => !step || typeof step.id !== "string" ||
              typeof step.title !== "string" || typeof step.description !== "string"))) {
            throw new Error("Dữ liệu quy trình đã lưu không đúng định dạng.");
          }
          return parsed;
        } catch (error) {
          console.error("Không thể tải quy trình đã lưu:", error);
          window.setTimeout(() => showToast("Không thể tải dữ liệu", "Quy trình mẫu được hiển thị; thay đổi trước đó có thể chưa được khôi phục."), 0);
          return defaultData;
        }
      }

      function persist(nextData) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(nextData));
          data = nextData;
          return true;
        } catch (error) {
          console.error("Không thể lưu quy trình:", error);
          showToast("Không thể lưu dữ liệu", "Trình duyệt không cho phép lưu thay đổi. Vui lòng kiểm tra quyền lưu trữ.");
          return false;
        }
      }

      function showToast(title, message) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
      }

      function activeProcedure() {
        return data.procedures.find((procedure) => procedure.id === activeProcedureId) || null;
      }

      function createStepButton(label, iconName, action, stepId) {
        const button = document.createElement("button");
        button.className = `icon-button${action === "delete" ? " delete" : ""}`;
        button.type = "button";
        button.dataset.action = action;
        button.dataset.id = stepId;
        button.setAttribute("aria-label", `${label} bước`);
        button.title = `${label} bước`;
        const icon = document.createElement("img");
        icon.className = "icon";
        icon.src = `../assets/icons/${iconName}`;
        icon.alt = "";
        button.append(icon);
        return button;
      }

      function render() {
        const procedure = activeProcedure();
        document.getElementById("procedureTitle").textContent = procedure ? procedure.title : "Chưa có quy trình";
        document.getElementById("autoBadge").hidden = !procedure || !procedure.autoApply;
        const procedureSelect = document.getElementById("procedureSelect");
        document.getElementById("procedureSelectLabel").hidden = data.procedures.length < 2;
        procedureSelect.replaceChildren(...data.procedures.map((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.textContent = item.title;
          option.selected = item.id === activeProcedureId;
          return option;
        }));
        stepsList.replaceChildren();
        if (procedure) {
          procedure.steps.forEach((step, index) => {
            const row = document.createElement("div");
            row.className = `step-row${step.id === selectedStepId ? " selected" : ""}`;
            row.draggable = true;
            row.dataset.id = step.id;
            row.setAttribute("role", "listitem");
            const handle = document.createElement("button");
            handle.className = "drag-handle";
            handle.type = "button";
            handle.setAttribute("aria-label", `Kéo để sắp xếp bước ${index + 1}`);
            handle.tabIndex = -1;
            const number = document.createElement("span");
            number.className = "step-number";
            number.textContent = String(index + 1);
            const title = document.createElement("button");
            title.className = "step-title-button";
            title.type = "button";
            title.dataset.action = "select";
            title.dataset.id = step.id;
            title.textContent = step.title;
            const actions = document.createElement("div");
            actions.className = "step-actions";
            actions.append(
              createStepButton("Chỉnh sửa", "edit-square-svgrepo-com.svg", "edit", step.id),
              createStepButton("Xóa", "delete-bin-line-svgrepo-com.svg", "delete", step.id)
            );
            row.append(handle, number, title, actions);
            stepsList.append(row);
          });
        }
        const hasSteps = Boolean(procedure && procedure.steps.length);
        document.getElementById("stepsEmpty").hidden = hasSteps;
        stepsList.hidden = !hasSteps;
        renderEditor();
      }

      function renderEditor() {
        const procedure = activeProcedure();
        const step = procedure && procedure.steps.find((item) => item.id === selectedStepId);
        const editorForm = document.getElementById("stepForm");
        document.getElementById("editorEmpty").hidden = Boolean(step);
        editorForm.hidden = !step;
        if (!step) {
          document.getElementById("editorTitle").textContent = "Chỉnh sửa bước";
          return;
        }
        const index = procedure.steps.indexOf(step);
        document.getElementById("editorTitle").textContent = `Chỉnh sửa bước ${index + 1}`;
        document.getElementById("stepName").value = step.title;
        document.getElementById("stepDescription").value = step.description;
      }

      function updateProcedure(change) {
        const procedure = activeProcedure();
        if (!procedure) return false;
        const nextData = {
          procedures: data.procedures.map((item) =>
            item.id === procedure.id ? { ...item, ...change } : item
          )
        };
        return persist(nextData);
      }

      function makeId(prefix) {
        return window.crypto && window.crypto.randomUUID
          ? `${prefix}-${window.crypto.randomUUID()}`
          : `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      }

      function openProcedureModal() {
        document.getElementById("procedureForm").reset();
        procedureModal.hidden = false;
        document.body.style.overflow = "hidden";
        document.getElementById("newProcedureTitle").focus();
      }

      function closeProcedureModal() {
        procedureModal.hidden = true;
        document.body.style.overflow = "";
        document.getElementById("createProcedureButton").focus();
      }

      document.getElementById("procedureToggle").addEventListener("click", () => {
        const collapsed = procedureCard.classList.toggle("collapsed");
        document.getElementById("procedureToggle").setAttribute("aria-expanded", String(!collapsed));
        document.getElementById("collapseButton").setAttribute("aria-label", collapsed ? "Mở rộng quy trình" : "Thu gọn quy trình");
        document.getElementById("collapseButton").title = collapsed ? "Mở rộng quy trình" : "Thu gọn quy trình";
      });
      document.getElementById("collapseButton").addEventListener("click", () => {
        document.getElementById("procedureToggle").click();
      });

      stepsList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const procedure = activeProcedure();
        if (!procedure) return;
        const step = procedure.steps.find((item) => item.id === button.dataset.id);
        if (!step) {
          showToast("Không tìm thấy bước", "Danh sách vừa thay đổi. Vui lòng tải lại và thử lại.");
          return;
        }
        if (button.dataset.action === "select" || button.dataset.action === "edit") {
          selectedStepId = step.id;
          render();
          document.getElementById("stepName").focus();
          return;
        }
        if (button.dataset.action === "delete") {
          if (!window.confirm(`Bạn có chắc muốn xóa bước “${step.title}” không?`)) return;
          const nextSteps = procedure.steps.filter((item) => item.id !== step.id);
          if (updateProcedure({ steps: nextSteps })) {
            if (selectedStepId === step.id) selectedStepId = nextSteps[0] ? nextSteps[0].id : null;
            render();
            showToast("Đã xóa bước", "Bước hướng dẫn đã được xóa khỏi quy trình.");
          }
        }
      });
      stepsList.addEventListener("keydown", (event) => {
        if (!event.altKey || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
        const titleButton = event.target.closest(".step-title-button");
        if (!titleButton) return;
        event.preventDefault();
        const procedure = activeProcedure();
        if (!procedure) return;
        const currentIndex = procedure.steps.findIndex((step) => step.id === titleButton.dataset.id);
        const nextIndex = currentIndex + (event.key === "ArrowUp" ? -1 : 1);
        if (currentIndex < 0 || nextIndex < 0 || nextIndex >= procedure.steps.length) return;
        const reordered = [...procedure.steps];
        [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];
        if (updateProcedure({ steps: reordered })) {
          selectedStepId = titleButton.dataset.id;
          render();
          stepsList.querySelector(`.step-title-button[data-id="${selectedStepId}"]`).focus();
          showToast("Đã sắp xếp lại", "Thứ tự các bước hướng dẫn đã được cập nhật.");
        }
      });

      stepsList.addEventListener("dragstart", (event) => {
        const row = event.target.closest(".step-row");
        if (!row) return;
        dragStepId = row.dataset.id;
        row.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", dragStepId);
      });
      stepsList.addEventListener("dragover", (event) => {
        const row = event.target.closest(".step-row");
        if (!row || !dragStepId || row.dataset.id === dragStepId) return;
        event.preventDefault();
        row.classList.add("drop-target");
      });
      stepsList.addEventListener("dragleave", (event) => {
        const row = event.target.closest(".step-row");
        if (row && !row.contains(event.relatedTarget)) row.classList.remove("drop-target");
      });
      stepsList.addEventListener("drop", (event) => {
        const targetRow = event.target.closest(".step-row");
        if (!targetRow || !dragStepId || targetRow.dataset.id === dragStepId) return;
        event.preventDefault();
        const procedure = activeProcedure();
        if (!procedure) return;
        const reordered = [...procedure.steps];
        const sourceIndex = reordered.findIndex((step) => step.id === dragStepId);
        const targetIndex = reordered.findIndex((step) => step.id === targetRow.dataset.id);
        if (sourceIndex < 0 || targetIndex < 0) return;
        const [moved] = reordered.splice(sourceIndex, 1);
        reordered.splice(targetIndex, 0, moved);
        if (updateProcedure({ steps: reordered })) {
          render();
          showToast("Đã sắp xếp lại", "Thứ tự các bước hướng dẫn đã được cập nhật.");
        }
      });
      stepsList.addEventListener("dragend", () => {
        dragStepId = null;
        stepsList.querySelectorAll(".step-row").forEach((row) => row.classList.remove("dragging", "drop-target"));
      });

      document.getElementById("addStepButton").addEventListener("click", () => {
        const procedure = activeProcedure();
        if (!procedure) {
          showToast("Chưa có quy trình", "Hãy tạo quy trình trước khi thêm bước hướng dẫn.");
          return;
        }
        const newStep = { id: makeId("step"), title: "Bước hướng dẫn mới", description: "" };
        if (updateProcedure({ steps: [...procedure.steps, newStep] })) {
          selectedStepId = newStep.id;
          render();
          document.getElementById("stepName").focus();
        }
      });

      stepForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const procedure = activeProcedure();
        if (!procedure) return;
        const title = document.getElementById("stepName").value.trim();
        if (!title) {
          document.getElementById("stepName").setCustomValidity("Vui lòng nhập tiêu đề bước.");
          document.getElementById("stepName").reportValidity();
          return;
        }
        document.getElementById("stepName").setCustomValidity("");
        const steps = procedure.steps.map((step) => step.id === selectedStepId
          ? { ...step, title, description: document.getElementById("stepDescription").value.trim() }
          : step);
        if (updateProcedure({ steps })) {
          render();
          showToast("Đã cập nhật bước", "Nội dung hướng dẫn đã được lưu.");
        }
      });
      document.getElementById("stepName").addEventListener("input", (event) => event.currentTarget.setCustomValidity(""));

      document.getElementById("createProcedureButton").addEventListener("click", openProcedureModal);
      document.getElementById("procedureSelect").addEventListener("change", (event) => {
        activeProcedureId = event.currentTarget.value;
        const procedure = activeProcedure();
        selectedStepId = procedure && procedure.steps[1]
          ? procedure.steps[1].id
          : (procedure && procedure.steps[0] ? procedure.steps[0].id : null);
        procedureCard.classList.remove("collapsed");
        document.getElementById("procedureToggle").setAttribute("aria-expanded", "true");
        render();
      });
      document.getElementById("closeProcedureModal").addEventListener("click", closeProcedureModal);
      document.getElementById("cancelProcedureModal").addEventListener("click", closeProcedureModal);
      procedureModal.addEventListener("click", (event) => {
        if (event.target === procedureModal) closeProcedureModal();
      });
      document.getElementById("procedureForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("newProcedureTitle").value.trim();
        if (!title) return;
        const procedure = {
          id: makeId("procedure"),
          title,
          autoApply: document.getElementById("newProcedureAuto").checked,
          steps: []
        };
        if (persist({ procedures: [...data.procedures, procedure] })) {
          activeProcedureId = procedure.id;
          selectedStepId = null;
          procedureCard.classList.remove("collapsed");
          document.getElementById("procedureToggle").setAttribute("aria-expanded", "true");
          closeProcedureModal();
          render();
          showToast("Đã tạo quy trình", `“${title}” đã được thêm vào danh sách quy trình.`);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !procedureModal.hidden) closeProcedureModal();
      });

      render();
    })();
}

if (window.location.pathname.endsWith("/facility-service-management.html")) {

    (() => {
      const storageKey = "careroute.facility.services.v1";
      const initialServices = [
        { id: "svc-mri", name: "Chụp sọ não MRI", category: "Chẩn đoán hình ảnh", price: 2500000, duration: 45, status: "active", archived: false, description: "Chụp cộng hưởng từ sọ não." },
        { id: "svc-general", name: "Khám sức khỏe tổng quát", category: "Khám bệnh", price: 1200000, duration: 60, status: "active", archived: false, description: "Gói khám tổng quát dành cho người trưởng thành." },
        { id: "svc-blood", name: "Xét nghiệm máu cơ bản", category: "Xét nghiệm", price: 350000, duration: 20, status: "active", archived: false, description: "Công thức máu và các chỉ số cơ bản." },
        { id: "svc-ultrasound", name: "Siêu âm ổ bụng", category: "Chẩn đoán hình ảnh", price: 450000, duration: 30, status: "inactive", archived: false, description: "Siêu âm kiểm tra tổng quát ổ bụng." }
      ];
      const backdrop = document.getElementById("modalBackdrop");
      const modal = backdrop.querySelector(".modal");
      const form = document.getElementById("serviceForm");
      const nameInput = document.getElementById("serviceName");
      const categoryInput = document.getElementById("serviceCategory");
      const priceInput = document.getElementById("servicePrice");
      const durationInput = document.getElementById("serviceDuration");
      const toast = document.getElementById("toast");
      const rows = document.getElementById("serviceRows");
      let services = loadServices();
      let toastTimer;
      let previouslyFocused = null;

      function loadServices() {
        try {
          const saved = window.localStorage.getItem(storageKey);
          if (saved === null) return initialServices.map((service) => ({ ...service }));
          const parsed = JSON.parse(saved);
          if (!Array.isArray(parsed) || parsed.some((service) =>
            !service || typeof service.id !== "string" || typeof service.name !== "string" ||
            typeof service.category !== "string" || !Number.isFinite(service.price) ||
            !["active", "inactive"].includes(service.status) ||
            (service.archived !== undefined && typeof service.archived !== "boolean"))) {
            throw new Error("Dữ liệu dịch vụ đã lưu không đúng định dạng.");
          }
          return parsed.map((service) => ({ ...service, archived: service.archived === true }));
        } catch (error) {
          console.error("Không thể tải danh sách dịch vụ đã lưu:", error);
          window.setTimeout(() => showToast("Không thể tải dữ liệu", "Danh sách mẫu được hiển thị; thay đổi trước đó có thể chưa được khôi phục."), 0);
          return initialServices.map((service) => ({ ...service }));
        }
      }

      function saveServices(nextServices) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(nextServices));
          return true;
        } catch (error) {
          console.error("Không thể lưu danh sách dịch vụ:", error);
          showToast("Không thể lưu dữ liệu", "Trình duyệt không cho phép lưu thay đổi. Vui lòng kiểm tra dung lượng hoặc quyền lưu trữ.");
          return false;
        }
      }

      function showToast(title, message) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3500);
      }

      function formatPrice(value) {
        return `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;
      }

      function createActionButton(label, iconName, serviceId, action) {
        const button = document.createElement("button");
        button.className = "icon-button";
        if (action === "archive") button.classList.add("archive");
        button.type = "button";
        button.setAttribute("aria-label", `${label} dịch vụ`);
        button.title = `${label} dịch vụ`;
        button.dataset.action = action;
        button.dataset.id = serviceId;
        const icon = document.createElement("img");
        icon.className = "icon";
        icon.src = `../assets/icons/${iconName}`;
        icon.alt = "";
        button.append(icon);
        return button;
      }

      function renderServices() {
        const query = document.getElementById("searchInput").value.trim().toLocaleLowerCase("vi");
        const category = document.getElementById("categoryFilter").value;
        const lifecycle = document.getElementById("statusFilter").value;
        const filtered = services.filter((service) =>
          (!category || service.category === category) &&
          (lifecycle === "archived" ? service.archived : !service.archived) &&
          (lifecycle === "active" ? service.status === "active" : true) &&
          (lifecycle === "inactive" ? service.status === "inactive" : true) &&
          (!query || `${service.name} ${service.description || ""} ${service.category}`.toLocaleLowerCase("vi").includes(query))
        );
        rows.replaceChildren();
        filtered.forEach((service) => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const name = document.createElement("span");
          name.className = "service-title";
          name.textContent = service.name;
          nameCell.append(name);
          if (service.description) {
            const description = document.createElement("span");
            description.className = "service-description";
            description.textContent = service.description;
            nameCell.append(description);
          }
          const categoryCell = document.createElement("td");
          categoryCell.className = "category-label";
          categoryCell.textContent = service.category;
          const priceCell = document.createElement("td");
          priceCell.className = "price";
          priceCell.textContent = formatPrice(service.price);
          const durationCell = document.createElement("td");
          durationCell.textContent = service.duration ? `${service.duration} phút` : "—";
          const statusCell = document.createElement("td");
          const status = document.createElement("span");
          status.className = `status${service.archived || service.status === "inactive" ? " inactive" : ""}`;
          status.textContent = service.archived ? "Đã lưu trữ" : service.status === "inactive" ? "Tạm ngưng" : "Đang hoạt động";
          statusCell.append(status);
          const actionsCell = document.createElement("td");
          const actions = document.createElement("div");
          actions.className = "row-actions";
          if (service.archived) {
            actions.append(createActionButton(
              "Khôi phục",
              "check-circle-svgrepo-com.svg",
              service.id,
              "restore"
            ));
          } else {
            actions.append(
              createActionButton("Sửa", "edit-square-svgrepo-com.svg", service.id, "edit"),
              createActionButton(
                "Lưu trữ",
                "folder-open-svgrepo-com.svg",
                service.id,
                "archive"
              )
            );
          }
          actionsCell.append(actions);
          row.append(nameCell, categoryCell, priceCell, durationCell, statusCell, actionsCell);
          rows.append(row);
        });
        document.getElementById("serviceCount").textContent = `${filtered.length} dịch vụ`;
        document.getElementById("emptyState").hidden = filtered.length > 0;
        document.querySelector(".table-scroll").hidden = filtered.length === 0;
      }

      function setFieldError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.toggle("invalid", Boolean(message));
        if (message) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }

      function clearErrors() {
        setFieldError(nameInput, document.getElementById("nameError"), "");
        setFieldError(categoryInput, document.getElementById("categoryError"), "");
        setFieldError(priceInput, document.getElementById("priceError"), "");
        setFieldError(durationInput, document.getElementById("durationError"), "");
      }

      function openModal(service) {
        previouslyFocused = document.activeElement;
        clearErrors();
        form.reset();
        document.getElementById("serviceId").value = service ? service.id : "";
        document.getElementById("modalTitle").textContent = service ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới";
        document.getElementById("modalDescription").textContent = service
          ? "Cập nhật thông tin dịch vụ của cơ sở."
          : "Điền thông tin để thêm dịch vụ vào danh sách của cơ sở.";
        document.getElementById("saveServiceButton").textContent = service ? "Lưu thay đổi" : "Lưu dịch vụ";
        if (service) {
          nameInput.value = service.name;
          categoryInput.value = service.category;
          priceInput.value = String(service.price);
          durationInput.value = service.duration ? String(service.duration) : "";
          document.getElementById("serviceStatus").value = service.status;
          document.getElementById("serviceDescription").value = service.description || "";
        } else {
          document.getElementById("serviceStatus").value = "active";
        }
        backdrop.hidden = false;
        document.body.style.overflow = "hidden";
        (service ? nameInput : priceInput).focus();
      }

      function closeModal() {
        backdrop.hidden = true;
        document.body.style.overflow = "";
        clearErrors();
        if (previouslyFocused && typeof previouslyFocused.focus === "function") previouslyFocused.focus();
      }

      function validateForm() {
        let valid = true;
        const nameError = document.getElementById("nameError");
        const categoryError = document.getElementById("categoryError");
        const priceError = document.getElementById("priceError");
        const durationError = document.getElementById("durationError");
        const name = nameInput.value.trim();
        const price = Number(priceInput.value);
        const duration = durationInput.value === "" ? null : Number(durationInput.value);

        setFieldError(nameInput, nameError, name ? "" : "Vui lòng nhập tên dịch vụ.");
        setFieldError(categoryInput, categoryError, categoryInput.value ? "" : "Vui lòng chọn danh mục.");
        setFieldError(priceInput, priceError, Number.isSafeInteger(price) && price > 0 ? "" : "Giá dịch vụ phải là số nguyên lớn hơn 0.");
        setFieldError(durationInput, durationError,
          duration === null || (Number.isInteger(duration) && duration > 0 && duration <= 1440)
            ? "" : "Thời lượng phải là số nguyên từ 1 đến 1440 phút.");
        valid = Boolean(name && categoryInput.value && Number.isSafeInteger(price) && price > 0 &&
          (duration === null || (Number.isInteger(duration) && duration > 0 && duration <= 1440)));
        if (!valid) {
          const invalidInput = form.querySelector('[aria-invalid="true"]');
          if (invalidInput) invalidInput.focus();
        }
        return valid;
      }

      document.getElementById("addServiceButton").addEventListener("click", () => openModal(null));
      document.getElementById("closeModalButton").addEventListener("click", closeModal);
      document.getElementById("cancelModalButton").addEventListener("click", closeModal);
      document.getElementById("searchInput").addEventListener("input", renderServices);
      document.getElementById("categoryFilter").addEventListener("change", renderServices);
      document.getElementById("statusFilter").addEventListener("change", renderServices);
      priceInput.addEventListener("input", () => {
        if (priceInput.value && Number(priceInput.value) > 0) setFieldError(priceInput, document.getElementById("priceError"), "");
      });
      nameInput.addEventListener("input", () => {
        if (nameInput.value.trim()) setFieldError(nameInput, document.getElementById("nameError"), "");
      });
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) closeModal();
      });
      document.addEventListener("keydown", (event) => {
        if (backdrop.hidden) return;
        if (event.key === "Escape") {
          closeModal();
          return;
        }
        if (event.key !== "Tab") return;
        const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
      rows.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const service = services.find((item) => item.id === button.dataset.id);
        if (!service) {
          showToast("Không tìm thấy dịch vụ", "Danh sách vừa thay đổi. Vui lòng tải lại và thử lại.");
          return;
        }
        if (button.dataset.action === "edit") {
          openModal(service);
          return;
        }
        const restoring = button.dataset.action === "restore";
        const actionText = restoring ? "khôi phục" : "lưu trữ";
        if (!window.confirm(`Bạn có chắc muốn ${actionText} dịch vụ “${service.name}” không?`)) return;
        const nextServices = services.map((item) => item.id === service.id
          ? { ...item, archived: !restoring }
          : item);
        if (saveServices(nextServices)) {
          services = nextServices;
          renderServices();
          showToast(restoring ? "Đã khôi phục dịch vụ" : "Đã lưu trữ dịch vụ",
            `“${service.name}” đã được ${actionText}.`);
        }
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const id = document.getElementById("serviceId").value;
        const existingIndex = services.findIndex((service) => service.id === id);
        const updatedService = {
          id: id || (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `svc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
          name: nameInput.value.trim(),
          category: categoryInput.value,
          price: Number(priceInput.value),
          duration: durationInput.value ? Number(durationInput.value) : null,
          status: document.getElementById("serviceStatus").value,
          archived: false,
          description: document.getElementById("serviceDescription").value.trim()
        };
        const nextServices = [...services];
        if (existingIndex >= 0) nextServices[existingIndex] = updatedService;
        else nextServices.unshift(updatedService);
        if (saveServices(nextServices)) {
          services = nextServices;
          renderServices();
          closeModal();
          showToast(existingIndex >= 0 ? "Đã cập nhật dịch vụ" : "Đã thêm dịch vụ",
            `“${updatedService.name}” đã được ${existingIndex >= 0 ? "cập nhật" : "thêm vào danh sách"}.`);
        }
      });

      renderServices();
      document.getElementById("priceError").textContent = "Vui lòng nhập giá dịch vụ hợp lệ.";
      nameInput.focus();
    })();
}

if (window.location.pathname.endsWith("/login.html")) {

    (() => {
      const authForm = document.getElementById("authForm");
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
}

if (window.location.pathname.endsWith("/reviewer-feedback-review.html")) {

    (() => {
      const form = document.getElementById("reviewForm");
      const status = document.getElementById("decisionStatus");
      const notes = document.getElementById("feedbackNotes");
      const activityList = document.getElementById("activityList");
      const toast = document.getElementById("toast");
      let toastTimer;

      function renderTicket(ticket) {
        document.getElementById("ticketBreadcrumb").textContent = `Yêu cầu chi tiết #${ticket.ticket_id}`;
        document.getElementById("ticketCategory").textContent = ticket.content_type;
        document.getElementById("serviceName").textContent = ticket.details.service_name || ticket.details.summary || "Nội dung cập nhật";
        document.getElementById("currentPrice").textContent = ticket.details.current_price || "Chưa có dữ liệu";
        document.getElementById("proposedPrice").textContent = ticket.details.proposed_price || "Chưa có dữ liệu";
        const guidance = document.createElement("span");
        guidance.textContent = ticket.details.ai_recommendation || ticket.details.summary || "Không có hướng dẫn bổ sung.";
        document.getElementById("guidanceBox").replaceChildren(guidance);
        notes.value = ticket.reviewer_action.feedback_note || "";
        const decision = {
          "Yêu cầu chỉnh sửa thêm": "revision",
          "Phê duyệt nội dung": "approved",
          "Đã duyệt": "approved",
          "Từ chối yêu cầu": "rejected"
        };
        status.value = decision[ticket.reviewer_action.status] || "revision";
        activityList.replaceChildren(...ticket.activity_log.map((entry, index) => {
          const item = document.createElement("li");
          item.className = "activity-item";
          const dot = document.createElement("span");
          dot.className = `activity-dot${index === 1 ? " warning" : ""}`;
          const text = document.createElement("span");
          text.textContent = `${entry.time} - ${entry.event}`;
          item.append(dot, text);
          return item;
        }));
      }

      function showToast(title, message, isError = false) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.toggle("error", isError);
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const note = notes.value.trim();
        if (!note) {
          notes.focus();
          showToast("Thiếu nội dung phản hồi", "Vui lòng nhập ghi chú trước khi gửi.", true);
          return;
        }

        const decisions = {
          revision: "Đã gửi yêu cầu chỉnh sửa bổ sung",
          approved: "Đã phê duyệt nội dung",
          rejected: "Đã từ chối yêu cầu cập nhật"
        };
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const item = document.createElement("li");
        item.className = "activity-item";
        const dot = document.createElement("span");
        dot.className = "activity-dot";
        const text = document.createElement("span");
        text.textContent = `${time} - ${decisions[status.value]}`;
        item.append(dot, text);
        activityList.prepend(item);
        showToast("Đã gửi phản hồi kiểm duyệt", "Trạng thái xử lý đã được cập nhật.");
      });

      const requestedTicketId = new URLSearchParams(window.location.search).get("ticket_id") || "1024";
      fetch("../assets/data/reviews.json")
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((tickets) => {
          if (!Array.isArray(tickets)) throw new Error("reviews.json phải chứa một danh sách.");
          const ticket = tickets.find((item) => String(item.ticket_id) === requestedTicketId);
          if (!ticket) throw new Error(`Không tìm thấy yêu cầu #${requestedTicketId}.`);
          renderTicket(ticket);
        })
        .catch((error) => {
          console.error("Không thể tải chi tiết yêu cầu:", error);
          showToast("Không thể tải yêu cầu", "Vui lòng kiểm tra dữ liệu hoặc thử tải lại trang.", true);
        });
    })();
}

if (window.location.pathname.endsWith("/reviewer-freshness-monitor.html")) {

    (() => {
      const warningList = document.getElementById("warningList");
      const emptyState = document.getElementById("emptyState");
      const toast = document.getElementById("toast");
      const scanButton = document.getElementById("scanButton");
      const statusTitle = document.getElementById("aiStatusTitle");
      const statusText = document.getElementById("aiStatusText");
      const toggleDismissedButton = document.getElementById("toggleDismissedButton");
      const updateDialog = document.getElementById("updateDialog");
      const updateForm = document.getElementById("updateForm");
      const updateDate = document.getElementById("updateDate");
      const updateNote = document.getElementById("updateNote");
      const storageKey = "careroute-freshness-state";
      const dayMilliseconds = 24 * 60 * 60 * 1000;
      let toastTimer;
      let records = [];
      let dismissedIds = new Set();
      let reminders = {};
      let activeRecordId = null;
      let showDismissed = false;
      let scanTimer;

      function readSavedState() {
        try {
          const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
          if (saved === null || typeof saved !== "object" || Array.isArray(saved)) {
            throw new Error("Dữ liệu lưu trữ không đúng định dạng.");
          }
          return saved;
        } catch (error) {
          console.error("Không thể đọc trạng thái giám sát đã lưu:", error);
          showToast("Không thể đọc dữ liệu đã lưu", "Trang sẽ sử dụng dữ liệu mặc định cho phiên này.");
          return {};
        }
      }

      const savedState = readSavedState();
      if (Array.isArray(savedState.dismissedIds)) dismissedIds = new Set(savedState.dismissedIds);
      if (savedState.reminders && typeof savedState.reminders === "object" && !Array.isArray(savedState.reminders)) {
        reminders = savedState.reminders;
      }
      const savedUpdates = savedState.updates && typeof savedState.updates === "object" && !Array.isArray(savedState.updates)
        ? savedState.updates
        : {};

      function persistState() {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify({
            dismissedIds: [...dismissedIds],
            reminders,
            updates: Object.fromEntries(records
              .filter((record) => record.manual_update_note)
              .map((record) => [record.id, {
                last_updated_at: record.last_updated_at,
                manual_update_note: record.manual_update_note
              }]))
          }));
          return true;
        } catch (error) {
          console.error("Không thể lưu trạng thái giám sát:", error);
          showToast("Không thể lưu thay đổi", "Vui lòng kiểm tra cài đặt lưu trữ của trình duyệt và thử lại.");
          return false;
        }
      }

      function todayIsoDate() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      }

      function getAgeDays(dateString) {
        const updatedAt = new Date(`${dateString}T00:00:00`);
        const today = new Date(`${todayIsoDate()}T00:00:00`);
        if (Number.isNaN(updatedAt.getTime()) || updatedAt > today) return null;
        return Math.floor((today.getTime() - updatedAt.getTime()) / dayMilliseconds);
      }

      function isStale(record) {
        const age = getAgeDays(record.last_updated_at);
        return age !== null && age >= 90;
      }

      function renderWarnings() {
        const warnings = records.filter((record) => isStale(record) && (showDismissed || !dismissedIds.has(record.id)));
        warningList.replaceChildren(...warnings.map((warning) => {
          const row = document.createElement("article");
          row.className = "warning-row";
          row.dataset.id = warning.id;
          const isDismissed = dismissedIds.has(warning.id);
          if (isDismissed) row.classList.add("dismissed-row");
          const content = document.createElement("div");
          const title = document.createElement("h3");
          title.className = "content-title";
          title.textContent = warning.content_title;
          const source = document.createElement("p");
          source.className = "content-source";
          source.textContent = `${warning.content_type} · ${warning.facility_name}`;
          content.append(title, source);

          const dateCell = document.createElement("div");
          dateCell.className = "date-cell";
          const dateLabel = document.createElement("span");
          dateLabel.className = "data-label";
          dateLabel.textContent = "Lần cuối cập nhật";
          const dateValue = document.createElement("span");
          dateValue.className = "data-value";
          const date = new Date(`${warning.last_updated_at}T00:00:00`);
          dateValue.textContent = Number.isNaN(date.getTime()) ? "Không rõ" : date.toLocaleDateString("vi-VN");
          dateCell.append(dateLabel, dateValue);

          const ageCell = document.createElement("div");
          ageCell.className = "age-cell";
          const ageLabel = document.createElement("span");
          ageLabel.className = "data-label";
          ageLabel.textContent = "Số ngày cũ";
          const ageValue = document.createElement("span");
          ageValue.className = "data-value strong";
          ageValue.textContent = `${getAgeDays(warning.last_updated_at)} ngày`;
          ageCell.append(ageLabel, ageValue);

          const badge = document.createElement("span");
          badge.className = "warning-badge";
          const critical = getAgeDays(warning.last_updated_at) > 180;
          badge.classList.add(critical ? "critical" : "attention");
          badge.textContent = critical ? "Nghiêm trọng" : "Cần lưu ý";
          const actions = document.createElement("div");
          actions.className = "row-actions";
          const actionOptions = isDismissed
            ? [["restore", "Khôi phục", "button button-update"]]
            : [
              ["update", "Cập nhật thủ công", "button button-update"],
              ["remind", reminders[warning.id] ? "Đã gửi nhắc nhở" : "Gửi nhắc nhở", `button button-remind${reminders[warning.id] ? " sent" : ""}`],
              ["dismiss", "Bỏ qua", "button button-dismiss"]
            ];
          actionOptions.forEach(([action, label, className]) => {
              const button = document.createElement("button");
              button.type = "button";
              button.dataset.action = action;
              button.className = className;
              button.textContent = label;
              if (action === "remind" && reminders[warning.id]) {
                button.title = `Đã nhắc lần cuối: ${new Date(reminders[warning.id]).toLocaleString("vi-VN")}`;
              }
              actions.append(button);
            });
          row.append(content, dateCell, ageCell, badge, actions);
          return row;
        }));
        emptyState.textContent = showDismissed
          ? "Không có cảnh báo nào trong danh sách này."
          : "Không còn nội dung cảnh báo. Hãy quét lại để kiểm tra dữ liệu mới.";
        emptyState.classList.toggle("visible", warnings.length === 0);
        const dismissedCount = records.filter((record) => isStale(record) && dismissedIds.has(record.id)).length;
        toggleDismissedButton.hidden = dismissedCount === 0 && !showDismissed;
        toggleDismissedButton.textContent = showDismissed
          ? "Ẩn nội dung đã bỏ qua"
          : `Hiện nội dung đã bỏ qua (${dismissedCount})`;
        updateSummary();
      }

      function updateSummary() {
        const groups = { fresh: 0, attention: 0, stale: 0 };
        records.forEach((record) => {
          const age = getAgeDays(record.last_updated_at);
          if (age === null) return;
          if (age < 90) groups.fresh += 1;
          else if (age <= 180) groups.attention += 1;
          else groups.stale += 1;
        });
        const total = groups.fresh + groups.attention + groups.stale;
        const percentages = { fresh: 0, attention: 0, stale: 0 };
        if (total > 0) {
          const remainders = [];
          ["fresh", "attention", "stale"].forEach((group) => {
            const exactPercentage = groups[group] / total * 100;
            percentages[group] = Math.floor(exactPercentage);
            remainders.push({ group, remainder: exactPercentage - percentages[group] });
          });
          remainders.sort((left, right) => right.remainder - left.remainder);
          for (let remaining = 100 - Object.values(percentages).reduce((sum, value) => sum + value, 0), index = 0;
            remaining > 0;
            remaining -= 1, index += 1) {
            percentages[remainders[index % remainders.length].group] += 1;
          }
        }
        ["fresh", "attention", "stale"].forEach((group) => {
          const value = document.querySelector(`.meter-value.${group}`);
          const track = document.querySelector(`.meter-track[aria-label="${{
            fresh: "Nội dung mới",
            attention: "Nội dung cần lưu ý",
            stale: "Nội dung nghiêm trọng"
          }[group]}"]`);
          value.textContent = `${percentages[group]}%`;
          track.setAttribute("aria-valuenow", String(percentages[group]));
          track.querySelector(".meter-fill").style.width = `${percentages[group]}%`;
        });
        const activeWarnings = records.filter((record) => isStale(record) && !dismissedIds.has(record.id)).length;
        statusTitle.textContent = "Trợ lý giám sát AI hoạt động tốt";
        statusText.textContent = `Đang theo dõi ${total} nội dung/dịch vụ. Phát hiện ${activeWarnings} cảnh báo cần xử lý (từ 90 ngày chưa cập nhật).`;
      }

      function showToast(title, message) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
      }

      function validateRecords(data) {
        if (!Array.isArray(data)) throw new Error("freshness.json phải chứa một danh sách.");
        data.forEach((record, index) => {
          if (!record || typeof record !== "object" ||
              typeof record.id !== "string" ||
              typeof record.content_title !== "string" ||
              typeof record.facility_name !== "string" ||
              typeof record.content_type !== "string" ||
              typeof record.last_updated_at !== "string" ||
              getAgeDays(record.last_updated_at) === null) {
            throw new Error(`Mục dữ liệu số ${index + 1} thiếu thông tin hợp lệ hoặc có ngày cập nhật không hợp lệ.`);
          }
        });
      }

      function openUpdateDialog(record) {
        activeRecordId = record.id;
        document.getElementById("updateContentName").textContent = `${record.content_title} — ${record.facility_name}`;
        updateDate.value = todayIsoDate();
        updateDate.max = todayIsoDate();
        updateNote.value = record.manual_update_note || "";
        updateDialog.showModal();
        updateNote.focus();
      }

      warningList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const row = button.closest(".warning-row");
        const record = records.find((item) => item.id === row.dataset.id);
        if (!record) return;

        if (button.dataset.action === "update") {
          openUpdateDialog(record);
        } else if (button.dataset.action === "remind") {
          const previousReminder = reminders[record.id];
          reminders[record.id] = new Date().toISOString();
          if (persistState()) {
            renderWarnings();
            showToast("Đã gửi nhắc nhở", `Đã ghi nhận nhắc nhở cập nhật cho ${record.facility_name}.`);
          } else if (previousReminder) {
            reminders[record.id] = previousReminder;
          } else {
            delete reminders[record.id];
          }
        } else if (button.dataset.action === "dismiss") {
          dismissedIds.add(record.id);
          if (persistState()) {
            renderWarnings();
            showToast("Đã bỏ qua cảnh báo", "Cảnh báo được lưu vào danh sách đã bỏ qua và ẩn khỏi danh sách chính.");
          } else {
            dismissedIds.delete(record.id);
          }
        } else if (button.dataset.action === "restore") {
          dismissedIds.delete(record.id);
          if (persistState()) {
            renderWarnings();
            showToast("Đã khôi phục cảnh báo", "Nội dung đã trở lại danh sách cần xử lý.");
          } else {
            dismissedIds.add(record.id);
          }
        }
      });

      toggleDismissedButton.addEventListener("click", () => {
        showDismissed = !showDismissed;
        renderWarnings();
      });

      document.getElementById("cancelUpdateButton").addEventListener("click", () => updateDialog.close());

      updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const record = records.find((item) => item.id === activeRecordId);
        if (!record || !updateForm.reportValidity()) return;
        const previousValues = {
          last_updated_at: record.last_updated_at,
          manual_update_note: record.manual_update_note
        };
        record.last_updated_at = updateDate.value;
        record.manual_update_note = updateNote.value.trim();
        if (!record.manual_update_note) {
          updateNote.setCustomValidity("Vui lòng mô tả nội dung đã cập nhật.");
          updateNote.reportValidity();
          updateNote.setCustomValidity("");
          record.last_updated_at = previousValues.last_updated_at;
          record.manual_update_note = previousValues.manual_update_note;
          return;
        }
        if (!persistState()) {
          record.last_updated_at = previousValues.last_updated_at;
          record.manual_update_note = previousValues.manual_update_note;
          return;
        }
        updateDialog.close();
        showDismissed = false;
        renderWarnings();
        showToast("Đã cập nhật nội dung", "Ngày cập nhật đã được ghi nhận; cảnh báo sẽ xuất hiện lại khi nội dung cũ từ 90 ngày.");
      });

      scanButton.addEventListener("click", () => {
        window.clearTimeout(scanTimer);
        scanButton.disabled = true;
        scanButton.textContent = "Đang quét...";
        statusTitle.textContent = "AI đang quét dữ liệu";
        statusText.textContent = "Đang tính thời gian kể từ lần cập nhật gần nhất và phân loại nội dung/dịch vụ cần chú ý.";
        scanTimer = window.setTimeout(() => {
          renderWarnings();
          scanButton.disabled = false;
          scanButton.textContent = "Quét lại toàn hệ thống";
          showToast("Quét hoàn tất", `Tìm thấy ${records.filter((record) => isStale(record) && !dismissedIds.has(record.id)).length} cảnh báo cần xử lý.`);
        }, 500);
      });

      fetch("../assets/data/freshness.json")
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          validateRecords(data);
          records = data.map((record) => ({
            ...record,
            ...(savedUpdates[record.id] || {})
          }));
          renderWarnings();
        })
        .catch((error) => {
          console.error("Không thể tải dữ liệu giám sát nội dung:", error);
          statusTitle.textContent = "Không thể tải dữ liệu giám sát";
          statusText.textContent = "Vui lòng kiểm tra kết nối dữ liệu và tải lại trang để quét nội dung.";
          emptyState.textContent = `Không thể tải danh sách cảnh báo: ${error.message}`;
          emptyState.classList.add("visible");
        });
    })();
}

if (window.location.pathname.endsWith("/reviewer-review-queue.html")) {

    (() => {
      const reviewList = document.getElementById("reviewList");
      const searchInput = document.getElementById("searchInput");
      const priorityFilter = document.getElementById("priorityFilter");
      const categoryFilter = document.getElementById("categoryFilter");
      const emptyState = document.getElementById("emptyState");
      const modalBackdrop = document.getElementById("modalBackdrop");
      const modalTitle = document.getElementById("modalTitle");
      const modalContent = document.getElementById("modalContent");
      const toast = document.getElementById("toast");
      let pendingCount = 0;
      let approvedCount = 32;
      let toastTimer;

      function createCard(review) {
        const priorities = { "Cao": "high", "Trung bình": "medium", "Thấp": "low" };
        const categories = {
          "Bảng giá / Dịch vụ": "service",
          "Quy trình hướng dẫn": "guidance",
          "Thông tin chung": "general"
        };
        const card = document.createElement("article");
        const priority = priorities[review.priority] || "low";
        const category = categories[review.content_type] || "general";
        const summary = review.details.summary
          || `Cập nhật ${review.details.service_name || "nội dung"}${review.details.proposed_price ? ` lên ${review.details.proposed_price}` : ""}`;
        const date = new Date(review.created_at);
        card.className = "review-card";
        card.dataset.priority = priority;
        card.dataset.category = category;
        card.dataset.search = `${review.facility_name} ${review.requested_by}`.toLocaleLowerCase("vi");

        const header = document.createElement("div");
        header.className = "review-header";
        const title = document.createElement("h2");
        title.className = "review-title";
        title.textContent = review.facility_name;
        const categoryLabel = document.createElement("span");
        categoryLabel.className = "category";
        categoryLabel.textContent = review.content_type;
        const meta = document.createElement("div");
        meta.className = "review-meta";
        const dateLabel = document.createElement("span");
        dateLabel.textContent = `Gửi ngày: ${Number.isNaN(date.getTime()) ? "Không rõ" : date.toLocaleDateString("vi-VN")}`;
        const priorityLabel = document.createElement("span");
        priorityLabel.className = `priority${priority === "high" ? "" : ` ${priority}`}`;
        priorityLabel.textContent = review.priority;
        meta.append(dateLabel, priorityLabel);
        header.append(title, categoryLabel, meta);

        const description = document.createElement("p");
        description.className = "review-description";
        description.textContent = summary;
        const footer = document.createElement("div");
        footer.className = "review-footer";
        const requester = document.createElement("div");
        requester.className = "requester";
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.style.setProperty("--icon", "url('../assets/icons/user-svgrepo-com.svg')");
        const requesterLabel = document.createElement("span");
        requesterLabel.textContent = `Yêu cầu bởi: ${review.requested_by}`;
        requester.append(icon, requesterLabel);

        const actions = document.createElement("div");
        actions.className = "card-actions";
        [["approve", "Duyệt Ngay", "button button-approve"], ["reject", "Từ Chối", "button button-reject"], ["details", "Xem Chi Tiết", "button"]]
          .forEach(([action, label, className]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.action = action;
            button.className = className;
            button.textContent = label;
            actions.append(button);
          });
        footer.append(requester, actions);
        card.append(header, description, footer);
        return card;
      }

      function renderReviews(reviews) {
        reviewList.replaceChildren(...reviews.map(createCard));
        pendingCount = reviews.length;
        document.getElementById("pendingCount").textContent = String(pendingCount);
        applyFilters();
      }

      function applyFilters() {
        const query = searchInput.value.trim().toLocaleLowerCase("vi");
        const priority = priorityFilter.value;
        const category = categoryFilter.value;
        let visible = 0;

        reviewList.querySelectorAll(".review-card").forEach((card) => {
          const matches = card.dataset.search.includes(query)
            && (priority === "all" || card.dataset.priority === priority)
            && (category === "all" || card.dataset.category === category);
          card.hidden = !matches;
          if (matches) visible += 1;
        });
        emptyState.classList.toggle("visible", visible === 0);
      }

      function showToast(title, message) {
        document.getElementById("toastTitle").textContent = title;
        document.getElementById("toastMessage").textContent = message;
        toast.classList.add("visible");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
      }

      function openModal(title, content) {
        modalTitle.textContent = title;
        modalContent.replaceChildren(...(Array.isArray(content) ? content : [content]));
        modalBackdrop.classList.add("open");
        document.getElementById("modalClose").focus();
      }

      [searchInput, priorityFilter, categoryFilter].forEach((control) => {
        control.addEventListener("input", applyFilters);
        control.addEventListener("change", applyFilters);
      });

      reviewList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const card = button.closest(".review-card");
        const facility = card.querySelector(".review-title").textContent;
        const action = button.dataset.action;

        if (action === "details") {
          const description = document.createElement("p");
          description.textContent = card.querySelector(".review-description").textContent;
          const sender = document.createElement("p");
          sender.textContent = card.querySelector(".requester").textContent.trim();
          const date = document.createElement("p");
          date.textContent = card.querySelector(".review-meta span").textContent;
          openModal(facility, [description, sender, date]);
          return;
        }

        card.remove();
        pendingCount = Math.max(0, pendingCount - 1);
        document.getElementById("pendingCount").textContent = pendingCount;
        if (action === "approve") {
          approvedCount += 1;
          document.getElementById("approvedCount").textContent = approvedCount;
          showToast("Đã duyệt nội dung", `${facility} đã được chuyển sang trạng thái đã duyệt.`);
        } else {
          showToast("Đã từ chối nội dung", `Yêu cầu cập nhật của ${facility} đã bị từ chối.`);
        }
        applyFilters();
      });

      document.getElementById("historyButton").addEventListener("click", () => {
        const history = document.createElement("p");
        history.textContent = "Hôm nay: 32 nội dung đã được duyệt. Các hồ sơ mới nhất sẽ xuất hiện tại đây sau khi được xử lý.";
        openModal("Lịch sử duyệt", history);
      });

      document.getElementById("modalClose").addEventListener("click", () => modalBackdrop.classList.remove("open"));
      modalBackdrop.addEventListener("click", (event) => {
        if (event.target === modalBackdrop) modalBackdrop.classList.remove("open");
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") modalBackdrop.classList.remove("open");
      });

      fetch("../assets/data/reviews.json")
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((reviews) => {
          if (!Array.isArray(reviews)) throw new Error("reviews.json phải chứa một danh sách.");
          renderReviews(reviews);
        })
        .catch((error) => {
          console.error("Không thể tải danh sách kiểm duyệt:", error);
          reviewList.textContent = "Không thể tải danh sách kiểm duyệt. Vui lòng thử tải lại trang.";
          emptyState.classList.add("visible");
        });
    })();
}
