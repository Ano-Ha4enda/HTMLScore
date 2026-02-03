<template>
  <div id="app" class="main">
    <div class="title">{{ Title }}</div>
    <div class="info">
      <input type="file" @change="loadTxt">
      <select name="Transepose" v-model="Capo" >
        <option v-for="tp in Transposes" :key="tp.value" :value="tp.value">
          {{ tp.text }}
        </option>
      </select>
      <div v-if="Artist" class="info-val"> Artist: {{ Artist }} </div>
      <div class="info-val">&nbsp;ScrollSpeed:</div>
      <input type="number" v-model="scrollSpeed" style="width:30px" min="1" max="20">
    </div>
    <div class="words" @click="scrollAuto">
      <table v-for="(word, wIdx) in Words" :key="wIdx">
        <tr class="chord" v-if="word.Chords.length">
          <template v-if="!word.Lyrics.length">
            <td class="chord-only" v-for="(chord, cIdx) in word.Chords" :key="cIdx">{{ chord }}</td>
          </template><template v-else>
          <td v-for="(chord, cIdx) in word.Chords" :key="cIdx">{{ chord }}</td>
          </template>
        </tr>
        <tr class="lyric" v-if="word.Lyrics.length">
          <td v-for="(lyric, lIdx) in word.Lyrics" :key ="lIdx">{{ lyric }}</td>
        </tr>
        <tr v-if="!word.Chords.length && !word.Lyrics.length"></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
    }
  },
  computed: {
    capoToString: function () {
      if (this.Capo == -2) {
        return "Whole Down";
      } else if (this.Capo == -1) {
        return "Half Down";
      } else {
        return "Capo " + this.Capo;
      }
    },
  },
  methods: {
    loadTxt: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let file = files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let lines = reader.result.split("\n");
        this.Words = [];
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i] || "";
          if (line.indexOf("Title:") == 0) {
            this.Title = line.replace("Title:", "").trim();
          } else if (line.indexOf("Key:") == 0) {
            this.Key = line.replace("Key:", "").trim();
          } else if (line.indexOf("Artist:") == 0) {
            this.Artist = line.replace("Artist:", "").trim();
          } else if (line.indexOf("Capo:") == 0) {
            const v = line.replace("Capo:", "").trim();
            this.Capo = isNaN(parseInt(v, 10)) ? 0 : parseInt(v, 10);
          } else if (line.indexOf("ScrollSpeed:") == 0) {
            const v = line.replace("ScrollSpeed:", "").trim();
            this.scrollSpeed = isNaN(parseInt(v, 10)) ? this.scrollSpeed : parseInt(v, 10);
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
            this.Words.push({ Chords: chordTmpArr, Lyrics: lyricTmpArr });
          }
        }
      };
    },
    scrollAuto: function() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = 0;
        return;
      }
      let interval = 25 * (21 - this.scrollSpeed);
      this.timer = setInterval(() => {
        window.scrollBy(0, 1);
        if(window.scrollY >= 50 + document.body.clientHeight - window.innerHeight) {
          clearInterval(this.timer);
          this.timer = 0;
        }
      }, interval);
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.chord {
  color: blue;
  font-size: 80%;
}

.chord > a {
  margin-right: 6px;
}

.chord > span {
  margin-right: 12px;
}

.chord-only {
  padding-right: 25px;
}

.info {
  margin: 20px;
}

.info > input {
  float: left;
  margin-right: 10px;
  width: 30%;
}

.info > select {
  float: left;
  margin-right: 10px;
}

.info > .info-val {
  float: left;
  margin-right: 10px;
}

.main {
    background-color: blanchedalmond;
    color: black;
    border-color: black;
    border-style: double;
    margin: 5% 20px 5% 5%;
    padding: 3%;
}

.lyric {
    border:0px;
    height: 20px;
    padding: 0px;
}

.title {
    font-size: x-large;
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
}

.txt {
    font-size: 100%;
}

.words {
  clear: both;
  padding-top: 20px;
}

.words > table {
  border-spacing: 0mm;
  padding: 0px;
}
</style>