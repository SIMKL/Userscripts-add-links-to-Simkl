// ==UserScript==
// @name AniList To MAL/Simkl
// @namespace Deterio
// @author Deterio
// @description Adds MAL/Simkl links to AniList anime and manga pages
// @match https://anilist.co/manga/*
// @match https://anilist.co/anime/*
// @grant GM_xmlhttpRequest
// @version 1
// ==/UserScript==
GM_xmlhttpRequest({
    method: "POST",
    url: "https://graphql.anilist.co",
    data: JSON.stringify({
          query: `query($id:Int,$type:MediaType){
            Media(id:$id,type:$type){
                idMal
            }
          }`,
          variables: {
            "id": window.location.pathname.split("/")[2],
            "type": "ANIME"
          }
      }),
    headers: {
        "Content-Type": "application/json"
    },
    onload: function(response) {
        var MalUrl= "https://myanimelist.net/anime/" + JSON.parse(response.responseText)["data"]["Media"]["idMal"]
        var SimklUrl= "https://api.simkl.com/redirect?mal=" + JSON.parse(response.responseText)["data"]["Media"]["idMal"]
        document.querySelector(".content").querySelector(".nav").innerHTML+=`<a data-v-5e562a30 rel="noopener noreferrer" class="link" href="${MalUrl}">MyAnimeList</a>`
        document.querySelector(".content").querySelector(".nav").innerHTML+=`<a data-v-5e562a30 rel="noopener noreferrer" class="link" href="${SimklUrl}">Simkl</a>`
    }
});
