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
      <input type="number" v-model="scrollSpeed" style="width:30px">
    </div>
    <div class="word" v-for="word in Words" :key="word.key" @click="scrollAuto">
      <div class="code" v-if="word.Codes.length">
        <template v-for="code in word.Codes">
          <a v-if="code" :key="code.key">{{ code }}</a>
          <span v-else :key="code.key"></span>
        </template>
      </div>
      <div class="lyric" v-if="word.Lyric">{{ word.Lyric }}</div>
      <div v-else-if="!word.Codes.length"><br></div>
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
          Codes: [
            "C","","","","G",
          ],
          Lyric: "Lyricだよ。"
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
            console.log("method start");
            let files = e.target.files || e.dataTransfer.files;

            if (!files.length) {
                return;
            }
            
            let file = files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let lines = reader.result.split("\n");
                this.Title = lines[0];
                this.Key = lines[1];
                this.Artist = lines[2];
                this.Capo = lines[3];
                this.Words = [];
                for (let i = 4; i < lines.length; i++) {
                  let codeTmpArr = [];
                  let lyricTmp = "";
                  if (lines[i].indexOf("@") == 0) {
                    codeTmpArr = lines[i].replace("@", "").split(",");
                    i++;
                  }
                  if (lines[i].indexOf("@") == 0) {
                    i--;
                  } else {
                    lyricTmp = lines[i]
                  }
                  this.Words.push({ Codes: codeTmpArr, Lyric: lyricTmp });
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
          let duration = (50 - this.scrollSpeed) * 10000;
          let interval = 100;
          const step = 5000 / Math.ceil(duration / interval); // 1回に移動する距離
          this.timer = setInterval(() => {
            console.log("scroll");
            window.scrollBy(0, step);   // スクロール位置を移動
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

.code {
  color: blue;
  font-size: 80%;
}

.code > span {
  margin-right: 2%;
};

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

.title {
    font-size: x-large;
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
}

.txt {
    font-size: 100%;
}

.word {
  clear: both;
}
</style>
