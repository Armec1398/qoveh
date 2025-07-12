function toPersianNumber(str) {
  const enToFaDigits = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  return str.replace(/\d/g, (digit) => enToFaDigits[digit]);
}

function convertNumbersToPersianInNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.nodeValue = toPersianNumber(node.nodeValue);
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.nodeName !== "SCRIPT" &&
    node.nodeName !== "STYLE"
  ) {
    // اگر گره از نوع input است، placeholder آن را به فارسی تبدیل می‌کند
    if (node.nodeName === "INPUT" || node.nodeName === "TEXTAREA") {
      node.placeholder = toPersianNumber(node.placeholder);
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      convertNumbersToPersianInNode(node.childNodes[i]);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  convertNumbersToPersianInNode(document.body);
});
