let wordToSearch = "";

const watchSubmit = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const search = data.get("search");
    wordToSearch = search;
    apiCall(wordToSearch);
  });
};

const apiCall = (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("not found");
      }
      return response.json();
    })
    .then((data) => {
      const wordInformations = data[0];
      const word = wordInformations.word;
      const phonetics = findProp(wordInformations.phonetics, "text");
      console.log("word", phonetics);
      // prononciation audio
      const pronon = findProp(wordInformations.phonetics, "audio");
      console.log("pronom", pronon);
      const meanings = wordInformations.meanings
      console.log("meanings", meanings);
      

    })
    .catch((error) => {
      if (error.message === "not found") {
        alert("The word does not exist.");
      } else {
        console.error(error);
      }
    });
};

const findProp = (array, name) => {
  for (let i = 0; i < array.length; i++) {
    const currentObject = array[i];
    const hasProp = currentObject.hasOwnProperty(name)
    if (hasProp) {
      // console.log("has :" , hasProp, i )
      return currentObject[name];
    }
    
  }
  return null;
};

watchSubmit();
