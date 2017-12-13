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
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="shortcut icon" href="img/favicon.ico"> -->
  <!-- <link rel="apple-touch-icon" href="img/apple-touch-icon.png"> -->
  <link rel="stylesheet" href="<?= $assets ?>/css/bundle.css">
  <!-- context meta vvv -->
  <title>KIKIMETAL</title>
  <meta name="description" content={route.description} />
  <link rel="canonical" href={route.canonical} />
  <!-- context meta ^^^ -->
</head>
<body>

  <div id="app"></div>
  <script>
    window.__ROUTES__ = <?= $routes ?>;
  </script>
  <script src="<?= $assets ?>/vender/fontawesome-all.min.js" charset="utf-8"></script>
  <script src="<?= $assets ?>/js/bundle.js" charset="utf-8"></script>

</body>
</html>
