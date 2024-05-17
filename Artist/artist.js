const api ="https://striveschool-api.herokuapp.com/api/deezer/artist/";
const newUrl = new URLSearchParams(location.search);
const id = newUrl.get("id");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"
const canzoniUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/13/top?limit=50";




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
    hero.innerHTML = `  <div class="col-12 mb-5">
                        <img class="shadow" src="${data.picture_medium}" alt="" >
                        
                            <h1>${data.name}</h1>
                        </div>`;

    const tracks = document.getElementById('lista-canzoni');
    // data.tracks.data.map((traccia) => {
    //     ashtag++
    //     totSec=parseInt(traccia.duration);
    //     min = parseInt(totSec/60);
    //     sec = parseInt(totSec - (min*60));
    //     tracks.innerHTML += 
    //     `
    //             <tr>
    //               <th class="col-1">${ashtag}</th>
    //               <td class="col-7 d-flex flex-column justify-content-center "><span>${traccia.tracklist}</span><span class="opacity-25">${traccia.album.title}</span></td>
    //               <td class="col-2 opacity-25">${traccia.rank}</td>
    //               <td class="col-2 opacity-25">${min}:${sec}</td>
    //             </tr>
    //     `
    // });

    }

chiamataFetch();

async function altraChiamata() {

    let totSec = 0;
    let min = 0;
    let sec = 0;
    let ashtag = 0;
    
    
    const response = await fetch(canzoniUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const canzoniData = await response.json();
    console.log(canzoniData);
    const tracks = document.getElementById('lista-canzoni');
    canzoniData.data.map((canzone) => {
        ashtag++
         totSec=parseInt(canzone.duration);
         min = parseInt(totSec/60);
         sec = parseInt(totSec - (min*60));
         tracks.innerHTML += 
         `
                 <tr>
                   <th class="col-1">${ashtag}</th>
                   <td class="col-7 d-flex flex-column justify-content-center "><span>${canzone.title}</span></td>
                   <td class="col-2 opacity-25">${canzone.rank}</td>
                   <td class="col-2 opacity-25">${min}:${sec}</td>
                 </tr>
         `
    })
}

altraChiamata()