const EXERSICE_NAME = "Базы данных";

const textContent = Array.from(document.querySelectorAll("p"))
  .map((paragraph) => paragraph.innerText)
  .join(".");

fetch("http://127.0.0.1:11434/api/chat", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({
    model: "gemma3:4b",
    messages: [
      {
        role: "user",
        content: `Ответь да или нет. Следующий текст "${textContent}" соотносится с тематикой моего задания "${EXERSICE_NAME}"`,
      },
    ],
    stream: false,
  }),
}).then((response) => {
  console.log(response);
  //   fetch("http://127.0.0.1:5000/urls", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ url: window.location.href, is_relevant: response }),
  //   });
});
