// api
const api = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=pantera'
//token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjY2M2NzgxODQ0MjAwMTUzNzU3NWIiLCJpYXQiOjE3MTU2MjI2NTEsImV4cCI6MTcxNjgzMjI1MX0.XPysuu2j4g-SV_E20G-RY5PanUO8Qv0TVe0HbwzGZ-Y';

async function chiamataFetch() {

    const response = await fetch(api, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}
chiamataFetch()