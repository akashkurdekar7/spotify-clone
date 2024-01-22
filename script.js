console.log("Welcome to Spotify");

// initialization of the variables
let songIndex= 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "ghumshuda - king", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "lovely - billie elish", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "six feet under - billie elish", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "its you - ali gatie", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "rise - jonas blue", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "hope - juice world", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
]

songItems.forEach((element, i) => {
    
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songsName")[0].innerText = songs[i].songName;
});

// handle play and pause

masterplay.addEventListener('click', () => {
    if(audioElement.pause() || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})


// listen to Event
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');

    })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex<6){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})