function getPlaylist(access_token, user_id) {
  console.log('getPlaylist');
  $.ajax({
    url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
    headers: { Authorization: 'Bearer ' + access_token },
    method: 'GET'
  }).then(function(res, err) {
    console.log('res: ', res);
    console.log('err: ', err);
    console.log('res.href: ', res.items[0].href);
    if (res) {
      // var playlists = JSON.parse(res.body);
      var playlist_url = res.items[0].href;
      $.ajax({
        url: playlist_url,
        headers: { Authorization: 'Bearer ' + access_token }
      }).then(function(res, err) {
        if (res) {
          console.log(res.tracks.items);
          res.tracks.items.forEach(function(track) {
            console.log(track.track.name);
            let trackEl = `
                        <div class="track-el">
                        <p id="${track.track.name}">${track.track.name}</p>
                        <iframe src="https://open.spotify.com/embed/track/${
                          track.track.id
                        }" width="200" height="280" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>`;
            $('#track-div').append(trackEl);
          });
          $('#track-div').show();
        }
      });
    }
  });
}
