import{a as E,S as P,i as c}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const S="47132094-d62b20a250e19599c97772386",B="https://pixabay.com/api/";async function h(o,t=1,i=15){const s={key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i};try{return(await E.get(B,{params:s})).data}catch{throw new Error("Failed to fetch images")}}function g(o){return o.map(({webformatURL:t,largeImageURL:i,tags:s,likes:e,views:r,comments:a,downloads:v})=>`
      <a href="${i}" class="gallery-item">
        <img src="${t}" alt="${s}" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${e}</p>
          <p class="info-item"><b>Views:</b> ${r}</p>
          <p class="info-item"><b>Comments:</b> ${a}</p>
          <p class="info-item"><b>Downloads:</b> ${v}</p>
        </div>
      </a>
    `).join("")}const m=document.getElementById("search-form"),f=document.querySelector(".gallery"),p=document.getElementById("loader"),n=document.createElement("button");n.textContent="Load more";n.id="load-more";n.classList.add("hidden");document.body.appendChild(n);let d="",l=1,u=0,y=new P(".gallery a");function L(){p.classList.remove("hidden")}function b(){p.classList.add("hidden")}function M(){n.classList.remove("hidden")}function w(){n.classList.add("hidden")}m.addEventListener("submit",async o=>{if(o.preventDefault(),d=m.searchQuery.value.trim(),!d){c.warning({title:"Warning",message:"Please enter a search query."});return}l=1,f.innerHTML="",w();try{L();const t=await h(d,l);t.hits.length===0?c.error({title:"Error",message:"No images found. Please try again!"}):(f.innerHTML=g(t.hits),y.refresh(),u=t.totalHits,u>t.hits.length&&M())}catch{c.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{b()}});n.addEventListener("click",async()=>{l+=1;try{L();const o=await h(d,l);f.insertAdjacentHTML("beforeend",g(o.hits)),y.refresh(),l*15>=u&&(w(),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),$()}catch{c.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{b()}});function $(){const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map