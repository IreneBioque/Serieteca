"use strict";const input=document.querySelector(".js_search"),button=document.querySelector(".js_button"),list=document.querySelector(".js_list"),favoritesList=document.querySelector(".js_favorites"),buttonReset=document.querySelector(".js_reset");let shows=[],favorites=[];function getApi(){return"//api.tvmaze.com/search/shows?q="+input.value}function url(){let e=getApi();fetch(e).then(e=>e.json()).then(e=>{shows=e.map(e=>({id:e.show.id,title:e.show.name,image:e.show.image})),paintHtml()})}function paintHtml(){console.log(shows),list.innerHTML="";let e="";for(const t of shows){e=isFavorite(t)?"selected":"";const i=t.title,s=t.image,o="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",l=t.id;if(null===s){const t=`<li class="js_li ${e} lishow" id="${l}"><img src="${o}" alt="covershow" class="lishow__image"><h3 class="lishow__title">${i}</h3></li>`;list.innerHTML+=t}else{const s=`<li class="js_li ${e} lishow" id="${l}"><img src="${t.image.medium}" alt="covershow" class="lishow__image"><h3 class="lishow__title">${i}</h3></li>`;list.innerHTML+=s}}paintfavorites(),listenShows()}function handleShow(e){const t=parseInt(e.currentTarget.id),i=shows.find(e=>e.id===t),s=favorites.findIndex(e=>e.id===t);-1===s?favorites.push(i):favorites.splice(s,1),paintHtml(),setInLocalStorage()}function listenShows(){const e=document.querySelectorAll(".js_li");for(let t of e)t.addEventListener("click",handleShow)}function isFavorite(e){return void 0!==favorites.find(t=>t.id===e.id)}function paintfavorites(){favoritesList.innerHTML="";for(let e of favorites){const t=e.title,i=e.image,s=e.id,o="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";if(null===i){const e=`<li class="js_listfavorite lifavorite" id="${s}"><img src="${o}" alt="covershow" class="lifavorite__image"><h3 class="lifavorite__title">${t}</h3><i class="fas fa-times-circle js_deleted lifavorite__deleted" id="${s}"></li>`;favoritesList.innerHTML+=e}else{const i=`<li class="js_listfavorite lifavorite" id="${s}"><img src="${e.image.medium}" alt="covershow" class="lifavorite__image"><h3 class="lifavorite__title">${t}</h3 class="lifavorite__title"><i class="fas fa-times-circle js_deleted lifavorite__deleted" id="${s}"></i></li>`;favoritesList.innerHTML+=i}}listenCloses()}function handleType(e){e.preventDefault(),url()}function handleClose(e){const t=parseInt(e.currentTarget.id),i=favorites.findIndex(e=>e.id===t);-1!==i&&favorites.splice(i,1),paintHtml(),setInLocalStorage()}function listenCloses(){const e=document.querySelectorAll(".js_deleted");for(let t of e)t.addEventListener("click",handleClose)}function handleReset(){-1!==favorites.findIndex(e=>e.id)&&favorites.splice(0),setInLocalStorage(),paintHtml()}function setInLocalStorage(){const e=JSON.stringify(favorites);localStorage.setItem("favorites",e)}function getLocalStorage(){const e=localStorage.getItem("favorites");if(null!==e){const t=JSON.parse(e);favorites=t,paintfavorites()}}button.addEventListener("click",handleType),buttonReset.addEventListener("click",handleReset),getLocalStorage();