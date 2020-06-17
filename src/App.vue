<template>
  <div id="app" class="main">
    <div class="title">{{ Title }}</div>
    <div class="info">
      <input type="file" @change="loadTxt">
      <select name="Transepose" v-model="capoToString" >
        <option v-for="tp in Transposes" :key="tp.value">
          {{ tp.text }}
        </option>
      </select>
      <div v-if="Artist" class="info-val"> Artist: {{ Artist }} </div>
      <div class="info-val">&nbsp;ScrollSpeed:</div>
      <input type="number" v-model="scrollSpeed" style="width:30px" min="1" max="20">
    </div>
    <div class="words" @click="scrollAuto">
      <table v-for="word in Words" :key="word.key">
        <tr class="chord" v-if="word.Chords.length">
          <template v-if="!word.Lyrics.length">
            <td class="chord-only" v-for="chord in word.Chords" :key="chord.key">{{ chord }}</td>
          </template><template v-else>
          <td v-for="chord in word.Chords" :key="chord.key">{{ chord }}</td>
          </template>
        </tr>
        <tr class="lyric" v-if="word.Lyrics.length">
          <td v-for="lyric in word.Lyrics" :key ="lyric.key">{{ lyric }}</td>
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
          Lyrics: ["This is lyric"]
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

    // .txtファイル読み込み
    methods: {
        loadTxt: function (e) {
            let files = e.target.files || e.dataTransfer.files;
            // ファイルが存在しなければ終了
            if (!files.length) {
                return;
            }
            
            // FileReaderを実行
            let file = files[0];
            let reader = new FileReader();
            reader.readAsText(file);

            // readerに格納した.txtファイルを読み込み
            reader.onload = () => {
                // 1行ずつ配列化
                let lines = reader.result.split("\n");
                // 歌詞本体部分を初期化
                this.Words = [];
                //1行ずつforで処理
                for (let i = 0; i < lines.length; i++) {
                  // "Title: "で始まる行であればタイトルと認識
                  if (lines[i].indexOf("Title:") == 0) {
                    this.Title = lines[i].replace("Title:", "").trim();
                  // "Key: "で始まる行であればキーと認識
                  } else if (lines[i].indexOf("Key:") == 0){
                    this.Key = lines[i].replace("Key:", "").trim();
                  // "Artist: "で始まる行であればアーティスト名と認識
                  } else if (lines[i].indexOf("Artist:") == 0){
                    this.Artist = lines[i].replace("Artist:", "").trim();
                  // "Capo: "で始まる行であればカポ位置と認識
                  } else if (lines[i].indexOf("Capo:") == 0){
                    this.Capo = lines[i].replace("Capo:", "").trim();
                  // "ScrollSpeed: "で始まる行であればカポ位置と認識
                  } else if (lines[i].indexOf("ScrollSpeed:") == 0){
                    this.scrollSpeed = lines[i].replace("ScrollSpeed:", "").trim();
                  // どれでもなければ歌詞本体と認識、Word[]内にオブジェクトを追加
                  } else {
                    let chordTmpArr = [];
                    let lyricTmpArr = [];
                    // @で始まる行はコードと認識
                    if (lines[i].indexOf("@") == 0) {
                      chordTmpArr = lines[i].replace("@", "").split(";");
                      i++;
                      // 次の行もコードが連続する場合、Lyricを空のままWordsに追加、次の行はWords要素に入れる
                      if (lines[i].indexOf("@") == 0 || lines[i].length == 0) {
                        i--;
                      // @で始まらなければ歌詞と認識する
                      } else {
                        lyricTmpArr = lines[i].split(";");
                      } 
                    } else {
                      lyricTmpArr = lines[i].split(";");
                    }
                    // Words[]にコードと歌詞のオブジェクトを追加
                    this.Words.push({ Chords: chordTmpArr, Lyrics: lyricTmpArr });
                  }
                }
            };
        },

        scrollAuto: function() {
          // スクロール中だったら止まる
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
            return console.log("stop pushed");
          }
          let interval = 25 * (21 - this.scrollSpeed);
          this.timer = setInterval(() => {
            console.log("scroll");
            window.scrollBy(0, 1);   // スクロール位置を移動
            if(window.scrollY >= 50 + document.body.clientHeight - window.innerHeight) {
                console.log("stop");
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
