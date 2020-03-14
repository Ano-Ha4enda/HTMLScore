<template>
  <div id="app" class="main">
    <div class="title">{{ Title }}</div>
    <p class="info">
      <input type="file" @change="loadTxt">
      <select name="Transepose" v-model="capoToString" >
        <option v-for="tp in Transposes" :key="tp.value">
          {{ tp.text }}
        </option>
      </select>
      Artist: {{ Artist }}
    </p>
    <div v-for="(word, key) in Words" :key="key">
      <div class="code" v-if="word.Code">{{ word.Code }}</div>
      <div class="lyric" v-if="word.Lyric">{{ word.Lyric }}</div>
      <div v-else-if="!word.Code"><br></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  
  data() {
    return {
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

      Title: "Song title",
      Key: "C",
      Artist: "",
      Capo: 0,
      Words: [],
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
                    let codeTmp = "";
                    let lyricTmp = "";
                    if (lines[i].indexOf("@") == 0) {
                        codeTmp = lines[i].replace("@", "");
                        i++;
                    }
                    if (lines[i].indexOf("@") == 0) {
                      i--;
                    } else {
                      lyricTmp = lines[i]
                    }
                    this.Words.push({ Code: codeTmp, Lyric: lyricTmp });
                }
            };
        },

        popAlert: function () {
            alert("alert");
            console.log("alert");
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

.info {
    margin: 20px;
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
}</style>
