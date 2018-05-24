show_all();

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


function show_all() {

    $.ajax({
        url :"http://localhost:8082/Doudou/doudou-sf/public/api/v1/doudous",
        method : "GET",
        dataType: 'json',
    })
    .done(function(response){   
    
        $("#content").empty();

        response.data.forEach(function(doudou){
            var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + doudou.image)
            pic.css("width", 200)      
            pic.css("height",300)
            pic.css("border","2px solid white")
            pic.css("border-radius","25px") 
            pic.attr("data.id", doudou.id)     

            $("#content").append(pic)            
        })

        $("body").on("click","img", function(){
            var id = $(this).attr("data.id") 
            console.log(id)
            $("main").css("display","none");
            $("#titre").css("display","none");
            $('#details_doudou').css("display","block");                                  
            searchDetails(id)
        });
    

        function searchDetails(id) {
            $.ajax({
                url :"http://localhost:8082/Doudou/doudou-sf/public/api/v1/doudous",
                method : "GET",
                data: {
                    q: id
                }
            })
            
            .done(function(response){

                $("#details_doudou").empty();

            response.data.forEach(function(doudou){
                var pic = $("<img>").attr("src", "http://localhost:8082/Doudou/doudou-sf/public/img/photos/" + doudou.image)
                pic.css("width", 200)      
                pic.css("height",300)
                pic.css("border","2px solid white")
                pic.css("border-radius","25px") 
                pic.attr("data.id", doudou.id)     
    
                $("#content").append(pic)
            })
            console.log("je suis dans la fonction searchDetails "+id)
        })

});

