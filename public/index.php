<?php
// routing
$routes = file_get_contents("./assets/routes.json");
$routes = mb_convert_encoding($routes, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
$routesArray = json_decode($routes, true); // 配列へ
// アクセスされたURLを取得
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
  <meta charset="utf-8">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="shortcut icon" href="<?= $assets ?>/img/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $assets ?>/img/apple-touch-icon-180x180.png">
  <link rel="stylesheet" href="<?= $assets ?>/css/bundle.css">
  <!-- apple-web-app -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <!-- react-helmet context meta -->
  <title><? $route["title"] ?></title>
  <meta name="description" content="<?= $route["description"] ?>" data-react-helmet="true" />
  <link rel="canonical" href="<?= $route["canonical"] ?>" data-react-helmet="true" />
</head>
<body>

  <script>
    window.__ROUTES__ = <?= $routes ?>;
  </script>
  <div id="app"></div>
  <script src="<?= $assets ?>/vender/fontawesome-all.min.js" charset="utf-8"></script>
  <script src="<?= $assets ?>/js/bundle.js" charset="utf-8"></script>

</body>
</html>