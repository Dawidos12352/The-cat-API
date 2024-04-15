const API_KEY = "live_gUcSy5zWvC7Mmv1jTHxE7wU3in5OO3U2FbHVsjtSWHF4b2UfxyMPaWkkjHE7sKEb"

export const fetchBreeds = async () => {
    try{
        const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`)
        if(!response.ok){
            throw new Error("Error in response from network!")
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    } 
}

export const fetchCatByBreed = async (breedId) => {
    try{
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        if(!response.ok){
            throw new Error("Error in response from network!")
        }
        return await response.json()
       
    } catch(error){
        console.log(error)
    }
}

