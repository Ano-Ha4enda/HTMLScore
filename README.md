# htmlscore
自分で作成したテキストファイルをもとに、コードブックを自動生成します。
歌詞とコードを表示し、自動するクロールするサービスは

U-FRET (https://www.ufret.jp/)

楽器`.`me (https://gakufu.gakki.me/)

J-Total music (https://music.j-total.net/)

というものがありますが、サービスが採譜、提供している曲しか掲載されていません。

そこで、これらに未掲載の曲やオリジナル曲、コードを自分でアレンジしたい場合に、自作のテキストファイルから同様の機能を持つコードブックを作成します。ギターやピアノの弾き語り時に活用ください。

ブラウザアプリです。Vue.jsを使用しており、現状はgit pagesで動作しています。以下のリンクからご利用いただけます。

[HTMLScore - git pages](https://halfrighter.github.io/HTMLScore/)

## How to use
1. ファイル選択ボタンをクリックし、該当のテキストファイルを開きます。
1. テキストファイルの情報を元に、曲の情報および歌詞とコードを表示します。
    * 登録できる情報は以下です。
        * タイトル
        * 曲のキー
        * 作者(作詞、作曲は分けていません)
        * カポ位置
        * スクロールスピード
* **カポを変更することによるコードの移調は未実装です。**

## How to make Txt File
`Title: `, `Key: `, `Artist: `, `Capo: `, `ScrollSpeed: `で始まる行は、それぞれ曲情報として認s識します。同じ情報がファイル内に複数ある場合は、最も後ろにあるものを優先します。

* `Title` 曲のタイトル
* ` Key` デフォルトはCです
* `Artist` なければ表示されません
* `Capo` 1音下げチューニング~10カポまでを想定しています。半角数字(-2~10)で指定してください。デフォルトは0です
* `ScrollSpeed` 大きいほど速くスクロールします(上限20)。半角数字で指定してください。デフォルトは10です。

`@`で始まる行はコードとして認識し。それ以外の行は全て歌詞と認識します。空行も歌詞の空行として認識します。

コードの行と直下の行は、コードと歌詞を`;`で区切ることで位置を揃えることができます。

記入例(トップページの歌詞を表示するテキスト)
> Title: Song1
>
> Key: A
>
> Artist: Halfrighter
>
> Capo: 2 
>
> ScrollSpeed: 10
>
> @C;F;G
>
> @C;G
>
> This is ;lyric
>
> Lyrics are shown as here.

## Warning
あくまで私的利用しか想定していません。Txtファイルの公開はしていないのでサービス自体は著作権に抵触していないはずです。

著作権で守られている曲についてこのサービスで使えるフォーマットを勝手に後悔するのはおそらくアウトなのでお気をつけください。ご利用は自己責任でお願いします。

***
Lyric and Code Viewer made of vue.js

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
