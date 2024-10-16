// MARK: Imports
import Option from "./components/Option";

// https://dog.ceo/api/breed/affenpinscher/images/random
// https://dog.ceo/api/breeds/list/all

const BASE_URL = `https://dog.ceo/api/`;

// === MARK: DOM Selection
const breedListEl = document.querySelector("#data-breed-list");
const imageEl = document.querySelector("img");

// === MARK: Fetch
async function getDogsList() {
  try {
    const res = await fetch(`${BASE_URL}breeds/list/all`);
    const data = await res.json();
    return data.message;
  } catch (err) {
    console.error("Error occured", err);
  }
}

// Fetch a single dog breed image
function getDogImage(breed) {
  return fetch(`${BASE_URL}breed/${breed}/images/random`)
    .then((res) => res.json())
    .then((data) => data.message)
    .catch((error) => console.error(error));
}

// === MARK: Render
function renderSelect() {
  getDogsList().then((breedList) => {
    for (let breed in breedList) {
      breedListEl.appendChild(Option(breed));
    }
  });
}

function renderImage(breed) {
  getDogImage(breed).then((data) => {
    // image mein render karna hai
    imageEl.src = data;
  });
}

renderImage("poodle");

renderSelect();
