show_all();
//----------------Blocage menu--------------------------
$(window).scroll(function () {//Au scroll dans la fenetre on déclenche la fonction
    if ($(this).scrollTop() > 90) { //si on a défini de plus de 96 px du haut vers le bas
        $('#group').removeClass("nofixtitle");
        $('#group').addClass("fixtitle"); //on ajoute la classe "fixgauche" à <div id="gauche">
        $('#form_search').addClass("marge-sup");
        $('#form_find').addClass("marge-sup");
        $('#form_detenteur').addClass("marge-sup");
        $('#content').addClass("marge-sup");
        $('#doudou').addClass("marge-sup");
    } else {
        $('#group').removeClass("fixtitle");//sinon on retire la classe "fixgauche" à <div id="gauche">
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
    $("main").hide();
    $("#form_search").fadeIn( "slow" );
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_find").hide();
    $("#form_detenteur").hide();
});
//----------------Bouton envoi formulaire Chercher------------
$("#send_btn").click(function () {
    $("main").show();
    $("#form_search").fadeIn( "slow" );
});
//----------------Bouton envoi formulaire Trouver------------
$("#push_btn").click(function (e) {
    e.preventDefault();
    find_doudou();
    $("main").fadeIn( "slow" );
    $("#form_find").hide();
});
//----------------Envoi formulaire Détenteur------------
$("#create_detenteur").click(function (e) {
    e.preventDefault();
    create_detenteur();
    $("main").fadeIn( "slow" );
    $("#form_detenteur").hide();
});
//----------------Bouton Trouver-----------------------------
$("#find_btn").click(function () {
    selectDetenteur();
    $("main").hide();
    $("#form_find").fadeIn( "slow" );
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_detenteur").hide();
})
//----------------Bouton Détenteur-----------------------------
$("#id_btn").click(function () {
    $("main").hide();
    $("#form_detenteur").fadeIn( "slow" );
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
   
})
//----------------Bouton retour---------------------------------
$("back_button").click(function () {
    $("main").fadeIn( "slow" );
    $("#form_detenteur").hide();
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
})
//------------Bouton Retour Accueil------------------------------------
var retour = document.getElementById('return');
retour.onclick = function() {
    $("main").fadeIn( "slow" );
    $("#form_detenteur").hide();
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
};
//----------------Bouton Geolocalisation---------------------------------
var btn_chk = document.getElementById('chkGeo_ok');
btn_chk.onclick = function() {
    navigator.geolocation.getCurrentPosition(maPosition);
    $("#lieu").css("display","none");
    $("#mess_geo").css("display","block");
    }
var btn_chk = document.getElementById('chkGeo_no');
    btn_chk.onclick = function() {
    $("#mess_geo").css("display","none");   
    $("#lieu").css("display","block");
    //eraseCoords();
    //reverseCoords();
    //console.log(longiT+" "+latiT)
    }
    var btn_chk = document.getElementById('detenteur');
    btn_chk.onclick = function() {
        console.log("je suis la")
     adresseToGps();   
    }
//------------Afficher les derniers doudous entrés----------------
function show_all() {

    $.ajax({
            url: "http://localhost:8082/doudou/doudou-sf/public/api/v1/doudous/random",
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
                var pic = $("<img>").attr("src", "http://localhost:8082/doudou/doudou-sf/public/img/photos/" + doudou.image)
                var zoom =$("<i class=\"fas fa-search-plus\"></i>")
                a.attr("data.id", doudou.id)

                $("#content").append(a)
                div.append(pic)
                div.append(zoom)
                a.append(div)
            })

            $("#content").on("click", "a", function () {
                var id = $(this).attr("data.id")

                $("main").hide();
                $('#doudou').fadeIn( "slow" );
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
            var pic = $("<img>").attr("src", "http://localhost:8082/doudou/doudou-sf/public/img/photos/" + data[i].image)
            /*pic.css("width", 200)
            pic.css("height", 300)
            pic.css("border", "2px solid white")
            pic.css("border-radius", "25px")*/

            var color = data[i].color
            var date = data[i].dateFind
            var place = data[i].placeFind
            var type = data[i].type
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
//--------------------Afficher détails du doudou----------------------------
function find_doudou() {
    $.ajax({
        url: "http://localhost:8082/doudou/doudou-sf/public/api/v1/doudou/",
        method: "POST",
        data: $("#find_doudou").serialize(),
    })
    console.log($("#find_doudou").serialize());
}
//-------------------------Créer un détenteur-------------------------------
function create_detenteur(){
    $.ajax({
        url: "http://localhost:8082/doudou/doudou-sf/public/api/v1/detenteur/",
        method: "POST",
        data: $("#ajout_detenteur_form").serialize(),
    })
}
//----------------------------Afficher carte--------------------------------
function initMap(latitude, longitude) {
    var uluru = {lat: (parseFloat(latitude)), lng: (parseFloat(longitude))};
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
function selectDetenteur(){
    $.ajax({
        url: "http://localhost:8082/doudou/doudou-sf/public/api/v1/detenteurs",
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
//------------------------Geolocalisation-------------------------------

    function maPosition(position) {
        $("#coords").empty();        
        
        longiT = position.coords.longitude;
        latiT   = position.coords.latitude; 
        var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", longiT);
        var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", latiT);
        $("#coords").append(putLongiT);
        $("#coords").append(putLatiT); 
        console.log(longiT+" "+latiT)
        if(longiT !=0 && latiT !=0) {
            setTimeout(function()  {
        document.getElementById("geo_ok").style.display = "block";
        }, 1500);            
        }else{
            $("#geo_notOk").fadeIn( "slow" )            
        }      
      }   

    function adresseToGps() {
        var adresse = document.getElementById("lieu").value;
        console.log(adresse)
        $.ajax({
            url : "https://maps.googleapis.com/maps/api/geocode/json?address="+adresse+"&key=AIzaSyDgZVvYJAifmwwN-ufui1FjaDFcbOXEVpw",
            
            method : "GET",
            dataType: 'json'        
        })
        .done(function (response) {
            
        console.log(response.results[0].geometry.location.lat)
        console.log(response.results[0].geometry.location.lng)    
        
        longiT = response.results[0].geometry.location.lng;
        latiT   = response.results[0].geometry.location.lat; 
        var putLongiT = $("<input id=\"longitude\"  name=\"longitude\">").attr("value", longiT);
        var putLatiT = $("<input id=\"latitude\" name=\"latitude\" >").attr("value", latiT);
        $("#coords").append(putLongiT);
        $("#coords").append(putLatiT); 
        console.log(longiT+" "+latiT)


    })
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
  

    