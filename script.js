$(document).ready(function(){
    var location = '';
    /*get longitude and latitude*/
    $.get("http://ipinfo.io", function (response) {
        location = response.city;
        console.log(location);
    }, "jsonp");
    getWeather(location);
    
    $("#submit").on('click',function(){
       var city = $('#citySearch').val();
        if(city !=''){
            getWeather(city);
            $('#error').text('');
        }else{
            $('#error').text("Please Enter a city");
        }
    });
});

function getWeather(city){
    $.ajax({
       url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=d7414594fc9aa68bfbbff50d617271e6',
       type: 'GET',
       dataType: 'jsonp',
       success: function(r){
           if(typeof r === 'string'){
               r=JSON.parse(r);
           }
           /*calculating the temperatures*/
           var kelvin = parseInt(r.main.temp);
           var fah = (9/5)*(kelvin - 273) + 32;
           var celc = kelvin-273;
           
           $('#location').text(city);
           $('#temp').text(kelvin+"°K" + " | " + fah + "°F" + " | " + celc + "°C");
           
           /*determining if sunny/cloudy*/
           var cloudiness = parseInt(r.clouds.all);
           if(fah < 55){
               $('#clouds').text("Cold");
               $('body').css("background-image",'url(snowing.jpg)');
               $('h1,li').css("color", 'white');
           }
           else if(cloudiness> 65){
               $('#clouds').text('Cloudy');
               $('body').css("background-image",'url(cloudy.jpg)');
               
           }else{
               $('#clouds').text('Sunny');
               $('body').css("background-image",'url(sunny.jpg)');
               $('h1,li').css("color", 'black');
           }
       }
   });
}
