$(document).ready(function(){
    $("#btnSendPosition").click(function(){
        //TODO: send position to server
        $("#paraRestaurantName").html("restaurant name");
    })
});


// helper function for updatePosition because that sorry little ass cant do shit by itself
function updatePositionHelper(successCallback, errorCallback) {
    successCallback = successCallback || function () {
    };
    errorCallback = errorCallback || function () {
    };

    // Try HTML5-spec geolocation.
    var geolocation = navigator.geolocation;

    if (geolocation) {
        // We have a real geolocation service.
        try {
            function handleSuccess(position) {
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
}


//TODO: print latitude and longtitude in the paragraph on button click;

