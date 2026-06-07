const songs = [

{
    title:"Allu Sillu Thallu Thallu - God Mode _ Karuppu _ Tamil",
    artist:"Sai Abhyankkare",
    src:"songs/song1.mp3"
},

{
    title:"Vettaiyan - Hunter Vantaar BGM",
    artist:"Anirudh Ravichander",
    src:"songs/song2.mp3"
},

{
    title:"Yedi Song",
    artist:"Dhanush",
    src:"songs/song3.mp3"
}

];

let currentSong = 0;

const audio =
document.getElementById("audio");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const playBtn =
document.getElementById("playBtn");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");

const currentTime =
document.getElementById("currentTime");

const duration =
document.getElementById("duration");

const playlist =
document.getElementById("playlist");

loadSong(currentSong);

/* Load Song */

function loadSong(index){

    audio.src = songs[index].src;

    title.textContent =
    songs[index].title;

    artist.textContent =
    songs[index].artist;
}

/* Play Pause */

function playPause(){

    if(audio.paused){

        audio.play();

        playBtn.innerHTML = "⏸";

    }else{

        audio.pause();

        playBtn.innerHTML = "▶";
    }
}

/* Next Song */

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";
}

/* Previous Song */

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";
}

/* Progress Bar */

audio.addEventListener("timeupdate",()=>{

    const progressPercent =
    (audio.currentTime / audio.duration) * 100;

    progress.value =
    progressPercent || 0;

    currentTime.textContent =
    formatTime(audio.currentTime);
});

/* Duration */

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent =
    formatTime(audio.duration);
});

/* Seek */

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) *
    audio.duration;
});

/* Volume */

volume.addEventListener("input",()=>{

    audio.volume = volume.value;
});

/* Format Time */

function formatTime(time){

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/* Playlist */

songs.forEach((song,index)=>{

    let li =
    document.createElement("li");

    li.textContent =
    `${song.title} - ${song.artist}`;

    li.onclick = ()=>{

        currentSong = index;

        loadSong(currentSong);

        audio.play();

        playBtn.innerHTML = "⏸";
    };

    playlist.appendChild(li);
});

/* Auto Play Next Song */

audio.addEventListener("ended",()=>{

    nextSong();
});