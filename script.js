$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  //DECLARE VARIABLES
  var longitude,
      latitude,
      fetchit,
      location,
      tempF,
      tempC,
      sky,
      icon,
      bitcoinprice,
      ethereumprice,
      neoprice,
      nanoprice;
  //RUN ALL FUNCTIONS
  //GET LATITUDE AND LONGITUDE FROM BROWSER
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      fetchit =
        "https://fcc-weather-api.glitch.me/api/current?lon=" +
        longitude +
        "&lat=" +
        latitude;

      //FETCH crypto FROM JSON
      $.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=100", function(
                b
      ) {
        // iterate over each element in the array
        for (var i = 0; i < b.length; i++) {
          // look for the entry with a matching `code` value
          if (b[i].id == "nano") {
            nanoprice = b[i].price_usd;
            // obj[i].name is the matched result
          } else if (b[i].id == "bitcoin") {
            bitcoinprice = b[i].price_usd;
          } else if (b[i].id == "ethereum") {
            ethereumprice = b[i].price_usd;
          } else if (b[i].id == "neo") {
            neoprice = b[i].price_usd;
          }
        }
        $("#bitcoinprice").html("Bitcoin: $" + bitcoinprice);
        $("#ethereumprice").html("Ethereum: $" + ethereumprice);
        $("#neoprice").html("Neo: $" + neoprice);
        $("#nanoprice").html("Nano: $" + nanoprice);
      });

      //FETCH weather FROM JSON
      $.getJSON(fetchit, function(a) {
        location = a.name;
        console.log(a.weather[0].icon);
        icon = a.weather[0].icon;
        tempC = Math.round(a.main.temp);
        tempF = Math.round(tempC * (9 / 5) + 32);
        tempC = tempC + "°C";
        tempF = tempF + "°F";
        sky = a.weather[0].description;
        $("#longitude").html(longitude);
        $("#latitude").html(latitude);
        $("#location").html(location);
        $(".myBtn").val(tempF);
        $("#tempC").html(tempC);
        $("#sky").html(sky);
        $("#icon").attr("src", icon);
        console.log(icon);

        $(".myBtn").on("click", function() {
          var $btn = $(this);
          $("#userId_delete").val($btn.data("user-id"));
          $("#userName_delete").text($btn.data("user-name"));
          var newVal = $btn.val() == tempF ? tempC : tempF;
          $btn.val(newVal);
        });
      });
    });
  }
});
