// ==UserScript==
// @name Trakt to Simkl
// @namespace Deterio
// @author Deterio
// @description Adds Simkl links to Trakt pages
// @match https://trakt.tv/shows/*
// @match https://trakt.tv/movies/*
// @version 1
// ==/UserScript==
var SimklUrl = null; document.querySelector(".external").querySelector("li").querySelectorAll("a").forEach(function(a){var m; if (a && (m=a.href.match(/thetvdb.*\/([0-9]+)/))) SimklUrl = "https://api.simkl.com/redirect?tvdb="+m[1]});
if (SimklUrl) document.querySelector(".external").querySelector("li").innerHTML+='<a href='+SimklUrl+'>Simkl</a>';
