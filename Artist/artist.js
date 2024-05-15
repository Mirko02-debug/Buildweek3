const url ="https://striveschool-api.herokuapp.com/api/deezer/search?q=encore";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y"

async function chiamataFetch() {

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    const bgImg = document.getElementById(`artist-info`);
    if(bgImg){
        bgImg.style.backgroundImage= `url(${data.data[10].artist.picture_big})`;
    }
    console.log(data);
}
chiamataFetch();