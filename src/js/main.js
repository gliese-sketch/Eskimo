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
  let breeds = JSON.parse(localStorage.getItem("breeds"));

  if (!breeds) {
    try {
      const res = await fetch(`${BASE_URL}breeds/list/all`);
      const data = await res.json();
      localStorage.setItem("breeds", JSON.stringify(data.message));
      breeds = data.message;
    } catch (err) {
      console.error("Error occured", err);
    }
  }

  return breeds;
}

// Fetch a single dog breed image
async function getDogImage(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images/random`);
    const data = await res.json();
    return data.message;
  } catch (error) {
    return console.error(error);
  }
}

// === MARK: Render
async function renderSelect() {
  const dogsList = await getDogsList();

  const fragment = document.createDocumentFragment();

  console.log(dogsList);

  Object.keys(dogsList).forEach((dogName) => {
    fragment.appendChild(Option(dogName));
  });

  breedListEl.append(fragment);
}

async function renderImage(breed) {
  imageEl.src = "loading.gif";

  const dogImage = await getDogImage(breed);
  imageEl.src = dogImage;
  imageEl.alt = breed;
}

// === MARK:  Events
breedListEl.addEventListener("change", async (e) => {
  const currentValue = e.target.value;
  renderImage(currentValue);
});

// === Render on inital load
document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
});
