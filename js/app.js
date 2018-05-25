show_all();


$("#search_btn").click(function(){
    $("main").css("display","none");
    $('#form_search').css("display","block");
    $('#form_find').css("display","none");
    console.log("je passe devant le bouton");
});
$("#find_btn").click(function(){
    $("main").css("display","none");
    $('#form_search').css("display","none");
    $('#form_find').css("display","block");
    console.log("je passe devant le bouton");

});
$("#send_btn").click(function () {
    $("main").toggle();
    $('#form_search').toggle();;
   
});

function show_all() {

    $.ajax({

        url :"http://localhost/doudou/doudou-sf/public/api/v1/doudous",
        method : "GET",
        dataType: 'json',
    })
    .done(function(response){   
    
        $("#content").empty();

        response.data.forEach(function(doudou){
            var pic = $("<img>").attr("src", "http://localhost/doudou/doudou-sf/public/img/photos/" + doudou.image)
            pic.css("width", 200)      
            pic.css("height",300)
            pic.css("border","2px solid white")
            pic.css("border-radius","25px") 
            pic.attr("data.id", doudou.id)     

            $("#content").append(pic)            

            url: "http://localhost:8082/Doudou/doudou-sf/public/api/v1/doudous",
            method: "GET",
            dataType: 'json',

        })
        .done(function (response) {

        $("body").on("click","img", function(){
            var id = $(this).attr("data.id") 
            console.log(id)
            $("main").css("display","none");
            $("#titre").css("display","none");
            $('#details_doudou').css("display","block");                                  
            searchDetails(id)
        });
        
    });
}

function find_doudou(){
    $.ajax({
        url : "http://localhost/doudou/doudou-sf/public/api/v1/doudou/",
        method : "POST",
        data : $( "#find_doudou" ).serialize(),
    })
}

$("#push_btn").click(function(e){
    e.preventDefault();
    find_doudou();
}

          

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
               
                $("main").toggle();
                $("#titre").toggle();
                $('#details_doudou').toggle();
                searchDetails(id,response.data)

                console.log("test" +id)
            });
           
        })

        function searchDetails(id, data) {    

            for (var i = 0; i < data.length; i++) {             

                if (id == data[i].id) { 
                    
                    console.log(data);
                    console.log("id " +data[i].id);
                    
                    $("#pic_doudou").empty();
                    var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + data[i].image)
                    pic.css("width", 200)
                    pic.css("height", 300)
                    pic.css("border", "2px solid white")
                    pic.css("border-radius", "25px")
        
                    var color = data[i].color
                    var date = data[i].dateFind
                    var place = data[i].placeFind
                    var type = data[i].type
                    var lat = data[i].lat
                    var lng = data[i].lng        
                    
                    $("#pic_doudou").append(pic);
                    $("#details_doudou").append(

                        `<div id ="show_details">
                             <p> Couleur : ${color} </p>
                             <p> Lieu de decouverte :${place} </p>
                             <p></p>   Type du doudou : ${type} </p>                                
                         </div>
                        
                        
                        </p>`);              
                }     

        }
}


})
