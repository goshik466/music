const apiURL = "https://api.lyrics.ovh/";
const form = document.getElementById("form");
const button = document.getElementById("button");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
let  searchSong = async searchTerm => {
  let res = await fetch(`${apiURL}/suggest/${searchTerm}`)
    let data = await res.json()
    console.log(data)
    showSongs(data)
}

function showSongs(data){
    let output = ""
    data.data.forEach( song => (output += `
    <li class="song-item">
     <strong>${song.artist.name}</strong> <span>-</span> <span>${song.title}</span> 
    <a class="listen" tatget="_blank" href=${song.preview}>listen preview</a>


    </li>`)
)

    result.innerHTML = `<ul>${output}</ul>`;
    if(data.prev || data.next){
        more.innerHTML = `
${data.prev ? `<button  onclick="getMoreSongs('${data.prev}')" class="btn">prev</button>` : ``}
${data.next ? `<button onclick="getMoreSongs('${data.next}')" class="btn">next</button>` : ``}

`;
        
    }
}
 async function getMoreSongs  (link){
    console.log("--", link);
     let res = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);
     let data = await res.json()
     console.log(data)
     showSongs(data)
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("please, type something!");
  } else {
    console.log(searchTerm);
    searchSong(searchTerm);
  }
});

