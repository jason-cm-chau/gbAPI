
function clickSearchBtn() {
    const btn = document.querySelector('.btn-search');
    btn.classList.add('spinner')
    btn.style.backgroundColor = "#242424";
    showSearchBtn();
}

function showSearch(ele) {
    if (event.key == 'Enter') {
        if (ele.value == "") {
            return;
        }
        var name = ele.value.split(' ');
        localStorage.setItem("search", name);
        localStorage.setItem("route", true);
        window.location.href = "find_your_car.html";
    }
}

function showSearchBtn() {
    var ele = document.querySelector('.search');
    var name = ele.value.split(' ');
    localStorage.setItem("search", name);
    localStorage.setItem("route", true);
    window.location.href = "find_your_car.html";
}