import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from "./cat-api"

axios.defaults.headers.common["x-api-key"] = "live_fXTth1hft5ldfzkzbiuOdjpCmH4c7kVuOQpRCV0b2x1LG1lpYu9JGjRYS7ycvmGp";

const select = document.querySelector(".breed-select")
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const box = document.querySelector(".content-box")
// console.log(select, loader, error, catInfo)

const style = document.createElement("style")
style.textContent = '.is-hidden{display : none;}'
document.head.appendChild(style)

loader.classList.add("is-hidden")
error.classList.add("is-hidden")


catInfo.style.fontSize = "40px"
catInfo.style.display = "flex"
catInfo.style.gap = "50px"
select.style.fontSize = "40px"
select.style.marginBottom = "30px"
box.style.marginLeft = "50px"



function drawSelect() {
    fetchBreeds()
    .then((data) => {
       
        loader.classList.toggle("loader", "is-hidden")
        // console.log(data)
    
        const selectOptions = data.map((data, name) => {
            // console.log(data.id, data.name)
            return `<option value="${data.id}">${data.name}</option>`
        })
        select.insertAdjacentHTML("afterbegin", selectOptions)
    })
    .catch(errorHandler)
}

function changeSelect(e) {
    e.preventDefault();

    loader.classList.toggle('is-hidden', 'loader');
    select.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');


    const breedId = e.currentTarget.value
    // console.log(breedId)

    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.toggle('loader', 'is-hidden');
        select.classList.remove('is-hidden');
        // console.log("bez destrukturyzacji", data[0].breeds, data[0].url)

        const {breeds, url} = data[0]
        // console.log("po destrukturyzacji", breeds, url)

        const {name, description, temperament} = breeds[0]
        // console.log(name, "___________________", description, "___________________", temperament)

        catInfo.innerHTML = `
        <img src="${url}" alt="${name}" width="600"/>
        <div class="box">
            <h2>${name}</h2>
            <p>${description}</p>
            <p>
                <strong>Temperament: </strong>
                ${temperament}
            </p>
        </div>`;

        catInfo.classList.remove('is-hidden');

        Notiflix.Notify.info('Loading data, please wait...', {
            timeout: 1000,
          });
        })
    .catch(errorHandler)


   
}

function errorHandler() {
    breedSel.classList.remove('is-hidden');
    loader.classList.toggle('loader', 'is-hidden');
    catInfo.style.filter = "blur(8px)";
    catInfo.style.webkitFilter = "blur(8px)";
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reload the page or select another cat breed!', {
        timeout: 2000,
      }
    );
  };


drawSelect();
select.addEventListener("change", changeSelect)



