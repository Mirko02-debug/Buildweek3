const api ="https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let filter=``;
let results =[];
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"

// async function chiamataFetch() {

//     const response = await fetch(api + filter, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     // Variabili per la durata
//     let totSec = 0;
//     let min = 0;
//     let sec = 0;
//     const data = await response.json();
//     if(data){
//         const fotoProfilo = document.getElementById(`foto-profilo`);
//         const titoloAlbum = document.getElementById(`album-title`);
//         const artistName = document.getElementById(`artist-name`);
//         const artistProfile = document.getElementById(`artist-profile`);
//         totSec+=parseInt(data.data[0].duration);
//         console.log(totSec);
//         min = parseInt(totSec/60);
//         sec = parseInt(totSec - (min*60));
//         fotoProfilo.innerHTML = `<img src="${data.data[0].album.cover_big}" alt="" style="width: 100%; ">`;
//         titoloAlbum.innerHTML = `${data.data[0].album.title}`;
//         artistName.innerHTML = `${data.data[0].artist.name}`;
//         artistProfile.innerHTML = `
//             <img src="${data.data[0].artist.picture_small}" alt="">
//             <span class="fw-bold">${data.data[0].artist.name}</span>
//             <span>•</span>
//             <span class="fw-bold">2017</span>
//             <span>•</span>
//             <span class="fw-bold">12 Brani, </span>
//             <span>${min} min ${sec} sec</span>
//         `;
//         for(let oggetto in data) {
//             results.push(data[oggetto]);
//         }
//     }
//     console.log(data);
//     console.log(results);
// }

// function searchInput() {
//     const filterInput = document.getElementById(`filter-input`).value.toLowerCase();
//     filter = filterInput;
//     chiamataFetch();
//     const container = document.getElementById(`center-div`)
//     container.style.display = `none`
// }


{/* <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div> */}

async function chiamataFetch() {

const response = await fetch(api + filter, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
// Variabili per la durata
let totSec = 0;
let min = 0;
let sec = 0;
const data = await response.json();

const container = document.getElementById(`center-div`)

if(container){
    container.innerHTML=``
    data.data.map((traccia) =>{
        totSec+=parseInt(traccia.duration);
        min = parseInt(totSec/60);
        sec = parseInt(totSec - (min*60));
        container.innerHTML +=  
        `   <div class="w-100 my-3 ">
                <div class="card shadow-sm w-100 h-100 bg-black text-white d-flex align-items-center justify-content-between flex-row">
                    <div class="d-flex align-items-center justify-content-center mt-3"><img src="${traccia.album.cover_medium}" alt="copertina album"></div>
                    <div class="card-body">
                        <h3 class="card-text">${traccia.album.title}</h3>
                        <p class="card-text">${traccia.artist.name}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small>${min} min ${sec} sec</small>
                        </div>
                    </div>
                </div>
            </div>`;
        totSec = 0;
    })
}
console.log(container);
console.log(data);
}

function searchInput() {
    const filterInput = document.getElementById(`filter-input`).value.toLowerCase();
    filter = filterInput;
    chiamataFetch();
}