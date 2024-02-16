import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from "./cat-api"

axios.defaults.headers.common["x-api-key"] = "live_fXTth1hft5ldfzkzbiuOdjpCmH4c7kVuOQpRCV0b2x1LG1lpYu9JGjRYS7ycvmGp";

const select = document.querySelector(".breed-select")
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
console.log(select, loader, error, catInfo)

function drawSelect() {
    fetchBreeds()
    .then((data) => {
        // console.log(data)
    
        const selectOptions = data.map((data, name) => {
            // console.log(data.id, data.name)
            return `<option value="${data.id}">${data.name}</option>`
        })
        select.insertAdjacentHTML("afterbegin", selectOptions)
    })
    .catch((error) => console.error('There was a problem with the fetch operation:', error))
}

function changeSelect(e) {
    const breedId = e.currentTarget.value
    // console.log(breedId)

        fetchCatByBreed(breedId)
        .then(data => {
            // console.log("bez destrukturyzacji", data[0].breeds, data[0].url)

            const {breeds, url} = data[0]
            // console.log("po destrukturyzacji", breeds, url)

            const {name, description, temperament} = breeds[0]
            // console.log(name, "___________________", description, "___________________", temperament)

            catInfo.innerHTML = `
            <img src="${url}" alt="${name} width="200px""/>
            <div class="box">
                <h2>${name}</h2>
                <p>${description}</p>
                <p>
                    <strong>Temperament: </strong>
                    ${temperament}
                </p>
            </div>`;

           

    
        })
        .catch((error) => console.error('There was a problem with the fetch operation:', error))
    
    
}






drawSelect();
select.addEventListener("change", changeSelect)



