<?php
// リクエストされた url と routes.json を照らし合わせる。
// 存在すれば meta 情報の詰まった array を、失敗で false を返す。
// http ステータスコードもここでセットする。
function router($routesJsonPath){

  $json = file_get_contents($routesJsonPath);
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $routes = json_decode($json, true); // 配列へ

  // アクセスされたURLを取得
  $requestPath = $_SERVER["REQUEST_URI"];
  // "/" === root 以外へのアクセスは、末尾の "/" は除去
  if ($requestPath !== "/") {
    $requestPath = rtrim($requestPath, "/");
  }

  // ルーティング。存在しなかったら 404 ステータスを返す
  $route = false;
  if (isset($routes[$requestPath])) {
    $route = $routes[$requestPath];
    http_response_code(200);
  } else {
    http_response_code(404);
  }

  return $route;
}
