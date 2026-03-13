import { ref } from 'vue'

export function useSongParser() {
  const songData = ref({
    Title: "Song title",
    Key: "C",
    Artist: "",
    Capo: 0,
    Words: [
      {
        Chords: ["C","F","G"],
        Lyrics: [],
      },
      {
        Chords: ["C","G"],
        Lyrics: ["This is ","lyric"]
      },
      {
        Chords: [],
        Lyrics: ["Lyrics are shown as here."]
      }
    ],
    scrollSpeed: 10,
    timer: 0,
    Transposes: [
      { text: "Whole Down", value: -2 },
      { text: "Half Down", value: -1 },
      { text: "Capo 0", value: 0 },
      { text: "Capo 1", value: 1 },
      { text: "Capo 2", value: 2 },
      { text: "Capo 3", value: 3 },
      { text: "Capo 4", value: 4 },
      { text: "Capo 5", value: 5 },
      { text: "Capo 6", value: 6 },
      { text: "Capo 7", value: 7 },
      { text: "Capo 8", value: 8 },
      { text: "Capo 9", value: 9 },
    ],
  })

  const capoToString = () => {
    if (songData.value.Capo == -2) {
      return "Whole Down";
    } else if (songData.value.Capo == -1) {
      return "Half Down";
    } else {
      return "Capo " + songData.value.Capo;
    }
  }

  const parseSongData = (content) => {
    const lines = content.split("\n");
    songData.value.Words = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] || "";
      if (line.indexOf("Title:") == 0) {
        songData.value.Title = line.replace("Title:", "").trim();
      } else if (line.indexOf("Key:") == 0) {
        songData.value.Key = line.replace("Key:", "").trim();
      } else if (line.indexOf("Artist:") == 0) {
        songData.value.Artist = line.replace("Artist:", "").trim();
      } else if (line.indexOf("Capo:") == 0) {
        const v = line.replace("Capo:", "").trim();
        songData.value.Capo = isNaN(parseInt(v, 10)) ? 0 : parseInt(v, 10);
      } else if (line.indexOf("ScrollSpeed:") == 0) {
        const v = line.replace("ScrollSpeed:", "").trim();
        songData.value.scrollSpeed = isNaN(parseInt(v, 10)) ? songData.value.scrollSpeed : parseInt(v, 10);
      } else {
        let chordTmpArr = [];
        let lyricTmpArr = [];
        if (line.indexOf("@") == 0) {
          chordTmpArr = line.replace("@", "").split(";");
          // check next line safely
          if (i + 1 < lines.length) {
            const next = lines[i + 1] || "";
            if (next.indexOf("@") == 0 || next.length == 0) {
              // no lyrics for this chord line
            } else {
              lyricTmpArr = next.split(";");
              i++; // consume the lyric line
            }
          }
        } else {
          lyricTmpArr = line.split(";");
        }
        songData.value.Words.push({ Chords: chordTmpArr, Lyrics: lyricTmpArr });
      }
    }
  }

  const scrollAuto = () => {
    if (songData.value.timer) {
      clearInterval(songData.value.timer);
      songData.value.timer = 0;
      return;
    }
    let interval = 25 * (21 - songData.value.scrollSpeed);
    songData.value.timer = setInterval(() => {
      window.scrollBy(0, 1);
      if(window.scrollY >= 50 + document.body.clientHeight - window.innerHeight) {
        clearInterval(songData.value.timer);
        songData.value.timer = 0;
      }
    }, interval);
  }

  return {
    songData,
    capoToString,
    parseSongData,
    scrollAuto
  }
}