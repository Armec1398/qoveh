// فرم کنترل جامع برای تمام فرم‌ها
$(document).ready(function () {
  // تابع نمایش خطا
  function showError(input, message) {
    removeError(input);
    const error = $(
      '<div class="text-danger error-message" style="font-size: 0.9em; margin-top: 2px;">' +
        message +
        "</div>"
    );
    if ($(input).is(":radio")) {
      const group = $(
        "input[type='radio'][name='" + $(input).attr("name") + "']"
      );
      group.last().parent().after(error);
    } else if ($(input).is(":checkbox")) {
      $(input).after(error);
    } else if ($(input).is("select")) {
      $(input).after(error);
    } else {
      $(input).after(error);
    }
  }

  // حذف پیام خطا
  function removeError(input) {
    if ($(input).is(":radio")) {
      const group = $(
        "input[type='radio'][name='" + $(input).attr("name") + "']"
      );
      group.last().parent().siblings(".error-message").remove();
    } else if ($(input).is(":checkbox")) {
      $(input).siblings(".error-message").remove();
    } else if ($(input).is("select")) {
      $(input).siblings(".error-message").remove();
    } else {
      $(input).siblings(".error-message").remove();
    }
  }

  // اعتبارسنجی فرم و نمایش خطاها
  function validateForm(form) {
    let valid = true;
    form.find(".required").each(function () {
      const input = $(this);
      let isEmpty = false;
      if (input.is(":radio")) {
        const group = $(
          "input[type='radio'][name='" + input.attr("name") + "']"
        );
        if (group.filter(":checked").length === 0) isEmpty = true;
      } else if (input.is(":checkbox")) {
        if (!input.is(":checked")) isEmpty = true;
      } else if (input.is("select")) {
        if (!input.val() || input.val() === "-" || input.val() === "")
          isEmpty = true;
      } else {
        if (!input.val()) isEmpty = true;
      }
      if (isEmpty) {
        let label = input
          .closest(".mb-3, .form-group, div")
          .find("label")
          .first()
          .text()
          .replace("*", "")
          .trim();
        // اگر name رادیو entryType بود، پیام خاص نمایش بده
        if (input.is(":radio") && input.attr("name") === "entryType") {
          showError(input, "فیلد نحوه ورود اجباری است.");
        } else {
          showError(input, "فیلد " + label + " اجباری است.");
        }
        valid = false;
      } else {
        removeError(input);
      }
    });
    return valid;
  }

  // کنترل ارسال فرم فقط با submit و دکمه submit-btn
  $("form").each(function () {
    const form = $(this);
    form.on("submit", function (e) {
      // اگر دکمه submit-btn فعال بود، فقط در این صورت اعتبارسنجی کن، در غیر این صورت همیشه اعتبارسنجی کن
      const submitter = document.activeElement;
      if (
        $(submitter).hasClass("submit-btn") ||
        form.find(".submit-btn").length === 0
      ) {
        if (!validateForm(form)) {
          e.preventDefault();
        }
      } else {
        // اگر دکمه submit-btn نبود، باز هم اعتبارسنجی کن
        if (!validateForm(form)) {
          e.preventDefault();
        }
      }
    });
    // حذف خطا هنگام تایپ یا تغییر
    form.find(".required").on("input change", function () {
      if ($(this).val()) {
        removeError(this);
      }
    });
    form.find("input[type='radio'].required").on("change", function () {
      removeError(this);
    });
    form.find("input[type='checkbox'].required").on("change", function () {
      removeError(this);
    });
  });
});
