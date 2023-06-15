export const songs = 
[
    {
        index: 0,
        month: "June",
        year: "2023",
        title: "DIRT MCGERK",
        artist: "Kodak Black feat. EST Gee & Lil Crix",
        link: "https://youtu.be/wcCwsj9NkCc",
        youtubeID: "wcCwsj9NkCc",
        file: "./DIRT-MCGERK.mp3",
        color: "#421f2c"
    },
    {
        index: 1,
        month: "July",
        year: "2023",
        title: "The Hillbillies",
        artist: "Baby Keem & Kendrick Lamar",
        link: "https://youtu.be/nsCsM1xqiTY",
        youtubeID: "nsCsM1xqiTY",
        file: "./the-hillbillies.mp3",
        color: "#283a9a"
    },
]

export const latestSong = songs[songs.length - 1]

export const prevSongs = songs.slice(0, songs.length - 1)