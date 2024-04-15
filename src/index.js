import SlimSelect from 'slim-select'
import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from "./cat-api"
import Notiflix from 'notiflix';

const select = document.querySelector(".breed-select")
const catInfo = document.querySelector(".cat-info")
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")

const style = document.createElement("style")
style.textContent = ".is-hidden{display : none;}"
document.head.appendChild(style)

loader.classList.add("is-hidden")
error.classList.add("is-hidden")



const drawSelect = async () => {
  try{

    loader.classList.toggle("loader", "is-hidden")

    const data = await fetchBreeds()
    const selectOptions = data.map((e) =>{
      return `<option value="${e.id}" >${e.name}</option>`
    })
    select.innerHTML = selectOptions.join("")
  } catch(e){
    console.log(errorHandler)
  } 
}

const changeHandler = async (e) => {
  e.preventDefault()

  loader.classList.toggle("is-hidden", "loader")
  select.classList.add("is-hidden")
  catInfo.classList.add("is-hidden")

  const breedId = e.currentTarget.value

  try{
    const data = await fetchCatByBreed(breedId)
    console.log(data[0])
    const {breeds, url} = data[0]
    const {name, description, temperament} = breeds[0]
    catInfo.innerHTML = `
    <img src="${url}" alt="${description}" width="600" />
    <div class="box"> 
      <h2>${name}</h2>
      <p>${description}</p>
      <p>
        <strong>Temperament:</strong>
        ${temperament}
      </p>
    </div>
    `;
    catInfo.classList.remove("is-hidden")
    select.classList.remove("is-hidden")

    Notiflix.Notify.info('Loading data, please wait...', {
      timeout: 1000,
    });


  } catch(e){
    console.log(errorHandler)
  }
}


function errorHandler() {
  breedSel.classList.remove('is-hidden');
  loader.classList.toggle('loader', 'is-hidden');
  catInfo.style.filter = "blur(8px)";
  catInfo.style.webkitFilter = "blur(8px)";
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reload the page or select another cat breed!', {
      timeout: 2000,
    })
}

catInfo.style.fontSize = "40px"
catInfo.style.display = "flex"
catInfo.style.gap = "50px"
select.style.fontSize = "40px"
select.style.marginBottom = "30px"


drawSelect()
select.addEventListener("change", changeHandler)