function clear(){
    const books = document.getElementById("content");
    while(books.lastElementChild)
    {
        books.removeChild(books.lastElementChild);
    }
}

if(localStorage.getItem("route")){
    var book = localStorage.getItem("search");
    var item = book.split(',');
    console.log(item);
    var direct = "https://www.googleapis.com/books/v1/volumes?q=";
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


function handleResponse(file) {
    for (var i = 0; i < file.items.length; i++) {
        var div = document.createElement("div");
        div.classList.add("book");

        var item = file.items[i];

        var hyperlink = document.createElement("a");
        var bookLink = item.volumeInfo.infoLink;

        hyperlink.classList.add("book__link");
        hyperlink.classList.add("link__hover--effect");
        hyperlink.href = `${bookLink}`;
        hyperlink.target = "_blank";

        var hyperlink2 = document.createElement("a");

        // hyperlink2.classList.add("book__link");
        hyperlink2.href = `${bookLink}`;
        hyperlink2.target = "_blank";


        var img = document.createElement("img");
        img.src = item.volumeInfo.imageLinks.thumbnail;
        img.classList.add("book__thumbnail");

        hyperlink2.appendChild(img);

        var ratingsDiv = calculateStars(item);

        var p = document.createElement("p");
        p.classList.add("book__desc");
        p.innerHTML = item.volumeInfo.title;
        hyperlink.appendChild(p);

        div.appendChild(hyperlink2);
        div.appendChild(ratingsDiv);
        div.appendChild(hyperlink);

        document.getElementById("content").appendChild(div);
    }
}

function calculateStars(item) {
    var ratings =
        item.volumeInfo.averageRating === undefined ? 0 : item.volumeInfo.averageRating;
    var ratingsDiv = document.createElement("div");
    ratingsDiv.classList.add("ratings");

    if (ratings === 0) {
        for (var x = 0; x < 5; x++) {
            var emptyStar = document.createElement("i");
            emptyStar.classList.add("far");
            emptyStar.classList.add("fa-star");

            ratingsDiv.appendChild(emptyStar);
        }
    }
    else {
        for (var x = 0; x < Math.floor(ratings); x++) {
            var filledStar = document.createElement("i");

            filledStar.classList.add("fas");
            filledStar.classList.add("fa-star");
            ratingsDiv.appendChild(filledStar);
        }

        if (ratings - Math.floor(ratings) > 0) {
            var halfStar = document.createElement("i");
            halfStar.classList.add("fas");
            halfStar.classList.add("fa-star-half-alt");
            ratingsDiv.appendChild(halfStar);
        }
        var missingStars = 5 - ratingsDiv.childElementCount;
        for (var y = 0; y < missingStars; y++) {
            var emptyStar = document.createElement("i");
            emptyStar.classList.add("far");
            emptyStar.classList.add("fa-star");

            ratingsDiv.appendChild(emptyStar);
        }
    }
    var starNum = document.createElement("p");
    starNum.innerHTML = `(${ratings})`;
    ratingsDiv.appendChild(starNum);


    return ratingsDiv;
}