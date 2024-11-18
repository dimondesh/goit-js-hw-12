import{i as a,S as m}from"./assets/vendor-BrddEoy-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const p="47132094-d62b20a250e19599c97772386",g="https://pixabay.com/api/";async function h(n){const r=`${g}?key=${p}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`,o=await fetch(r);if(!o.ok)throw new Error("Failed to fetch images");return o.json()}function y(n){return n.map(({webformatURL:r,largeImageURL:o,tags:i,likes:e,views:t,comments:s,downloads:u})=>`
      <a href="${o}" class="gallery-item">
        <img src="${r}" alt="${i}" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${e}</p>
          <p class="info-item"><b>Views:</b> ${t}</p>
          <p class="info-item"><b>Comments:</b> ${s}</p>
          <p class="info-item"><b>Downloads:</b> ${u}</p>
        </div>
      </a>
    `).join("")}const c=document.getElementById("search-form"),l=document.querySelector(".gallery"),f=document.getElementById("loader");let d;function b(){f.classList.remove("hidden")}function L(){f.classList.add("hidden")}c.addEventListener("submit",async n=>{n.preventDefault();const r=c.searchQuery.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search query."});return}try{b(),l.innerHTML="";const o=await h(r);o.hits.length===0?a.error({title:"Error",message:"No images found. Please try again!"}):(l.innerHTML=y(o.hits),d=new m(".gallery a"),d.refresh())}catch{a.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{L()}});
//# sourceMappingURL=index.js.map
