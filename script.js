// let wordToSearch = "";

const watchSubmit = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const search = data.get("search");
    const wordToSearch = data.get("search");
    apiCall(wordToSearch);
  });
};

// envoyer mon mot à l'api
const apiCall = (word) => {
  console.log("wrd to search", word);
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/${word}')
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
    });
};

watchSubmit();
