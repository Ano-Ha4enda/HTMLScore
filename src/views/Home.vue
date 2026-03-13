<template>
  <div class="main">
    <div class="title">{{ songData.Title }}</div>
    <div class="info">
      <input type="file" @change="loadTxt">
      <select name="Transepose" v-model="songData.Capo" >
        <option v-for="tp in songData.Transposes" :key="tp.value" :value="tp.value">
          {{ tp.text }}
        </option>
      </select>
      <div v-if="songData.Artist" class="info-val"> Artist: {{ songData.Artist }} </div>
      <div class="info-val">&nbsp;ScrollSpeed:</div>
      <input type="number" v-model="songData.scrollSpeed" style="width:30px" min="1" max="20">
    </div>
    <div class="words" @click="scrollAuto">
      <table v-for="(word, wIdx) in songData.Words" :key="wIdx">
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
import { useSongParser } from '../composables/useSongParser.js'

export default {
  name: 'Home',
  setup() {
    const { songData, parseSongData, scrollAuto } = useSongParser()

    const loadTxt = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let file = files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        parseSongData(reader.result)
      };
    }

    return {
      songData,
      loadTxt,
      scrollAuto
    }
  }
}
</script>

<style scoped>
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
    margin: 5px 5px 5px 5px;
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
