console.log("WELCOME TO MUSIFY");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3.mp3');  

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "NCS 1", filePath:"1.mp3.mp3", coverPath: "covers/ncs1.jpg"},
    {songName: "NCS 2", filePath:"2.mp3.mp3", coverPath: "covers/ncs2.jpg"},
    {songName: "NCS 3", filePath:"3.mp3.mp3", coverPath: "covers/ncs3.jpg"},
    {songName: "NCS 4", filePath:"4.mp3.mp3", coverPath: "covers/ncs4.jpg"},
];

// Load song info into the UI
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// 🔧 FIXED: Add event listeners to all small play buttons
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        // reset all small play buttons to play icon
        Array.from(document.getElementsByClassName('songitemplay')).forEach((el) => {
            el.classList.remove('fa-circle-pause');
            el.classList.add('fa-circle-play');
        });

        // change the clicked one to pause icon
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        songIndex = i;
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});
