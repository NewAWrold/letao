<?php

header("content-type:image/png");

//先获取原图的宽高等属性
$arr = getimagesize("Tulips.jpg");
// echo "<pre>";
// var_dump($arr);
$width = $arr[0];
$height = $arr[1];
//我们现在设置原图片画布
$src_image = imagecreatefromjpeg("Tulips.jpg");

//我们设置一个空画布
$dst_image = imagecreatetruecolor($width/2, $height/2);

//设置缩略图
imagecopyresized($dst_image, $src_image, 0,0,0,0, $width/2, $height/2, $width, $height);
// 保存
 imagepng($dst_image);

 // 销毁
 imagedestroy($src_image);
 imagedestroy($dst_image);