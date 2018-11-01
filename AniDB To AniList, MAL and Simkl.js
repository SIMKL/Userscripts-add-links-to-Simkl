// ==UserScript==
// @name AniDB To AniList/MAL/Simkl
// @namespace Deterio
// @author Deterio
// @description Adds AniList/MAL/Simkl links to AniDB anime pages
// @match http://anidb.net/perl-bin/animedb.pl?show=anime&aid=*
// @grant GM_xmlhttpRequest
// @version 1
// ==/UserScript==
GM_xmlhttpRequest({
    method: "POST",
    url: "https://graphql.anilist.co",
    data: JSON.stringify({
          query: `query($id:Int,$type:MediaType){
            Media(idMal:$id,type:$type){
                siteUrl
            }
          }`,
          variables: {
            "id": document.querySelector(".mal").href.split("/")[4],
            "type": "ANIME"
          }
      }),
    headers: {
        "Content-Type": "application/json"
    },
    onload: function(response) {
        var MalUrl= "https://myanimelist.net/anime/" + document.querySelector(".mal").href.split("/")[4];
        var anilistUrl=JSON.parse(response.responseText)["data"]["Media"]["siteUrl"];
        var SimklUrl= "https://api.simkl.com/redirect?mal=" + document.querySelector(".mal").href.split("/")[4];
        document.querySelector(".tabbed_pane").querySelector(".tabs").innerHTML+=`<ul class="tabs"></ul><li id="tab_4" onclick="location.href='${MalUrl}';" class="tab">MyAnimeList</li>`;
        document.querySelector(".tabbed_pane").querySelector(".tabs").innerHTML+=`<li id="tab_4" onclick="location.href='${anilistUrl}';" class="tab">AniList</li>`;
        document.querySelector(".tabbed_pane").querySelector(".tabs").innerHTML+=`<li id="tab_4" onclick="location.href='${SimklUrl}';" class="tab">Simkl</li>`;
    }
});
