<?php
// router---------------------------------------------
// meta.json を読み込み
$json = file_get_contents("./routes.json");
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
// router---------------------------------------------

// static なファイルの読み込みに使うURL
$host = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"];
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>KIKIMETAL</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="shortcut icon" href="img/favicon.ico"> -->
  <!-- <link rel="apple-touch-icon" href="img/apple-touch-icon.png"> -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="<?= $host ?>/css/bundle.css">
  <style media="screen">
    #server-side{
      background: #333;
      color: white;
    }
  </style>
</head>
<body>
  <div id="server-side">
    <h1>SERVER SIDE</h1>
    <h1>req: <?php echo $requestURL ?></h1>
    <?php if ($route): ?>
      <h1 class="success">res: <?= $route ?></h1>
    <?php else: ?>
      <h1 class="error">404 Not Found...</h1>
    <?php endif ?>
  </div>

  <div id="app"></div>
  <script src="/js/bundle.js" charset="utf-8"></script>

</body>
</html>
