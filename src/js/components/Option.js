import { capitalize } from "../utils";

export default function (breed) {
  const option = document.createElement("option");
  option.textContent = capitalize(breed);
  option.value = breed;
  return option;
}
