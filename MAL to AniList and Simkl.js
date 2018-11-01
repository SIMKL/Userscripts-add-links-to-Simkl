// ==UserScript==
// @name MAL to AniList/Simkl
// @namespace Deterio
// @author Deterio
// @description Adds AniList/Simkl links to myanimelist anime pages
// @match https://myanimelist.net/anime/*
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
            "id": window.location.pathname.split("/")[2],
            "type": "ANIME"
          }
      }),
    headers: {
        "Content-Type": "application/json"
    },
    onload: function(response) {
        var anilistURL=JSON.parse(response.responseText)["data"]["Media"]["siteUrl"];
        var SimklUrl= "https://api.simkl.com/redirect?mal=" + window.location.pathname.split("/")[2];
        document.getElementById("horiznav_nav").getElementsByTagName("ul")[0].innerHTML+=`<li><a rel="noopener noreferrer" href="${anilistURL}">AniList</a></li>`;
        document.getElementById("horiznav_nav").getElementsByTagName("ul")[0].innerHTML+=`<li><a rel="noopener noreferrer" href="${SimklUrl}">Simkl</a></li>`;
    }
});
