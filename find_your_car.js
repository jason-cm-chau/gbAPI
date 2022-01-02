function clear(){
    //removes all books everytime user searches
    const books = document.getElementById("content");
    while(books.lastElementChild)
    {
        books.removeChild(books.lastElementChild);
    }
}

if(localStorage.getItem("route")){
    //checks if user had inputed a value from homepage and takes the value to search through database
    var book = localStorage.getItem("search"); 
    var item = book.split(','); //value taken from user is comma seperated depending on the # of words, so this seperates elements by ,
    var direct = "https://www.googleapis.com/books/v1/volumes?q=";

    //loop through each element of item and add it onto the direct
    for (var x = 0; x < item.length; x++) { 
        direct += item[x];
        if (x < (item.length - 1)) {
            direct += "+";
        }
    }
    bookAPI(direct);
}
function emptySearch(){
    document.querySelector('.search').value = "";
}
// "https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse"
function search(ele) {
    if (event.key === 'Enter') {
        if(ele.value ==""){
            return;
        }
  
        clear();

        var book = ele.value;
        var item = book.split(',');
        console.log(item);
        var direct = "https://www.googleapis.com/books/v1/volumes?q=";
        for (var x = 0; x < item.length; x++) {
            direct += item[x];
            if (x < (item.length - 1)) {
                direct += "+";
            }
        }
        console.log(direct)
        bookAPI(direct);
    }
}


function findBook() {
    clear();
    const searchBar = document.querySelector('.search');

    var name = searchBar.value.split(' ');

    var direct = "https://www.googleapis.com/books/v1/volumes?q=";
    for (var x = 0; x < name.length; x++) {
        direct += name[x];
        if (x < (name.length - 1)) {
            direct += "+";
        }
    }

    bookAPI(direct);
}

async function bookAPI(result) {
    const books = await fetch(result);
    const file = await books.json();

    document.getElementById("content").classList.add("books");
    document.getElementById("content").classList.add("row");
    handleResponse(file);
}

function bookToHtml(book){
    return `
    <div class="book flex__column--align">
        <a href=${book.volumeInfo.infoLink} target="_blank">
        ${book.volumeInfo.imageLinks !==undefined ? `<img src=${book.volumeInfo.imageLinks.thumbnail} class=""book__thumbnail></img>`: 'Thumbnail doesnt exist'}
            
        </a>
        <div class="book__desc flex__column--align">
            ${calculateStars(book)}
            <a class="book__link link__hover--effect"
            href=${book.volumeInfo.infoLink} target="_blank">
            <p class="book__para">${book.volumeInfo.title}</p>
            </a>
        </div>
    </div>
    `
}

function handleResponse(file) {
    const {items} = file
    const content = document.getElementById("content")
    content.innerHTML = items.map((book)=> bookToHtml(book)).join("")
}

function starsToHtml(stars, ratings){
    return `<div class="ratings">
    ${stars.join("").split(',')}
    <p>(${ratings})</p>
    </div>`
}
function calculateStars(item) {
    var ratings =
        item.volumeInfo.averageRating === undefined ? 0 : item.volumeInfo.averageRating;

    if (ratings === 0) { //if no ratings create 5 empty stars
        const stars = []
        for (var x = 0; x < 5; x++) {
            stars.push(`<i class="far fa-star"></i>`)
        }
        return starsToHtml(stars, ratings)
    }
    else {
        const stars = []
        //create filled star for the number of ratings
        for (var x = 0; x < Math.floor(ratings); x++) {
            stars.push(`<i class="fas fa-star"></i>`)
        }

        if (ratings - Math.floor(ratings) > 0) {
            stars.push(`<i class="fas fa-star-half-alt"></i>`)
        }
         var missingStars = 5 - stars.length;
        for (var y = 0; y < missingStars; y++) {
            stars.push(`<i class="far fa-star"></i>`)
        }
        return starsToHtml(stars, ratings)
    }
}