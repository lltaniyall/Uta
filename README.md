# 谷谷 Official Site v3

## URL構造
- `/` … TOP
- `/archive/` … アーカイブ一覧
- `/archive/2026-12-21/` … 日付別アーカイブ
- `/archive/2026-12-23/` … 日付別アーカイブ
- `/songs/` … 曲名検索データベース

## 重要
配信・曲データは `data/archives.js` に集約しています。

新しい歌枠を追加する時は:
1. `data/archives.js` に配信データを追加
2. `archive/YYYY-MM-DD/` フォルダを作る
3. 既存の日付フォルダ内 `index.html` をコピー

日付別 `index.html` は同じ内容でOKです。
URLのフォルダ名から日付を自動判定して、対応するデータを読み込みます。

## 配信データ例
{
  date: "2026-12-25",
  title: "クリスマス歌枠",
  videoId: "YouTube動画ID",
  songs: [
    { title: "曲名A", time: 123, type: "song" },
    { title: "MC", time: 456, type: "talk" }
  ]
}

## GitHub Pagesへ更新
このZIPの内容を既存Repositoryのルートへ上書きアップロードしてください。
既存ファイルと同名のものは置き換え、新しいフォルダも追加します。

## 共有URL
例:
`/archive/2026-12-21/?t=321`

このURLを開くと、その日の動画を321秒付近から表示できます。


## v4: 曲データベース改修
`songs/` は以下の3項目だけを一覧表示します。
- 曲名
- アーティスト名
- 歌唱回数

各見出しをクリックすると昇順 / 降順を切り替えできます。
曲名をクリックすると、その曲を歌った日付別アーカイブへのリンク一覧が展開されます。

### artist の追加
曲データには `artist` を入れてください。

```js
{ title: "KING", artist: "Kanaria", time: 321, type: "song" }
```

各日付別アーカイブのセットリストでも、曲名の後ろにアーティスト名が表示されます。


## v5: 共通の歌唱履歴ページ
曲一覧から曲名をクリックすると、共通テンプレートの歌唱履歴ページへ移動します。

例:
`/songs/history/?song=KING&artist=Kanaria`

このページはURLの `song` と `artist` を読み取り、`data/archives.js` から該当する歌唱履歴を自動生成します。

### 新曲追加時
HTMLやフォルダを増やす必要はありません。
`data/archives.js` の該当アーカイブに以下のような曲データを追加するだけです。

```js
{ title: "シャルル", artist: "バルーン", time: 1250, type: "song" }
```

自動で:
- SONG DATABASEに追加
- 曲名検索に対応
- アーティスト名検索に対応
- 歌唱回数を集計
- 共通歌唱履歴ページを表示
- 各歌唱のアーカイブリンクを生成


## v6: アーティストページ
SONG DATABASEのアーティスト名をクリックすると、
`/artists/?artist=Kanaria`
のような共通アーティストページへ移動します。

アーティストページには、そのアーティストの曲名と歌唱回数が自動表示されます。
曲名をクリックすると既存の歌唱履歴ページへ移動します。

導線:
SONG DATABASE
→ アーティスト名
→ アーティスト別楽曲一覧
→ 曲名
→ 歌唱履歴
→ 日付別アーカイブ

新しい曲や新しいアーティストを追加しても、HTMLやフォルダの追加は不要です。
`data/archives.js` に曲データを追加するだけで自動反映されます。


## v7: TOPページ改修

TOPページに以下を追加しました。

- 最新のコンテンツ: `data/archives.js` の日付から新しい順に最大5件を自動表示
- 歌唱回数ランキング: 全アーカイブから曲ごとの歌唱回数を集計しTOP10を自動表示
  - 曲名 → その曲の歌唱履歴
  - アーティスト名 → そのアーティストの楽曲一覧
- SNS LINKS: YouTube / X / BOOTH / Bluesky

### SNS URLの設定

`data/site-config.js` の空欄に自分のURLを入力してください。

```js
const SITE_CONFIG = {
  socials: {
    youtube: "https://...",
    x: "https://...",
    booth: "https://...",
    bluesky: "https://..."
  }
};
```

URLが空欄のSNSは、TOPページでは「URL SETTING」と表示されてクリックできない状態になります。

### 自動更新について

新しい配信や曲を `data/archives.js` に追加すると、TOPページの
「最新のコンテンツ」と「歌唱回数ランキング」も自動で更新されます。


## v8: TOPページ順序変更・SNSリンク可変化

TOPページの表示順:
1. EXPLORE
2. 最新のコンテンツ
3. 歌唱回数ランキング
4. SNS & LINKS

SNSリンクは `data/site-config.js` の配列で管理します。
項目を追加すれば表示が増え、削除すれば表示も減ります。

```js
const SITE_CONFIG = {
  socials: [
    { label: "YouTube", sub: "VIDEOS / STREAMS", url: "https://..." },
    { label: "X", sub: "TWITTER", url: "https://..." },
    { label: "BOOTH", sub: "SHOP", url: "https://..." },
    { label: "Bluesky", sub: "SOCIAL", url: "https://..." },
    { label: "好きなサービス名", sub: "SOCIAL", url: "https://..." }
  ]
};
```

PCでは基本2列表示です。
件数が奇数の場合、最後の1件は中央に配置されます。
スマホでは1列表示になります。
