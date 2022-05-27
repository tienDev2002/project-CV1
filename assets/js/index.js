"use strict";
import { handleFunctions } from "./handleLangCode.js";

const URL_DETECT = "https://libretranslate.de/detect";
const URL_LANGUAGES = "https://libretranslate.de/languages";
const URL_TRANSLATE = "https://libretranslate.de/translate";

// elements selects
const elementSelect = ["show_course-code", "show_target-code"];

function main() {
  // Render options
  handleFunctions.getLangCode(elementSelect);

  document.querySelector(".btnTranslate").addEventListener(
    "click",
    function () {
      const text = document.querySelector(".form__input-area").value;
      const course = document.getElementsByClassName("selected")[0].value;
      const target = document.getElementsByClassName("selected")[1].value;
      const result = document.querySelector(".result");

      if (text != "") {
        handleFunctions.translate(text, course, target, result);
      } else {
        result.value = "";
      }
    },
    false
  );
}

main();
