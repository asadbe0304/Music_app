let currentMusic = 0;
const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar")
const artistName = document.querySelector(".artist-name")
const musicName = document.querySelector(".music-name")
const disk = document.querySelector(".disk")
const currentTime = document.querySelector(".current-time")
const musicDuration = document.querySelector(".duration-time")
const playbtn = document.querySelector(".play-btn")
const nextbtn = document.querySelector(".next-btn")
const prevbtn = document.querySelector(".prev-btn")


playbtn.addEventListener('click', (e) => {
    if (playbtn.className.includes("pause")) {
        music.play()
    } else {
        music.pause()
    }
    playbtn.classList.toggle("pause")
    disk.classList.toggle("play")
});

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i]
    currentMusic = i;
    music.src = song.path
    musicName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = "00:00";
    setTimeout(() => {
        seekBar.max = music.duration;
        console.log(music.duration);
        musicDuration.innerHTML = formatTime(music.duration)
    }, 300)

}

setMusic(0)

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min} :${sec}`
}

setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
}, 500)

seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value
} )

const playMusic= ()=>{
    music.play();
    playbtn.classList.remove("pause")
    disk.classList.remove("play")
} 

nextbtn.addEventListener("click", (e)=>{
    if(currentMusic >= songs.length -1){
    currentMusic= 0
    }else{
        currentMusic++ 
    }
    setMusic(currentMusic)
    playMusic()
    // playbtn.click()
})
prevbtn.addEventListener("click", (e)=>{
    if(currentMusic <= songs.length - 1){
    currentMusic = 0
    }else{
        currentMusic-- 
        music.play()
    }
    setMusic(currentMusic)
    // playbtn.click()
    playMusic()
})