$('#card-1').hover(function(){
    if($(this).hasClass("active")){
        $('#card-1 .button').slideUp(function(){
            $('#card-1').removeClass("active");
        })
    }
    else{
        $('#card-1').addClass("active");
        $('#card-1 .button').stop().slideDown();
    }
})

$('#card-2').hover(function(){
    if($(this).hasClass("active")){
        $('#card-2 .button').slideUp(function(){
            $('#card-2').removeClass("active");
        })
    }
    else{
        $('#card-2').addClass("active");
        $('#card-2 .button').stop().slideDown();
    }
})

$('#card-3').hover(function(){
    if($(this).hasClass("active")){
        $('#card-3 .button').slideUp(function(){
            $('#card-3').removeClass("active");
        })
    }
    else{
        $('#card-3').addClass("active");
        $('#card-3 .button').stop().slideDown();
    }
})

$('#card-4').hover(function(){
    if($(this).hasClass("active")){
        $('#card-4 .button').slideUp(function(){
            $('#card-4').removeClass("active");
        })
    }
    else{
        $('#card-4').addClass("active");
        $('#card-4 .button').stop().slideDown();
    }
})