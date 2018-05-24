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


