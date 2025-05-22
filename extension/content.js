// const EXERSICE_NAME = "Базы данных";

// const textContent = Array.from(document.querySelectorAll("p"))
//   .map((paragraph) => paragraph.innerText)
//   .join(".");

// console.log(window.location.href);

// fetch("http://127.0.0.1:11434/api/chat", {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "gemma3:4b",
//     messages: [
//       {
//         role: "user",
//         content: `Ответь да или нет. Следующий текст "${textContent}" соотносится с тематикой моего задания "${EXERSICE_NAME}"`,
//       },
//     ],
//     stream: false,
//   }),
// }).then((response) => {
//   console.log(response);
// fetch("http://127.0.0.1:5000/urls", {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify({ url: window.location.href, is_relevant: response }),
// });
// });

window.addEventListener("visibilitychange", (event) => {
  // navigator.sendBeacon(
  //   "http://127.0.0.1:5000/urls",
  //   JSON.stringify({ timeSpent, title: document.title }),
  // );

  if (document.hidden) {
    console.log("hidden");
  } else {
    console.log("not hidden");
  }
});

chrome.storage.local.get("exerciseId", ({ exerciseId }) => {
  const values = {
    url: window.location.origin,
    title: document.title,
    visited_at: Date.now(),
    exercise_id: exerciseId,
  };

  fetch("http://127.0.0.1:5000/urls", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values),
  });
});
