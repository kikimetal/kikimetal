<?php
// ルーティング情報を引き出す
$routes = file_get_contents("./assets/routes.json");
$routes = mb_convert_encoding($routes, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
$routesArray = json_decode($routes, true); // 配列へ
// アクセスされたPathを取得
$requestPath = $_SERVER["REQUEST_URI"];
if ($requestPath !== "/") {
  // "/" === root 以外へのアクセスは、末尾の "/" は除去
  $requestPath = rtrim($requestPath, "/");
}

// ルーティング。ステータスコードも返す。
$route = false;
if (isset($routesArray[$requestPath])) {
  $route = $routesArray[$requestPath];
  http_response_code(200);
} else {
  http_response_code(404);
}

// static なファイルの読み込みに使うURL
require_once "./assets/util.php";
$assets = get_assets_path();
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- TODO remove env production-->
  <script src="http://localhost:8097"></script>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="shortcut icon" href="<?= $assets ?>/img/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $assets ?>/img/apple-touch-icon-180x180.png">
  <!-- apple-web-app -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <!-- react-helmet context meta -->
  <title><?= $route["title"] ?></title>
  <meta name="description" content="<?= $route["description"] ?>" data-react-helmet="true" />
  <link rel="canonical" href="<?= $route["canonical"] ?>" data-react-helmet="true" />
</head>
<body>

  <div id="app"></div>
  <div id="loader">
    <div class="Bg"></div>
    <span class="loader-text">LOADING</span>
    <span class="loader-circle"></span>
  </div>

  <!-- stylesheet -->
  <!-- <link href="https://fonts.googleapis.com/css?family=Bungee+Hairline|Codystar:300,400|Fascinate|Fredericka+the+Great|Libre+Barcode+128+Text|Londrina+Outline" rel="stylesheet"> -->
  <link rel="stylesheet" href="<?= $assets ?>/css/bundle.css">

  <script>
    window.__ROUTES__ = <?= $routes ?>;
  </script>
  <script defer src="<?= $assets ?>/vender/fontawesome-all.min.js"></script>
  <script defer src="<?= $assets ?>/js/bundle.js"></script>

</body>
</html>
