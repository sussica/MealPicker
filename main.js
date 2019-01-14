// helper function for updatePosition because that sorry little ass cant do shit by itself
function updatePositionHelper(successCallback, errorCallback) {
    console.log(8);
    successCallback = successCallback || function () {
        console.log('4')
    };
    errorCallback = errorCallback || function () {
    };

    // Try HTML5-spec geolocation.
    var geolocation = navigator.geolocation;


    if (geolocation) {
        console.log(9)
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
            console.log(10)
        } catch (err) {
            errorCallback();  // NOOOOOO ;_;
        }
    } else {
        errorCallback();  // NOOOOOO T_T
    }
};

$(document).ready(function(){
    var lat;
    var lon;
    $("#btnSendPosition").click(function(){
        //TODO: send position to server

        if(lat === undefined || lon === undefined){
            $("#errorPara").css("visibility", "visible");
        }else{
        $("#paraRestaurantName").html("restaurant name latitude: " + lat + ", longtitude: "+ lon);}
    });
    
    updatePositionHelper( 
        (coords) => {
            console.log(`3`);
            lat = coords.latitude;
            lon = coords.longitude;
            console.log(lat + ", " + lon);
            $("#errorPara").css("visibility", "hidden");
        }, 
        () => {
            console.log(`2`);
            $("#errorPara").css("visibility", "visible");}
        )
    }
);


//TODO: print latitude and longtitude in the paragraph on button click;

