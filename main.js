// helper function for updatePosition because that sorry little ass cant do shit by itself
function updatePositionHelper(successCallback, errorCallback) {
    successCallback = successCallback || function () {
        console.log("empty");
    };
    errorCallback = errorCallback || function () {
        console.log("empty1");
    };

    // Try HTML5-spec geolocation.
    var geolocation = navigator.geolocation;

    if (geolocation) {

        // We have a real geolocation service.
        try {
            function handleSuccess(position) {
                console.log(7);
                successCallback(position.coords);  // YAAYYYYY!!
            }
          
            geolocation.watchPosition(handleSuccess, errorCallback, {
                enableHighAccuracy: true, // high accuracy because idk how but this fixes its problems with mobiles
                maximumAge: 0  // 0 sec. ask for new object everytime user moves.
            });

        } catch (err) {
            errorCallback();  // NOOOOOO ;_;
        }
    } else {
        errorCallback();  // NOOOOOO T_T
    }
};


function handleGetPlaceSuccess(placeInformation){
    var placeJSON = placeInformation;
    console.log(placeJSON);
    $("#paraRestaurantName").html("hello: "+placeJSON);
};


$(document).ready(function(){   
    var lat;
    var lon;

    console.log(10);

    updatePositionHelper(
        (coords) => {
            lat = coords.latitude;
            lon = coords.longitude;
            console.log(coords);
            $("#errorPara").css("visibility", "hidden");
        },
        () => {
            console.log("error");
            $("#errorPara").css("visibility", "visible");
        }
    );

    console.log(2);

    $("#btnSendPosition").click(function(){
        if(lat === undefined || lon === undefined){
            console.log([lat, lon]);
            $("#errorPara").css("visibility", "visible");
            lat = 43.7796416;
            lon = -79.415927;
        }
            $.ajax({
                type: "POST",
                url: "/",
                data: { "latitude": lat, "longitude": lon },
                success: handleGetPlaceSuccess
            });
    });
    

    }
);



