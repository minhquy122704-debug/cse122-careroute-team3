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
