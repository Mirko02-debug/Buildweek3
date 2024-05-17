document.addEventListener("DOMContentLoaded", function () {
  const api = "https://striveschool-api.herokuapp.com/api/deezer/search?q=pantera";
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y";

  // Funzione per ottenere le tracce al caricamento della pagina
  async function fetchTraccia() {
    try {
      const response = await fetch(api, {
        headers: {
          "Authorization": token
        }
      });
      const tracce = await response.json();
      displayTracce(tracce.data);
      displayImgs(tracce.data);
      displayCard(tracce.data);
    } catch (error) {
      console.error("Errore durante il recupero delle tracce:", error);
    }
  }

  function displayTracce(tracce) {
    const container = document.querySelector(".jumbo");
    container.innerHTML = ''; 
    tracce.forEach(traccia => {
      container.innerHTML = `
        <div class="album-img">
            <img src="${traccia.album.cover_medium}" alt="copertina album">
        </div>
        <div class="txt-btn">
            <div class="album">ALBUM</div>
            <h1 class="title">${traccia.album.title}</h1>
            <p class="artisti">${traccia.artist.name}</p>
            <p class="payoff">${traccia.duration} sec</p>
            <button class="btn-play"><b>Play</b></button>
            <button class="btn-jumbo"><b>Salva</b></button>
        </div>
      `;
    });
  }

  function displayImgs(tracce) {
    const picsContainer = document.querySelector(".album-shelf");
    picsContainer.innerHTML = ''; 

    // Randomizzo tracce
    tracce.sort(() => Math.random() - 0.5);

    // Array dei testi da inserire nei paragrafi
    const testi = [
        "Early Stage Emily Syndrome (set-ott 2022)",
        "Be The Young",
        "Saggio Vibes 🎉 [] 📡",
        "Brani che ti piacciono",
        "2021101",
        "Deep Dive with Ali Abdaal"
    ];

    // Divido l'array di tracce in gruppi di 4
    for (let i = 0; i < tracce.length; i += 4) {
        const tracceGroup = tracce.slice(i, i + 4);

        // Verifico se il gruppo ha solo una traccia
        if (tracceGroup.length === 1) {
            continue; // Salto questo gruppo 
        }

        let groupHTML = `
        <div class="card-random">
          <div class="album-pics">
        `;

        tracceGroup.forEach(traccia => {
            groupHTML += `
              <div class="album-mini">
                  <img src="${traccia.album.cover_medium}" alt="copertina album">
              </div>
            `;
        });

        groupHTML += `
          </div>
          <p>${testi[i/4]}</p>
        </div>
        `;

        picsContainer.innerHTML += groupHTML;
    }
}



  function displayCard(tracce) {
    const card = document.getElementById("card");
    card.innerHTML = ''; 
    tracce.forEach(traccia => {
      card.innerHTML += `
        <div class="card-container" style="width: 10rem;">
            <img src="${traccia.album.cover_medium}" class="card-img-top" alt="${traccia.album.title}">
            <div class="card-body">
                <h5 class="card-title mt-1 ">${traccia.album.title}</h5>
                <p class="card-text">${traccia.artist.name}</p>
            </div>
        </div>
      `;
    });
  }

  fetchTraccia();
displayCard();

  // 16.05 Chiamata alla funzione al caricamento della pagina

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
                        <h3 class="card-text"><a href="/Album/album.html?id=${traccia.album.id}">${traccia.album.title}</a></h3>
                        <p class="card-text"><a href="/Artist/artist.html?id=${traccia.artist.id}">${traccia.artist.name}.</a></p>
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
        jumbo.innerHTML = `
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
  })
});
