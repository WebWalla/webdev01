let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            //chatGPT
            // let rawTrack = element.href.split(`${folder}`)[1]; // Original extraction
            // let sanitizedTrack = rawTrack.startsWith("/") ? rawTrack.slice(1) : rawTrack; // Remove leading slash
            // songs.push(sanitizedTrack);
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    //show all song in the playlist
    let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songsUL.innerHTML = "";
    for (const song of songs) {
        songsUL.innerHTML += `
        <li>
        <div class="info">
            <img class="invert" src="img/music.svg" alt="music img here">
               <div class="songInfo">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Shantesh</div>
               </div>
           <img class="invert infoSecond" src="img/play.svg" alt="playImgHere">
        </div>
        </li>`;
    }

    // add event to each element to play the song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(songs[e.querySelector(".songInfo").firstElementChild.innerHTML.trim()])
            playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML.trim())
        })
    })
    return songs;
}

//chatGPT
async function getSongs(folder) {
    currFolder = folder;
    let sanitizedFolder = folder.replace(/\/+$/, ""); // Remove trailing slashes if any
    // console.log(`Sanitized: ${sanitizedFolder}/`)
    let a = await fetch(`${sanitizedFolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${sanitizedFolder}/`)[1]);
        }
    }

    // Update playlist UI
    let songsUL = document.querySelector(".songList ul");
    songsUL.innerHTML = "";
    for (const song of songs) {
        songsUL.innerHTML += `
        <li>
        <div class="info">
            <img class="invert" src="img/music.svg" alt="music img here">
               <div class="songInfo">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Shantesh</div>
               </div>
           <img class="invert infoSecond" src="img/play.svg" alt="playImgHere">
        </div>
        </li>`;
    }

    // Add event listeners to play the song
    Array.from(document.querySelector(".songList li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".songInfo div").innerHTML.trim());
        });
    });

    return songs;
}






// let playMusic = (track, pause = false) => {
//     // let audio = new Audio("/songs/"+track);
//     currentSong.src = `/${currFolder}/` + track;
//     console.log(currentSong.src = `${currFolder}` + track)
//     if (!pause) {
//         currentSong.play();
//         play.src = "img/pause.svg";
//     }

//     document.querySelector(".songinfo").innerHTML = decodeURI(track)
//     document.querySelector(".songTime").innerHTML = "00:00 / 00:00";


// }

//chatGPT
let playMusic = (track, pause = false) => {
    // Sanitize currFolder by removing trailing slash if present
    let sanitizedFolder = currFolder.endsWith("/") ? currFolder.slice(0, -1) : currFolder;

    // Sanitize track by removing leading slash if present
    let sanitizedTrack = track.startsWith("/") ? track.slice(1) : track;

    // Concatenate folder and track
    currentSong.src = `${sanitizedFolder}/${sanitizedTrack}`;

    console.log("Normalized Path:", currentSong.src); // Debugging step

    // Play or pause the song
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    console.log("currFolder:", currFolder);
    console.log("track:", track);

    // Update UI
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};


// async function displayAlbums() {
//     let a = await fetch(`songs/`);
//     // let a = await fetch(`/page5/songs/${folder}/info.json`);

//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a");
//     let playlist_container = document.querySelector(".playlist-container")

//     let array = Array.from(anchors);
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];
//         if (e.href.includes("/songs")) {
//             let folder = e.href.split("/").slice(-2)[0];
//             //get metadata folder
//             let a = await fetch(`songs/${folder}/info.json`);
//             let response = await a.json();
//             // console.log(response);
//             playlist_container.innerHTML = playlist_container.innerHTML + `
//             <div data-folder="${folder}" class="card">
//                         <div class="play-Button">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
//                                 color="#000000" fill="#111">
//                                 <path
//                                     d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
//                                     stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
//                             </svg>
//                         </div>
//                         <div class="card-image ">
//                             <img src="songs/${folder}/cover.jpg" alt="song-image">
//                         </div>
//                         <h2>${response.title}</h2>
//                         <p>${response.description}</p>
//                     </div>
//             `
//             //add data to playlist cards

//         }
//     }

//     //load playlist whenever card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             console.log(`songs/${item.currentTarget.dataset.folder}`)
//             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
//             playMusic(songs[0]);
//         })
//     });

// }

//chatGPT
async function displayAlbums() {
    let a = await fetch(`/page5/songs/`); // Adjust root path if necessary
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let playlist_container = document.querySelector(".playlist-container");

    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]; // Extract the folder name correctly
            try {
                let metadataResponse = await fetch(`/page5/songs/${folder}/info.json`); // Correct path
                if (!metadataResponse.ok) {
                    console.warn(`info.json not found for folder: ${folder}`);
                    continue; // Skip this folder
                }
                let metadata = await metadataResponse.json();

                playlist_container.innerHTML += `
                <div data-folder="${folder}" class="card">
                    <div class="play-Button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                            color="#000000" fill="#111">
                            <path
                                d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="card-image">
                        <img src="/page5/songs/${folder}/cover.jpg" alt="song-image">
                    </div>
                    <h2>${metadata.title}</h2>
                    <p>${metadata.description}</p>
                </div>
                `;
            } catch (error) {
                console.error(`Error fetching metadata for folder: ${folder}`, error);
            }
        }
    }

    // Load playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(`songs/${item.currentTarget.dataset.folder}`);
            songs = await getSongs(`/page5/songs/${item.currentTarget.dataset.folder}`); // Ensure correct path
            playMusic(songs[0]);
        });
    });
}


async function main() {
    await getSongs("songs/ncs");
    playMusic(songs[0], true)

    displayAlbums();
    //add event listner to play, pause.
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg"

        }
        else {
            currentSong.pause();
            play.src = "img/play.svg"
        }

    })

    //update time

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}:${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    //event listner for seekbar
    document.querySelector(".seekBar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    //work on hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })

    //work on cancle button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })

    //add eventlistner to previous
    prevsong.addEventListener("click", () => {
        // currentSong.pause();
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            console.log(songs[index - 1]);
            playMusic(songs[index - 1])
        }

    })

    //add eventlistner to nextsong
    nextsong.addEventListener("click", () => {
        // currentSong.paused();
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        console.log(index)
        if ((index + 1) < songs.length) {
            console.log(songs[index + 1]);
            playMusic(songs[index + 1])
        }
    })

    //add eventlistner to volume
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    //add eventlistner to volume to mute
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = .10;
            document.querySelector(".volume").getElementsByTagName("input")[0].value = 10;
        }
    });


    //haryyy
}

main();