// helper function for updatePosition because that sorry little ass cant do shit by itself
function updatePositionHelper(successCallback, errorCallback) {
  successCallback = successCallback || function() {
    console.log("not having success call back");
  };
  errorCallback = errorCallback || function() {
    console.log("not having error call back");
  };

  // Try HTML5-spec geolocation.
  var geolocation = navigator.geolocation;

  if (geolocation) {

    // We have a real geolocation service.
    try {
      function handleSuccess(position) {
        successCallback(position.coords); // YAAYYYYY!!
      }

      geolocation.watchPosition(handleSuccess, errorCallback, {
        enableHighAccuracy: true, // high accuracy because idk how but this fixes its problems with mobiles
        maximumAge: 0 // 0 sec. ask for new object everytime user moves.
      });

    } catch (err) {
      errorCallback(); // NOOOOOO ;_;
    }
  } else {
    errorCallback(); // NOOOOOO T_T
  }
};


function handleGetPlaceSuccess(placeInformation) {
  var placeJSON = placeInformation;
  var placeID = placeJSON.place_id;
  var url = "https://www.google.com/maps/embed/v1/place?key=" +
    "AIzaSyAaQDVhgRZ-jKBkqQBBpGemUDfdrSrkxrs&q=place_id:" + placeID;
  $("#map").prop('src', url);


  $("#paraRestaurantName").html("Hello: " + placeJSON.name);
};

var tempInfo;
function handleGetPlaceFailure(errorInformation) {
  tempInfo = errorInformation;
  alert("Guess what, " + errorInformation.responseText);
}

function myFunction(shouldDisplay) {
  document.getElementById("myDropdown").style.display = shouldDisplay ? 'block' : "none";
}


function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function myClick(item) {
  alert(item);
  $("#myInput").text = item;
}

$(document).ready(function() {
  var lat;
  var lon;

  var list = ["Korean", "Chinese", "Indian", "Japanese", "Dessert", "Western", "Fast", "Street"];

  autocomplete(document.getElementById("category"), list);


  updatePositionHelper(
    (coords) => {
      lat = coords.latitude;
      lon = coords.longitude;
      console.log(coords);
      $("#errorPara").css("visibility", "hidden");
    },
    () => {
      console.log("error");
    }
  );


  $("#btnSendPosition").click(function() {
    console.log("1", lat, lon);
    if (lat === undefined || lon === undefined) {
      $("#errorPara").css("visibility", "visible");
      return;
    }

    var category = $("#category").val();
    var distance = $("#distance").val();
    var pricelevel = $("#priceLevel").val();
    var rating = $("#rating").val();

    $.ajax({
      type: "POST",
      url: "/",
      contentType: "json",
      data: JSON.stringify({
        "latitude": lat,
        "longitude": lon,
        "category": category,
        "distance": distance,
        "pricelevel": pricelevel,
        "rating": rating
      }),
      success: handleGetPlaceSuccess,
      error: handleGetPlaceFailure
    });
  });
});
