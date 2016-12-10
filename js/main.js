var access_token;
var isPopular = false;
(function (){
    access_token = window.location.hash.split('=')[1];
    //alert(access_token);


})();

$('#popularButton').click(function(){
    isPopular = true;
    instagramRESTCall();
});

$('#searchButton').click(function(){
    isPopular = false;
    instagramRESTCall();
})

function instagramRESTCall(){
    $('#resultDiv').html(""); //clear the div
    var path = isPopular?'https://api.instagram.com/v1/media/popular?access_token='+access_token:'https://api.instagram.com/v1/tags/search?q='+$('#searchText').val()+'&access_token='+access_token;
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: path,
        success: function(response) {
            $.each(response.data,function(index,value){
                if(value.type == "image"){
                    $('#resultDiv').append('<div class=\'results card medium\'><img width=\''+value.images.low_resolution.width+'\' src=\''+value.images.low_resolution.url+'\' class=\'card-image\'></div>');
                }else{
                    $('#resultDiv').append('<div class=\'results card medium\'><video controls width=\''+value.images.low_resolution.width+'\ class=\'card-image\'><source src=\''+value.videos.low_resolution.url+'\' type=\'video/mp4\'></video></div>');
                }
            });
            
            $('.results').addClass('left');
           // $('.materialboxed').materialbox();

        }
    });
    
}