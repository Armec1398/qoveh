(function () {
  "use strict"; // Start of use strict

  var sidebar = document.querySelector(".sidebar");
  var sidebarToggles = document.querySelectorAll(
    "#sidebarToggle, #sidebarToggleTop"
  );

  if (sidebar) {
    var collapseEl = sidebar.querySelector(".collapse");
    var collapseElementList = [].slice.call(
      document.querySelectorAll(".sidebar .collapse")
    );
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener("resize", function () {
      var vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );

      if (vw < 768) {
        for (var bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      }
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over

  var fixedNaigation = document.querySelector("body.fixed-nav .sidebar");

  if (fixedNaigation) {
    fixedNaigation.on("mousewheel DOMMouseScroll wheel", function (e) {
      var vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );

      if (vw > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }
})(); // End of use strict

document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.querySelector(".sidebar");
  var overlay = document.getElementById("overlay");
  var openButton = document.getElementById("sidebarToggleTop");
  var closeButton = document.getElementById("closeSidebar");

  if (!sidebar || !overlay || !openButton || !closeButton) {
    console.error("یکی از المان‌های مورد نیاز یافت نشد!");
    return;
  }

  // **باز کردن سایدبار**
  openButton.addEventListener("click", function () {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // غیرفعال کردن اسکرول صفحه
  });

  // **بستن سایدبار با دکمه X**
  closeButton.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"; // فعال کردن اسکرول صفحه
  });

  // **بستن سایدبار با کلیک روی پس‌زمینه (بیرون از سایدبار)**
  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // **بستن سایدبار با دکمه Escape**
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

