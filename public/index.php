<?php
require_once "./assets/util.php";

// router
$json = file_get_contents("./assets/routes.json");
$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
$routes = json_decode($json, true); // 配列へ

// アクセスされたURLを取得
$requestURL = $_SERVER["REQUEST_URI"];
// "/" === root 以外へのアクセスは、末尾の "/" は除去
if ($requestURL !== "/") {
  $requestURL = rtrim($requestURL, "/");
}

// ルーティング。存在しなかったら 404 ステータスを返す
if (isset($routes[$requestURL])) {
  $route = $routes[$requestURL]["title"];
  http_response_code(200);
} else {
  $route = null;
  http_response_code(404);
}

// static なファイルの読み込みに使うURL
$assets = get_assets_path();
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>KIKIMETAL</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="shortcut icon" href="img/favicon.ico"> -->
  <!-- <link rel="apple-touch-icon" href="img/apple-touch-icon.png"> -->
  <link rel="stylesheet" href="<?= $assets ?>/css/bundle.css">
</head>
<body>
  <div id="server-side">
    <style media="screen">
      #server-side{
        padding: 10px 0;
        background: rgb(35, 129, 205);
        color: white;
      }
    </style>
    <h1>SERVER SIDE</h1>
    <h1>req: <?php echo $requestURL ?></h1>
    <?php if ($route): ?>
      <!-- ルートに合ったメタデータを返す -->
      <h1 class="success">res: <?= $route ?></h1>
    <?php else: ?>
      <!-- 404 -->
      <h1 class="error">404 Not Found...</h1>
    <?php endif ?>
  </div>

  <div id="app"></div>
  <script src="<?= $assets ?>/vender/fontawesome-all.min.js" charset="utf-8"></script>
  <script src="<?= $assets ?>/js/bundle.js" charset="utf-8"></script>

</body>
</html>
