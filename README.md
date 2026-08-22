# mnst web_ver

このフォルダは、既存の Electron 版とは独立した静的 Web 版です。
サーバー実装は不要で、データはブラウザの LocalStorage に保存されます。

## できること

- クエスト登録
- クエスト編集/削除
- 倍率を選んだ個別経験値計算
- 目標経験値への完全一致検索（単一/2件/3件合算）

## デフォルトクエスト

- 指定されたノーマルクエスト一覧を初期表示で同梱
- デフォルトクエストは編集/削除不可
- 追加したクエストのみ LocalStorage に保存

## 保存仕様

- 保存先: LocalStorage
- キー: mnst.questcalc.web.quests.v1
- 注意: ブラウザや端末を変えるとデータは共有されません

## ローカル起動

1. このフォルダの index.html をブラウザで開く

## 無料公開の例

### GitHub Pages

1. GitHub にリポジトリを作成して web_ver 配下を push
2. Settings → Pages → Branch を main / /(root) か web_ver 配下に設定
3. 公開 URL が発行されたらアクセス

### Netlify Drop

1. https://app.netlify.com/drop を開く
2. web_ver フォルダをドラッグ&ドロップ
3. すぐに公開 URL が発行

### Cloudflare Pages

1. Pages で新規プロジェクトを作成
2. Git 連携または web_ver をアップロード
3. Build command は空、Output directory は web_ver

## 補足

- LocalStorage を消去すると登録データも消えます
- private モードでは保存制限がある場合があります
