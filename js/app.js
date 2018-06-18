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
    selectType();
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
    selectType2();
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
    initMap(lat, lng);    
}
//--------------------créer un doudou----------------------------
function find_doudou() {
    var file_data = $("#photo").prop("files")[0]; 
    var couleur = $("#color"); 
    var lieu = $("#lieu");
    var type = $("#type");
    var detenteur = $("#detenteur");
    var form_data = new FormData($('#find_doudou').get(0));
    form_data.append("file", file_data);
    form_data.append("text", couleur);
    form_data.append("text", lieu);
    form_data.append("text", type);
    form_data.append("text", detenteur);
    $.ajax({
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/doudou/",
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            alert(php_script_response); // display response from the PHP script, if any
        }
    })
    console.log($("#find_doudou").serialize());
    console.log(file_data);
}
//-------------------------Créer un détenteur-------------------------------
function create_detenteur(){
    $.ajax({
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/detenteur/",
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
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/detenteurs",
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
function selectType(){
    $.ajax({
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/types",
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
function selectType2(){
    $.ajax({
        url: "http://localhost:/doudou/doudou-sf/public/api/v1/types",
        method: "GET",
        dataType: 'json'
    })
    .done(function (response) {

        $("#options_type2").empty();

        response.data.forEach(function (type) {
            var label = type.label
            var option = $(`<div class="form-check">
                                <input class="form-check-input" type="radio" name="type" id="${type.id}b" value="${type.id}" checked>
                                <label class="form-check-label" for="${type.id}b">${type.label}</label>
                            </div>`)

            $("#options_type2").append(option)
        })
    })
}
