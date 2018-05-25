

$("#search_btn").click(function(){
    $("main").css("display","none");
    $('#form_search').css("display","block");
    console.log("je passe devant le bouton");
});
$("#send_btn").click(function(){
    $("main").css("display","block");
    $('#form_search').css("display","none");
    console.log("je passe devant le envoyer");
});

//Gestion position GPS
function CurrentPosition(position) {
    var currentLat = position.coords.latitude;
    var currentLong = position.coords.longitude;

    var initMap = function (longitude,latitude) {
        var myLatLng = {lat: currentLat, lng: currentLong};

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude , lng: longitude},
            zoom: 15
        });

        //Gestion d'un marker sur la GMap

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });




        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,

            map: map,
            title: 'Votre position actuelle'
        });


    };
    initMap(position.coords.longitude,position.coords.latitude);
}

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(CurrentPosition);













