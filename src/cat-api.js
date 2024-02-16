const API_KEY = "live_fXTth1hft5ldfzkzbiuOdjpCmH4c7kVuOQpRCV0b2x1LG1lpYu9JGjRYS7ycvmGp"
const apiKeyValue = `api_key=${API_KEY}`

export function fetchBreeds() {
    return fetch ( `https://api.thecatapi.com/v1/breeds?${apiKeyValue}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error(response.status)
        }
        return response.json();
    })
    
}

export function fetchCatByBreed(breedId) {
    return fetch( `https://api.thecatapi.com/v1/images/search?${apiKeyValue}&breed_ids=${breedId}`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status)
        } 
        return response.json();
    })
}

