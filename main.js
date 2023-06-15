import './style.css'
import { latestSong } from './data'
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const progress = document.querySelector('#progress')
const songInfo = document.querySelector('#songInfo')
const record = document.querySelector('#record')
const audio = new Audio(`${latestSong.file}`)
let startingRotation = 0

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
<article class="relative isolate overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-60 sm:pt-48 lg:pt-60 w-full md:w-1/2">
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
<p class="font-xs mt-8">1 rotation = 10 seconds of song time</p>
`

Draggable.create("#record", {
  type: "rotation",
  onDragStart: function() {
    startingRotation = Math.floor(this.rotation)
    record.classList.remove('spin')
    audio.pause()
  },
  onDragEnd: function() {
    const delta = Math.floor((Math.floor(this.rotation) - startingRotation)/360)
    const songTime = delta * 10
    audio.currentTime = audio.currentTime + songTime
    record.classList.add('spin')
    record.style.animationPlayState = 'running'
    audio.play()
  }
})