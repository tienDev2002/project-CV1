const showCourse = document.querySelector(".show_course-code");
const showTarget = document.querySelector(".show_target-code");
const course = document.getElementsByClassName("selected")[0];
const target = document.getElementsByClassName("selected")[1];
const icon = document.querySelector(".show__lang-code");

// dùng để xử lý onfocusout()
function turn_Off(caller, event) {
  if (caller === "course") {
    setTimeout(() => {
      showCourse.classList.remove("list_course-code");
      event.target.children[1].id = "c-off";
    }, 0200);
  } else if (caller === "target") {
    setTimeout(() => {
      showTarget.classList.remove("list_target-code");
      event.target.children[1].id = "t-off";
    }, 0200);
  }
}

// dùng để mở khung menu language
function show_CourseCode(event, signal) {
  if (signal == "c-off") {
    showCourse.classList.add("list_course-code");
    event.target.id = "c-on";
  } else if (signal == "c-on") {
    showCourse.classList.remove("list_course-code");
    event.target.id = "c-off";
  }

  if (signal == "t-off") {
    showTarget.classList.add("list_target-code");
    event.target.id = "t-on";
  } else if (signal == "t-on") {
    showTarget.classList.remove("list_target-code");
    event.target.id = "t-off";
  }
}

function change(value, id) {
  const className = "selected";
  const course = document.getElementsByClassName("selected")[0];
  const target = document.getElementsByClassName("selected")[1];
  if (id == "cl-1" || id == "cl-2") {
    if (value == target.value) {
      if (target.id == "tl-1") {
        target.classList.remove(className);
        target.nextElementSibling.classList.add(className);
      }
      if (target.id == "tl-2") {
        target.classList.remove(className);
        target.previousElementSibling.classList.add(className);
      }
    }
  }

  if (id == "tl-1" || id == "tl-2") {
    if (value == course.value) {
      if (course.id === "cl-1") {
        course.classList.remove(className);
        course.nextElementSibling.classList.add(className);
      }
      if (course.id === "cl-2") {
        course.classList.remove(className);
        course.previousElementSibling.classList.add(className);
      }
    }
  }
}

// Khối code bên dưới xử lý các btn đc selected
function select(event, id, value) {
  if (id == "cl-1") {
    change(value, id);
    event.target.classList.add("selected");
    event.target.nextElementSibling.classList.remove("selected");
  } else if (id == "cl-2") {
    change(value, id);
    event.target.classList.add("selected");
    event.target.previousElementSibling.classList.remove("selected");
  }

  if (id == "tl-1") {
    change(value, id);
    event.target.classList.add("selected");
    event.target.nextElementSibling.classList.remove("selected");
  } else if (id == "tl-2") {
    change(value, id);
    event.target.classList.add("selected");
    event.target.previousElementSibling.classList.remove("selected");
  }
}

function checkValueSet(newValue, newText, btn) {
  if (btn.id == "tl-1") {
    btn.nextElementSibling.value = newValue;
    btn.nextElementSibling.textContent = newText;
  }

  if (btn.id == "cl-2") {
    btn.previousElementSibling.value = newValue;
    btn.previousElementSibling.textContent = newText;
  }
}

// Chọn ngôn ngữ
// Khi chọn 1 ngôn ngữ bất kỳ trong menu thì sẽ đc gán vào thẻ mặc định
// Thẻ mặc định có id ban đầu là "cl-2" => "course language" và "tl-1" => "target language"
function setLangCode(langCode, langName, caller) {
  // Xác định và select 2 button
  const btnCourse = document.getElementById("cl-2");
  const btnTarget = document.getElementById("tl-1");

  // Mỗi thẻ chứa Language code sẽ có gán 1 id: "clc" và "tlc"
  // clc: "course language code"; tlc: "target language code"

  if (caller === "clc") {
    // khối dưới để xác định xem thẻ button phía trước có giống với language code đc chọn ko
    // nếu có thì thẻ btn id cl-2 sẽ đc đổi giá trị vs thẻ btn trước nó.
    // Điều này tránh 2 thẻ btn có giá trị Language code giống nhau
    if (langCode === btnCourse.previousElementSibling.value) {
      btnCourse.previousElementSibling.value = btnCourse.value;
      btnCourse.previousElementSibling.textContent = btnCourse.textContent;

      // Khối này sẽ thay đổi giá trị LC giữa 2 btn chứa LC
      // Điều này tránh 2 thẻ btn 2 bên có cùng giá trị
    }
    if (langCode === btnTarget.value) {
      const btnTargetValue = btnTarget.value;
      const btnTargetText = btnTarget.textContent;

      checkValueSet(btnTargetValue, btnTargetText, btnTarget);

      btnTarget.value = btnCourse.value;
      btnTarget.textContent = btnCourse.textContent;
    }

    // thay đổi giá trị LC hiện tại bằng giá trị LC mới
    btnCourse.value = langCode;
    btnCourse.textContent = langName;
  } else if (caller === "tlc") {
    if (langCode === btnTarget.nextElementSibling.value) {
      btnTarget.nextElementSibling.value = btnTarget.value;
      btnTarget.nextElementSibling.textContent = btnTarget.textContent;
    }
    if (langCode === btnCourse.value) {
      const btnCoursetValue = btnCourse.value;
      const btnCourseText = btnCourse.textContent;

      checkValueSet(btnCoursetValue, btnCourseText, btnCourse);

      btnCourse.value = btnTarget.value;
      btnCourse.textContent = btnTarget.textContent;
    }

    btnTarget.value = langCode;
    btnTarget.textContent = langName;
  }
}

function checkValueSwitch(value, text) {
  if (course.value == target.nextElementSibling.value) {
    if (target.value == course.previousElementSibling.value) {
      course.previousElementSibling.value = course.value;
      course.previousElementSibling.textContent = course.textContent;

      target.nextElementSibling.value = target.value;
      target.nextElementSibling.textContent = target.textContent;
    }
  }
}

// thay đổi LangCode của 2 button đc chọn
function switchFunction() {
  // const btnCourse = document.getElementById("cl-2");
  // const btnTarget = document.getElementById("tl-1");
  // Lưu lại các giá trị ban đầu của course
  const courseValue = course.value;
  const courseText = course.textContent;

  checkValueSwitch(courseValue, courseText);

  course.value = target.value;
  course.textContent = target.textContent;

  target.value = courseValue;
  target.textContent = courseText;
}
