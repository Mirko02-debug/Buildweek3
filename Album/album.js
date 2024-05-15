const api ="https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let filter=`salmo`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"

async function chiamataFetch() {

    const response = await fetch(api + filter, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    const fotoProfilo = document.getElementById(`foto-profilo`);
    const titoloAlbum = document.getElementById(`album-title`);
    const artistName = document.getElementById(`artist-name`);
    const artistProfile = document.getElementById(`artist-profile`);
    const filterInput = document.getElementById(`filter-input`).value.toLowerCase();
    if(fotoProfilo){
        fotoProfilo.innerHTML = `<img src="${data.data[0].album.cover_big}" alt="" style="width: 100%; ">`;
        titoloAlbum.innerHTML = `${data.data[0].album.title}`;
        artistName.innerHTML = `${data.data[0].artist.name}`;
        artistProfile.innerHTML = `
            <img src="${data.data[0].artist.picture_small}" alt="">
            <span class="fw-bold">${data.data[0].artist.name}</span>
            <span>•</span>
            <span class="fw-bold">2017</span>
            <span>•</span>
            <span class="fw-bold">12 Brani, </span>
            <span>53 min 20 sec</span>
        `;

    }
    console.log(data);
}
chiamataFetch();

//PER CALCOLARE I MINUTI (E I SECONDI) PRENDIAMO LA DURATA, DIVIDIAMO PER 60 E POI PRENDIAMO  
/** 128 SECONDI = 2 MINUTI E 8 SECONDI
 * 128 / 60 = 2,13 -> 2 minuti + (0.13333 * 60) -> prendo il numero intero e poi faccio il risultato -> il numero intero
 * 2,13 -> parseInt(2,13) -> 2 -> 2,13-2  = 0,13 * 60 = 8 secondi
 */