const API_KEY = '563492ad6f91700001000001de2cf1717ffb4b9e869463eb3ad275bc'

const input = document.querySelector('input')
const searchButton = document.querySelector('.search_button')
const showMore = document.querySelector('.show_more')

// initial values
let pageNumber = 1
let searchText = ""
let search = false

// event listeners
input.addEventListener('input', function(evt){
    evt.preventDefault()
    searchText = evt.target.value;
})

searchButton.addEventListener('click', function(){
    if (searchText === '') {
        alert("please input some text to search")
        return;
    }
    clearGallery()
    search = true;
    searchPhotos(searchText, pageNumber)
})

// clear the gallery

function clearGallery() {
    document.querySelector('.display_images').innerHTML = ""
    pageNumber = 1
}

// fetching images from API

async function curatedPhotos () {
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}`, {
        method: 'GET' ,
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })

    const response = await data.json()
    console.log(response)
    displayImages(response)
}

// display images function

function displayImages(response) {
    response.photos.forEach((image) => {
        // do something
        const photo = document.createElement('div')
        photo.innerHTML=`
        <img src = ${image.src.large}>
        <figcaption>Photo by: ${image.photographer}</figcaption>
        `
        document.querySelector('.display_images').appendChild(photo)
        })
}

// search functionality

async function searchPhotos (query, pageNumber) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}`, {
        method: 'GET',
        headers: {
            Accept:'application/json',
            Authorization: API_KEY
        }
    })

    const response = await data.json()
    displayImages(response)
}

// show more functionality

function showMoreImages () {
    showMore.addEventListener('click' , () => {
        if(!search) {
            pageNumber++;
            curatedPhotos(pageNumber)
        }
        else {
            if(searchText.value === '') {
                pageNumber++ ;
                searchPhotos(searchText, pageNumber)
                return;
            }
        }
    })
}

curatedPhotos(pageNumber)