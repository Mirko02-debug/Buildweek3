const api ="https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let filter=``;
let results =[];
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"


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
                        <h3 class="card-text"><a href="/Album/album.html?id=${traccia.album.id}">${traccia.album.title}</a></h3>
                        <p class="card-text"><a href="/Artist/artist.html">${traccia.artist.name}.</a></p>
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