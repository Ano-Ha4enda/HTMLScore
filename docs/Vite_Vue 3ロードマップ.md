**新規 Vite + Vue 3 プロジェクト構築ロードマップ** 🚀

---

## ステップ 1️⃣ — 新しいブランチで Vite テンプレート初期化

```bash
git checkout -b feat/vite-vue3-migration
npm init vite@latest . -- --template vue
```

新しいディレクトリ構造：
```
src/
  components/
  App.vue
  main.js
  style.css
index.html
vite.config.js
package.json（Vue 3 最小構成）
```

---

## ステップ 2️⃣ — 既存コードの移行（段階的）

| ファイル | Vue 2 | → Vue 3 | 対応内容 |
|---------|-------|--------|--------|
| App.vue | Composition API なし | Composition API 対応可 | スクリプト仕様・ライフサイクル更新 |
| `methods` | `loadTxt()`, `scrollAuto()` | 同じだが setup() 内に移行可 | 互換性あり（修正不要な可能性高） |
| `data()` | reactive data | `ref()` / `reactive()` | 簡単な置換で対応 |
| CSS | scoped CSS | 同一サポート | 変更不要 ✅ |

---

## ステップ 3️⃣ — 動作確認

```bash
npm run dev  # Vite dev server
npm run build  # 本番ビルド
```

---

## 実行方針（2択） 🔨

**A: 自動実行（推奨）** ✨  
→ Vite テンプレート作成 + App.vue 移行 + dev サーバで動作確認 → 移行完了レポート

**B: 手順確認後に実行** 🔍  
→ 先に詳細スケジュール・修正ポイント一覧を確認してから実行

どちらですか？（A / B）