function initialize(){
    mainmap();
}

function mainmap(){
    var map = L.map('map').setView([51.505, -0.09], 13);
}


window.onload = initialize();