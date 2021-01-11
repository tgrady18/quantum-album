var request = require("request");
var userID = "tgrady18";
var token = "Bearer BQAR6vWt0_obCxGqPWXF68GGM94hJ3KkKvOAhr-Ko0imAgTi9MQm25NmQkmD8KeQbD3k5x1Yt4bXi4YqixMVCAnV5Mxz4vlGcfAruquwVs-_MPba_vbZpl4o2hqTBXdpf4HuMRg_NloqCjs"
var playlistURL = "https://api.spotify.com/v1/users/{"+userID+"}/playlists";
var albumURL = "https://api.spotify.com/v1/search?q=Happy&type=album&market=US&limit=1&offset=52";
request({request:albumURL, headers:{ "Authorization":token}}, function(err, rss){
    if (err) {
        console.log(err)
    }
    if (rss) {
        var album = rss.album[0].href
        console.log(album)
        console.log("welp")
    }
    console.log("hmmmm")

})


request({request:playlistURL, headers:{ "Authorization":token}}, function(err, rss){
    if (rss) {
        var playlists=JSON.parse(rss.body);
        var playlist_url = playlists.items[0].href;
        request({request:playlist_url, headers:{ "Authorization":token}}, function(err, result){
            if (err) {
                console.log(err)
            }
            if (result) {  
                
                var playlist=JSON.parse(result.body);
                var tracks = playlists.tracks.items.forEach(function(track){
                    console.log(track.track)
                });

              }
        
        })
    }
})