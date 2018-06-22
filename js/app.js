show_all();
//----------------Blocage menu--------------------------
$(window).scroll(function () { //Au scroll dans la fenetre on déclenche la fonction
    if ($(this).scrollTop() > 90) { //si on a défini de plus de 96 px du haut vers le bas
        $('#group').removeClass("nofixtitle");
        $('#group').addClass("fixtitle"); //on ajoute la classe "fixgauche" à <div id="gauche">
        $('#form_search').addClass("marge-sup");
        $('#form_find').addClass("marge-sup");
        $('#form_detenteur').addClass("marge-sup");
        $('#content').addClass("marge-sup");
        $('#doudou').addClass("marge-sup");
    } else {
        $('#group').removeClass("fixtitle"); //sinon on retire la classe "fixgauche" à <div id="gauche">
        $('#group').addClass("nofixtitle");
        $('#form_search').removeClass("marge-sup");
        $('#form_find').removeClass("marge-sup");
        $('#form_detenteur').removeClass("marge-sup");
        $('#content').removeClass("marge-sup");
        $('#doudou').removeClass("marge-sup");
    }
});

//----------------Bouton Rechercher--------------------------
$("#search_btn").click(function () {
    selectType();
    $("main").hide();
    $("#form_search").fadeIn("slow");
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_find").hide();
    $("#form_detenteur").hide();
});
//----------------Bouton envoi formulaire Chercher------------
$("#send_btn").click(function () {
    $("main").show();
    $("#form_search").fadeIn("slow");
});
//----------------Bouton envoi formulaire Trouver------------
$("#push_btn").click(function (e) {
    e.preventDefault();
    find_doudou();
    $("main").fadeIn("slow");
    $("#form_find").hide();
    $("#messageUtil").css({
        'position':'absolute',
        'top':'50px',
        'text-align':'center',
        'width':'100%'
    }).fadeOut(3000,'swing').addClass("alert alert-success");
    $('html').animate({scrollTop:0}, 'fast');
    document.getElementById("messageUtil").innerHTML = "Doudou créé";
});
//----------------Envoi formulaire Détenteur------------
$("#create_detenteur").click(function (e) {
    e.preventDefault();
    create_detenteur();
    $("main").fadeIn("slow");
    $("#form_detenteur").hide();
    $("#messageUtil").css({
        'position':'absolute',
        'top':'50px',
        'left':'50px'
    }).fadeOut(3000,'swing').addClass("alert alert-success");
    document.getElementById("messageUtil").innerHTML = "Détenteur créé";
});
//----------------Bouton Trouver-----------------------------
$("#find_btn").click(function () {
    selectDetenteur();
    selectType2();
    $("main").hide();
    $("#form_find").fadeIn("slow");
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_detenteur").hide();
})
//----------------Bouton Détenteur-----------------------------
$("#id_btn").click(function () {
    $("main").hide();
    $("#form_detenteur").fadeIn("slow");
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();

})
//----------------Bouton retour---------------------------------
$("back_button").click(function () {
    $("main").fadeIn("slow");
    $("#form_detenteur").hide();
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
})
//------------H1 Retour Accueil------------------------------------
var retour = document.getElementById('return');
retour.onclick = function () {
    $("main").fadeIn("slow");
    $("#form_detenteur").hide();
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
};
//----------------Bouton Geolocalisation---------------------------------
var btn_chk = document.getElementById('chkGeo_ok');
btn_chk.onclick = function () {
    navigator.geolocation.getCurrentPosition(maPosition, null, {
        enableHighAccuracy: true
    });
    $("#lieu").css("display", "none");
    $("#mess_geo").css("display", "block");
}
var btn_chk = document.getElementById('chkGeo_no');
btn_chk.onclick = function () {
    $("#mess_geo").css("display", "none");
    $("#display_adr").css("display", "none");
    $("#lieu").css("display", "block");

    eraseCoords();
    //reverseCoords();
    //console.log(longiT+" "+latiT)
}
var btn_chk = document.getElementById('detenteur');
btn_chk.onclick = function () {
    adresseToGps();
}

//-----------------messages selection photo-----------------------------------

$('#messagePhoto').addClass("alert alert-danger");
document.getElementById("messagePhoto").innerHTML = "pas de photo sélectionnée";

$("#photo").on("change",function(){
    if($("#photo").val()!=""){
        $('#messagePhoto').removeClass("alert alert-danger").addClass("alert alert-success");    
        document.getElementById("messagePhoto").innerHTML = $("#photo").val();
    }else{
        $('#messagePhoto').removeClass("alert alert-success").addClass("alert alert-danger");    
        document.getElementById("messagePhoto").innerHTML = "pas de photo sélectionnée";
    }      
})


//------------Afficher les derniers doudous entrés----------------
function show_all() {

    $.ajax({
            url: "http://localhost/doudou/doudou-sf/public/api/v1/doudous/random",
            method: "GET",
            data: {
                num: 6
            },
            dataType: 'json'
        })
        .done(function (response) {

            $("#content").empty();

            response.data.forEach(function (doudou) {
                var a = $("<a>")
                var div = $("<div>").attr("class", "image")
                var pic = $("<img>").attr("src", "http://localhost/doudou/doudou-sf/public/img/photos/" + doudou.image)
                var zoom = $("<i class=\"fas fa-search-plus\"></i>")
                a.attr("data.id", doudou.id)

                $("#content").append(a)
                div.append(pic)
                div.append(zoom)
                a.append(div)
            })

            $("#content").on("click", "a", function () {
                var id = $(this).attr("data.id")

                $("main").hide();
                $('#doudou').fadeIn("slow");
                searchDetails(id, response.data);
            });

        })
}
//--------------------Afficher détails du doudou----------------------------
function searchDetails(id, data) {

    $('#txt_details').empty();
    for (var i = 0; i < data.length; i++) {

        if (id == data[i].id) {

            $("#pic_doudou").empty();
            var pic = $("<img>").attr("src", "http://localhost/doudou/doudou-sf/public/img/photos/" + data[i].image)

            /*pic.css("width", 200)
            pic.css("height", 300)
            pic.css("border", "2px solid white")
            pic.css("border-radius", "25px")*/

            var color = data[i].color
            var date = data[i].dateFind
            var place = data[i].placeFind
            var type = data[i].type.label
            var lat = data[i].lat
            var lng = data[i].lng

            $("#pic_doudou").append(pic);
            $("#txt_details").append(

                `<div id ="show_details">
                    <p> Couleur : ${color} </p>
                    <p> Lieu de decouverte :${place} </p>
                    <p> Type du doudou : ${type} </p>                                
                </div>`);

            $("#contact").empty();
            var prenom = data[i].personne.prenom
            var nom = data[i].personne.nom
            var email = data[i].personne.email

            $("#contact").append(
                `<div id="show_contact">
                    <p> ${prenom} ${nom} </p>
                    <p><b>Pour le contacter : </b></p>
                    <a href="mailto:${email}"> ${email} </a>
                </div>`);
        }

    }
    initMap(lat, lng);
}

//--------------------créer un doudou----------------------------
function find_doudou() {
    var file_data = $("#photo").prop("files")[0];
    var couleur = $("#color");
    var lieu = $("#lieu");
    var type = $("#options_type2");
    var detenteur = $("#detenteur");
    var form_data = new FormData($('#find_doudou').get(0));
    form_data.append("file", file_data);
    form_data.append("text", couleur);
    form_data.append("text", lieu);
    form_data.append("text", type);
    form_data.append("text", detenteur);
    $.ajax({
        url: "http://localhost/doudou/doudou-sf/public/api/v1/doudou/",
        dataType: 'json', // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (php_script_response) {
            alert(php_script_response); // display response from the PHP script, if any
        }
    })
    console.log($("#find_doudou").serialize());
    console.log(file_data);

}
//-------------------------Créer un détenteur-------------------------------
function create_detenteur() {
    $.ajax({
        url: "http://localhost/doudou/doudou-sf/public/api/v1/detenteur/",
        method: "POST",
        data: $("#ajout_detenteur_form").serialize(),
    })
}
//----------------------------Afficher carte--------------------------------
function initMap(latitude, longitude) {
    var uluru = {
        lat: (parseFloat(latitude)),
        lng: (parseFloat(longitude))
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}
//------------------------Création des choix des détenteurs du formulaire trouvé-------------------------------
function selectDetenteur() {
    $.ajax({
            url: "http://localhost/doudou/doudou-sf/public/api/v1/detenteurs",
            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {

            $("#detenteur").empty();

            response.data.forEach(function (detenteur) {
                var prenom = detenteur.prenom
                var nom = detenteur.nom
                var option = $(`<option value="${detenteur.id}">${prenom} ${nom}</option>`)

                $("#detenteur").append(option)
            })
        })

}
//----------------------------Afficher carte--------------------------------
function initMap(latitude, longitude) {
    var uluru = {
        lat: (parseFloat(latitude)),
        lng: (parseFloat(longitude))
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}
//------------------------Création des choix des détenteurs du formulaire trouvé-------------------------------
function selectDetenteur() {
    $.ajax({
            url: "http://localhost/doudou/doudou-sf/public/api/v1/detenteurs",
            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {
            $("#detenteur").empty();

            response.data.forEach(function (detenteur) {
                var prenom = detenteur.prenom
                var nom = detenteur.nom
                var option = $(`<option value="${detenteur.id}">${prenom} ${nom}</option>`)

                $("#detenteur").append(option)
            })
        })
}
//------------------------Création des choix des types form recherche -------------------------------
function selectType() {
    $.ajax({
            url: "http://localhost/doudou/doudou-sf/public/api/v1/types",
            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {

            $("#options_type").empty();

            response.data.forEach(function (type) {
                var label = type.label
                var option = $(`<div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="${type.id}" value="${type.id}" checked>
                                <label class="form-check-label" for="${type.id}">${type.label}</label>
                            </div>`)

                $("#options_type").append(option)
            })
        })
}

//------------------------Création des choix des types form trouver -------------------------------
function selectType2() {
    $.ajax({
            url: "http://localhost/doudou/doudou-sf/public/api/v1/types",
            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {

            $("#options_type2").empty();
            response.data.forEach(function (type) {
                var label = type.label
                var option = $(`<div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="${type.id}" value="${type.id}" checked>
                                <label class="form-check-label" for="${type.id}">${type.label}</label>
                            </div>`)

                $("#options_type2").append(option)
            })
        })
}
//------------------------Geolocalisation-------------------------------

function maPosition(position) {
    $("#coords").empty();

    longiT = position.coords.longitude;
    latiT = position.coords.latitude;
    var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", longiT);
    var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", latiT);
    $("#coords").append(putLongiT);
    $("#coords").append(putLatiT);
    console.log(longiT + " " + latiT)
    if (longiT != 0 && latiT != 0) {
        setTimeout(function () {
            document.getElementById("geo_ok").style.display = "block";
        }, 500);
    } else {
        $("#geo_notOk").fadeIn("slow")
    }
    gpsToAdresse(longiT, latiT);
}

function adresseToGps() {
    var adresse = document.getElementById("lieu").value;
    console.log(adresse)
    $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + adresse + "&key=AIzaSyDgZVvYJAifmwwN-ufui1FjaDFcbOXEVpw",

            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {

            console.log(response.results[0].geometry.location.lat)
            console.log(response.results[0].geometry.location.lng)

            longiT = response.results[0].geometry.location.lng;
            latiT = response.results[0].geometry.location.lat;
            var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", longiT);
            var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", latiT);
            $("#coords").append(putLongiT);
            $("#coords").append(putLatiT);
            console.log(longiT + " " + latiT)


        })
}

function gpsToAdresse(lng, lat) {
    console.log(lng + " " + lat);
    $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDgZVvYJAifmwwN-ufui1FjaDFcbOXEVpw",
            method: "GET",
            dataType: 'json'
        })
        .done(function (response) {
            var adresse = (response.results[0].formatted_address)
            console.log("l'adresse est " + adresse)
            if (adresse == "48 Rue Gambetta , 44000 Nantes , France") {
                console.log("je suis dans l'adresse")
                $("#display_adr").empty();
                adresse = " EPSI 16, boulevard Général de Gaulle 44200 Nantes"
                var putadresse = $("<input id=\"adresse\"  name=\"adresse\">").attr("value", adresse)
                putadresse.css("width", "100%")
                $("#display_adr").append(putadresse)
                var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", -1.5394009000000324);
                var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", 47.2060207);
                $("#coords").append(putLongiT);
                $("#coords").append(putLatiT);
                console.log(longiT + " " + latiT)
            } else {
                var putadresse = $("<input id=\"adresse\"  name=\"adresse\">").attr("value", adresse)
                putadresse.css("width", "100%")
                $("#display_adr").append(putadresse)
            }
        })

}


// This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('lieu')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
       // autocomplete.addListener('place_changed', fillInAddress);
      }

    
function eraseCoords() {
    $("#coords").empty();
    var latiT = 0;
    var longiT = 0;
    var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", longiT);
    var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", latiT);
    $("#coords").append(putLongiT);
    $("#coords").append(putLatiT);
}
