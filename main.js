import './style.css'
import { latestSong } from './data'
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const progress = document.querySelector('#progress')
const songInfo = document.querySelector('#songInfo')
const record = document.querySelector('#record')
const audio = new Audio(`${latestSong.file}`)

playBtn.addEventListener('click', () => {
  audio.play()
  record.classList.add('spin')
  if (record.style.animationPlayState == 'paused') {
    record.style.animationPlayState = 'running'
  }
})

pauseBtn.addEventListener('click', () => {
  audio.pause()
  record.style.animationPlayState = 'paused'
})

audio.addEventListener('timeupdate', () => {
  progress.innerText = audio.currentTime
  const minutes = Math.floor(audio.currentTime / 60)
  const seconds = Math.floor(audio.currentTime % 60)
  progress.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

audio.addEventListener('ended', () => {
  record.classList.remove('spin')
})

songInfo.innerHTML = `
<article class="relative isolate overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 w-full md:w-1/2">
  <img src="https://i.ytimg.com/vi/${latestSong.youtubeID}/maxresdefault.jpg" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover">
  <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
  <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
  <div class="mt-3 text-lg leading-6 text-white font-semibold">
     <p class="pb-2"><span class="font-bold">Title: </span> ${latestSong.title}</p>
     <p class="pb-2"><span class="font-bold">Artist: </span> ${latestSong.artist}</p>
     <p class="pb-2"><span class="font-bold">Link: </span> <a class="hover:underline" href="${latestSong.link}">${latestSong.link}</a></p>
     <p><span class="font-bold">Posted: </span> ${latestSong.month}, ${latestSong.year}</p>
  </div>
</article>
`

const getRotationDegrees = (elm) => {
  const style = window.getComputedStyle(elm, null);
  const transform = style.getPropertyValue("-webkit-transform") ||
                    style.getPropertyValue("-moz-transform") ||
                    style.getPropertyValue("-ms-transform") ||
                    style.getPropertyValue("-o-transform") ||
                    style.getPropertyValue("transform");
  
  let angle = 0;
  if (transform && transform !== 'none') {
      const values = transform.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  }

  return (angle < 0) ? angle + 360 : angle;
}

Draggable.create("#record", {type: "rotation", inertia: true});