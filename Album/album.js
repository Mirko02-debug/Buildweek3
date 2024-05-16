const api ="https://striveschool-api.herokuapp.com/api/deezer/Album/";
const newUrl = new URLSearchParams(location.search);
const id = newUrl.get("id");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"

async function chiamataFetch() {

    let totSec = 0;
    let min = 0;
    let sec = 0;
    let ashtag = 0;

    const response = await fetch(api + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    totSec+=parseInt(data.duration);
    min = parseInt(totSec/60);
    sec = parseInt(totSec - (min*60));
    const hero = document.getElementById('hero');
    hero.innerHTML = `<div class="col-3" id="foto-profilo">
                        <img src="${data.cover_medium}" alt="" style="width: 100%">
                       </div>
                        <div class="col-9 mb-5">
                            <span class="fw-bold">Album</span>
                            <h1 id="album-title"></h1>
                            <div class="dettagli-hero" id="artist-profile">
                                <img src="img-user/Immagine WhatsApp 2023-11-19 ore 18.04.26_0543847ss3.jpg" alt="">
                                <span class="fw-bold" id="artist-name">${data.artist.name}</span>
                                <span>•</span>
                                <span class="fw-bold">2017</span>
                                <span>•</span>
                                <span class="fw-bold">${data.nb_tracks} Brani, </span>
                                <span>${min} min ${sec} sec</span>
                            </div>
                        </div>`;

    const tracks = document.getElementById('lista-canzoni');
    data.tracks.data.map((traccia) => {
        ashtag++
        totSec=parseInt(traccia.duration);
        min = parseInt(totSec/60);
        sec = parseInt(totSec - (min*60));
        tracks.innerHTML += 
        `
                <tr>
                  <th class="col-1">${ashtag}</th>
                  <td class="col-7">${traccia.title}</td>
                  <td class="col-2">${traccia.rank}</td>
                  <td class="col-2">${min}:${sec}</td>
                </tr>
        `
    });

    }

chiamataFetch();

//PER CALCOLARE I MINUTI (E I SECONDI) PRENDIAMO LA DURATA, DIVIDIAMO PER 60 E POI PRENDIAMO  
/** 128 SECONDI = 2 MINUTI E 8 SECONDI
 * 128 / 60 = 2,13 -> 2 minuti + (0.13333 * 60) -> prendo il numero intero e poi faccio il risultato -> il numero intero
 * 2,13 -> parseInt(2,13) -> 2 -> 2,13-2  = 0,13 * 60 = 8 secondi
 */