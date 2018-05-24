show_all();

$("#search_btn").click(function () {
    $("main").css("display", "none");
    $('#form_search').css("display", "block");
    console.log("je passe devant le bouton");
});
$("#send_btn").click(function () {
    $("main").css("display", "block");
    $('#form_search').css("display", "none");
    console.log("je passe devant le envoyer");
});


function show_all() {

    $.ajax({
            url: "http://localhost:8082/Doudou/doudou-sf/public/api/v1/doudous",
            method: "GET",
            dataType: 'json',
        })
        .done(function (response) {

            $("#content").empty();

            response.data.forEach(function (doudou) {
                var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + doudou.image)
                pic.css("width", 200)
                pic.css("height", 300)
                pic.css("border", "2px solid white")
                pic.css("border-radius", "25px")
                pic.attr("data.id", doudou.id)

                $("#content").append(pic)
            })

            $("#content").on("click", "img", function () {
                var id = $(this).attr("data.id")
                console.log(id)
                $("main").css("display", "none");
                $("#titre").css("display", "none");
                $('#details_doudou').css("display", "block");
                searchDetails(id)
            });

            function searchDetails(id) {

                console.log("l\'id est " + id + " et l\'image : " + response.data[id - 1].image)
                $("#details_doudou").empty();
                var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + response.data[id - 1].image)
                pic.css("width", 200)
                pic.css("height", 300)
                pic.css("border", "2px solid white")
                pic.css("border-radius", "25px")

                var color = response.data[id - 1].color
                var date = response.data[id - 1].dateFind.date
                var place = response.data[id - 1].placeFind
                var type = response.data[id - 1].type
                var lat = response.data[id - 1].lat
                var lng = response.data[id - 1].lng

                $("#details_doudou").html("<p>Ce doudou de couleur " + color + " a été trouvé le " + date + " à " + place + " qui est de type " + type +
                    "</p>");
                $("#details_doudou").append(pic);


            }
        })
}