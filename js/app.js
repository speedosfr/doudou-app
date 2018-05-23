randomImg();

function randomImg(){
    

}

function serachAndDisplayDoudou() {

    $.ajax({
        url :"http://localhost:8082/doudou/doudou-sf/public/api/v1/doudou",
        method : "GET",
        data: {
            q: keyword
        }
    })
    .done(function(response){
        
      //  window.navigator.vibrate(200);
        //Enleve le loading
        $("#content").empty();

        response.data.forEach(function(movie){
            var pic = $("<img>").attr("src", "http://localhost:8082/movies-sf/public/img/posters/" + movie.image)
            pic.css("width", 200)
            pic.attr("data-movieId", movie.id)

            $("#content").append(pic)
            
        })

        $("body").on("click","img", function(){
            var id = $(this).attr("data-movieId")                
            serachDetails(id)
        });

        function serachDetails(id) {
            $.ajax({
                url :"http://localhost:8082/movies-sf/public/api/v1/movies",
                method : "GET",
                data: {
                    q: id
                }
            })
            console.log(id)
        }
    })
}