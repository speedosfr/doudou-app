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
//----------------Bouton Trouver-----------------------------
$("#find_btn").click(function () {
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
//------------H1 Retour Accueil------------------------------------
var retour = document.getElementById('return');
retour.onclick = function() {
    $("main").fadeIn( "slow" );
    $("#form_detenteur").hide();
    $('#details_doudou').hide();
    $('#doudou').hide();
    $("#form_search").hide();
    $("#form_find").hide();
};
//------------Afficher les derniers doudous entrés----------------
function show_all() {

    $.ajax({
            url: "http://localhost:/doudou/doudou-sf/public/api/v1/doudous/random",
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
                var pic = $("<img>").attr("src", "http://localhost:/doudou/doudou-sf/public/img/photos/" + doudou.image)
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
            var pic = $("<img>").attr("src", "http://localhost:/doudou/doudou-sf/public/img/photos/" + data[i].image)
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
    initMap();    
}
//--------------------Afficher détails du doudou----------------------------
function find_doudou() {
    $.ajax({
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/doudou/",
        method: "POST",
        data: $("#find_doudou").serialize(),
    })
}

function initMap(latitude, longitude) {
    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    }); 
   
  }
  
