# Vue 3 + Vite 開発者ガイド

このガイドは、HTMLScoreプロジェクトのVue 3 + Vite環境での開発を支援するためのものです。プロジェクトのセットアップ、開発手順、ベストプラクティスについて説明します。

## プロジェクト概要

HTMLScoreは、Vue 3とViteをベースとしたWebアプリケーションです。音楽スコアの表示や編集機能を備えています。

- **フレームワーク**: Vue 3 (Composition API)
- **ビルドツール**: Vite
- **ルーティング**: Vue Router 4
- **言語**: JavaScript (ES Modules)

## セットアップ

### 前提条件

- Node.js (バージョン 16以上推奨)
- npm または yarn

### インストール

プロジェクトのルートディレクトリで以下のコマンドを実行してください：

```bash
npm install
```

またはyarnを使用する場合：

```bash
yarn install
```

## 開発サーバーの起動

開発中にローカルサーバーを起動するには：

```bash
npm run dev
```

これにより、Viteの開発サーバーが起動し、通常は `http://localhost:5173` でアクセスできます。ホットリロードが有効になっているため、ファイルを変更すると自動的にブラウザが更新されます。

## ビルド

本番環境用のビルドを作成するには：

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### プレビュー

ビルド後のファイルをローカルで確認するには：

```bash
npm run preview
```

## プロジェクト構造

```
src/
├── assets/          # 静的アセット（CSS、画像など）
├── components/      # Vueコンポーネント
├── router/          # Vue Routerの設定
├── views/           # ページコンポーネント
├── App.vue          # ルートコンポーネント
└── main.js          # エントリーポイント

public/              # 公開アセット
docs/                # ドキュメント
vite.config.js       # Vite設定
package.json         # プロジェクト設定
```

## 主要な依存関係

### ランタイム依存関係
- **Vue 3.5.24**: リアクティブなUI構築のためのフレームワーク
- **Vue Router 4.6.4**: SPAのルーティング管理
- **Core-js 3.11.2**: JavaScriptのポリフィル

### 開発依存関係
- **Vite 7.3.1**: 高速なビルドツールと開発サーバー
- **@vitejs/plugin-vue 6.0.1**: Vueファイルの処理
- **ESLint 9.39.1**: コード品質チェック
- **@vue/compiler-sfc 3.5.13**: Vue SFCコンパイラ

## 開発のヒント

### ESLintの使用

コードの品質を保つためにESLintを使用しています。以下のコマンドでチェックを実行：

```bash
npm run lint
```

### Vue 3 Composition API

このプロジェクトではVue 3のComposition APIを使用しています。リアクティブなデータを扱う際は `ref()` や `reactive()` を活用してください。

### Viteの機能

- **高速なHMR**: ファイル変更時の即時反映
- **ES Modules**: モダンなJavaScriptモジュールシステム
- **最適化されたビルド**: ツリーシェイキングとコード分割

### ベストプラクティス

1. **コンポーネントの分割**: 再利用可能な小さなコンポーネントを作成
2. **Composition APIの活用**: ロジックの再利用性を高める
3. **ルーティングの設計**: Vue Routerを効果的に使用してページ遷移を実装
4. **パフォーマンス最適化**: Viteのビルド最適化機能を活用

## トラブルシューティング

### よくある問題

- **ポートが使用中**: `npm run dev` でエラーが出る場合、別のポートを指定：`npm run dev -- --port 3000`
- **依存関係の競合**: `node_modules` を削除して再インストール：`rm -rf node_modules && npm install`

### サポート

問題が発生した場合は、以下のリソースを参照してください：

- [Vue.js公式ドキュメント](https://vuejs.org/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Vue Routerドキュメント](https://router.vuejs.org/)

## コントリビューション

開発に参加する場合は、以下の手順に従ってください：

1. このリポジトリをフォーク
2. 機能ブランチを作成
3. 変更を実装
4. テストを実行
5. プルリクエストを作成

コードの品質を維持するため、ESLintのチェックと適切なコミットメッセージをお願いします。