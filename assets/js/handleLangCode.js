function listLangCode(code, caller) {
  var result = code.map((code) => {
    return `<div class="list_code-items" onclick=setLangCode('${code.code}','${code.name}','${caller}')>${code.name}</div>`;
  });

  return result;
}

// in ra danh sách nogon ngữ và các mã
let renderListLangCode = function (code, els) {
  document.querySelector(`.${els[0]}`).innerHTML = listLangCode(
    code,
    "clc"
  ).join("");
  document.querySelector(`.${els[1]}`).innerHTML = listLangCode(
    code,
    "tlc"
  ).join("");
};

export const handleFunctions = {
  // Request danh sách các mã ngôn ngữ
  getLangCode(elements) {
    return fetch("https://libretranslate.de/languages")
      .then((res) => res.json())
      .then((response) => {
        return renderListLangCode(response, elements);
      });
  },

  translate(text, course, target, result) {
    // Function to change the content of t2
    const data = {
      q: text,
      source: course,
      target: target,
    };

    const configMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://libretranslate.de/translate", configMethod)
      .then((response) => response.json())
      .then((response) => (result.value = response.translatedText));
  },
};
