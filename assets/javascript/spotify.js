function searchSpotify(token, artist) {

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams = $("#search-term")
        .val()
        .trim();
    console.log(queryParams);
    $.ajax({
        url:
            "https://api.spotify.com/v1/search?q=" +
            "santana" +
            "&" +
            "type=artist",
        // url: "https://api.spotify.com/v1/artists/" + "6GI52t8N5F02MxU0g5U69P" + "/top-tracks?country=us",
        // url: "https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp",
        // url: "https://api.spotify.com/v1/tracks/0a1gOGCiEmRif2JpknNEGW",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response, err) {
        console.log(response);
        console.log(response.artists.items[0].id);
        $.ajax({
            url:
                "https://api.spotify.com/v1/artists/" +
                response.artists.items[0].id +
                "/top-tracks?country=us",
            // url: "https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp",
            // url: "https://api.spotify.com/v1/tracks/0a1gOGCiEmRif2JpknNEGW",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (res, err) {
            console.log(token);
            console.log(res.tracks[0].id);
            $("#musicDiv").append(`<iframe src="https://open.spotify.com/embed/track/${res.tracks[0].id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)

        });
    });
}
//6GI52t8N5F02MxU0g5U69P
(function () {

    var stateKey = "spotify_auth_state";
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
        var hashParams = {};
        var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    function generateRandomString(length) {
        var text = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    var userProfileSource = document.getElementById("user-profile-template").innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById("user-profile");
    (oauthSource = document.getElementById("oauth-template").innerHTML),
        (oauthTemplate = Handlebars.compile(oauthSource)),
        (oauthPlaceholder = document.getElementById("oauth"));

    var params = getHashParams(); // this should be the access token after the redirect
    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);

    if (access_token && (state == null || state !== storedState)) {
        alert("There was an error during the authentication");
    } else {
        //   localStorage.removeItem(stateKey);
        if (access_token) {
            $.ajax({
                url: "https://api.spotify.com/v1/me",
                headers: {
                    Authorization: "Bearer " + access_token
                },
                success: function (response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    $("#login").hide();
                    $("#loggedin").show();
                    searchSpotify(access_token);
                }
            });
        } else {
            $("#login").show();
            $("#loggedin").hide();
        }
        document.getElementById("login-button").addEventListener(
            "click",
            function (e) {
                e.preventDefault()
                var client_id = "2cdaa474a40145d9891e1690a0a81ac0"; // Your client id
                var redirect_uri = "http://127.0.0.1:5501/index.html"; // Your redirect uri
                var state = generateRandomString(16);
                localStorage.setItem(stateKey, state);
                var scope = "user-read-private user-read-email";
                var url = "https://accounts.spotify.com/authorize";
                url += "?response_type=token";
                url += "&client_id=" + encodeURIComponent(client_id);
                url += "&scope=" + encodeURIComponent(scope);
                url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
                url += "&state=" + encodeURIComponent(state);
                window.location = url;
            },
            false
        );
        $("#user-profile").hide();
        $("#artist-search").hide()
        $("#artist-search-button").hide()
    }
    $("#artist-search").show()
    $("#artist-search-button").show()
})();
