const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y";
const api = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let filter = ``;
let results = [];



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

  if (container) {
    container.innerHTML = ``
    data.data.map((traccia) => {
      totSec += parseInt(traccia.duration);
      min = parseInt(totSec / 60);
      sec = parseInt(totSec - (min * 60));
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
};

function searchInput() {
  const filterInput = document.getElementById(`filter-input`).value.toLowerCase();
  filter = filterInput;
  chiamataFetch();
}
//funzione per visualizzare il contenuto
document.addEventListener("DOMContentLoaded", function () {

  const tracciaContainer = document.getElementById("jumbo");

  // Funzione per ottenere le tracce al caricamento della pagina
  async function fetchTraccia() {
    try {
      const response = await fetch(api, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const tracce = await response.json();
      displayTracce(tracce);
    } catch (error) {
      console.error("Errore durante il recupero delle tracce:", error);
    }
  }

  function displayTracce(tracce) {
    // Pulisce il contenitore prima di aggiungere le tracce
    tracciaContainer.innerHTML = "";
    // Itera su ogni traccia e crea il suo elemento HTML
    tracce.forEach(traccia => {
      const tracciaElement = document.createElement("div");
      tracciaElement.classList.add("jumbo");
      tracciaElement.innerHTML = `
        <div class="album-img">
            <img src="${traccia.album.cover_medium}" alt="copertina album">
        </div>
        <div class="txt-btn">
            <div class="album">ALBUM</div>
            <h1 class="title">${traccia.album.title}</h1>
            <p class="artisti">${traccia.artist.name}.</p>
            <p class="payoff">blabla</p>
        </div>
      `;
    });
  }

  // Chiamata alla funzione al caricamento della pagina
  fetchTraccia();

}); 

