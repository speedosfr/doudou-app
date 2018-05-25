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
               
                $("main").css("display", "none");
                $("#titre").css("display", "none");
                $('#details_doudou').css("display", "block");
                searchDetails(id,response.data)

                console.log("test" +id)
            });
           
        })

        function searchDetails(id, data) {    

            for (var i = 0; i < data.length; i++) {             

                if (id == data[i].id) { 
                    
                    $("#details_doudou").empty();
                    var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + data[id].image)
                    pic.css("width", 200)
                    pic.css("height", 300)
                    pic.css("border", "2px solid white")
                    pic.css("border-radius", "25px")
        
                    var color = data[id].color
                    var date = data[id].dateFind
                    var place = data[id].placeFind
                    var type = data[id].type
                    var lat = data[id].lat
                    var lng = data[id].lng
        
                    $("#details_doudou").html("<p>Ce doudou de couleur " + color + " a été trouvé le " + date + " à " + place + " qui est de type " + type +
                        "</p>");
                    $("#details_doudou").append(pic);          
                    
                }else{
                    
                }            

        }
}
}

