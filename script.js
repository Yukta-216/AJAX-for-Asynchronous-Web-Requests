// ---------------- COUNTRY → CITY DATA ----------------

// Static mapping for dropdown (easy selection)
const cities = {
    India: ["Mumbai", "Delhi", "Pune", "Bangalore"],
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester"],
    Canada: ["Toronto", "Vancouver"],
    Australia: ["Sydney", "Melbourne"]
};

// Load cities based on selected country
$("#country").change(function () {
    let country = $(this).val();

    $("#city").empty().append('<option>Select City</option>');

    if (cities[country]) {
        cities[country].forEach(city => {
            $("#city").append(`<option>${city}</option>`);
        });
    }
});


// ---------------- WEATHER FETCH (AJAX) ----------------

$("#getWeather").click(function () {

    let city = $("#city").val();

    if (!city) {
        $("#weatherResult").html("❌ Please select city");
        return;
    }

    $("#loader").show();
    $("#weatherResult").html("");

    // Step 1: Get coordinates
    $.getJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`, function (geoData) {

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        // Step 2: Get weather
        $.getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
            function (data) {

                $("#loader").hide();

                let temp = data.current_weather.temperature;
                let wind = data.current_weather.windspeed;

                // Icon logic
                let icon = "☀️";
                if (temp < 15) icon = "❄️";
                else if (temp < 25) icon = "⛅";

                $("#weatherResult").html(`
                    <h3>${icon} ${city}</h3>
                    <p>🌡 Temperature: ${temp} °C</p>
                    <p>💨 Wind Speed: ${wind} km/h</p>
                `);
            }
        );

    });
});
