---
layout: post
title:  "radiko 録音環境"
date:   2017-12-30 17:06:06 +0900
categories: infra
---

さくらVPSを借りてradikoの録音環境を用意していたんだけど、今年の4月くらいから録音ができなくなっていた。今更だけど確認してみると、`curl https://radiko.jp/area` がOSAKAになってたので、東京の放送局が聴取できない状態だった。radikoの仕様変更じゃなかったので一安心。

まずawsの東京リージョンでt2.microインスタンスを作った。OSはamazon linux。radikoのエリア判定はTOKYOだったのでこれでよし。鍵はawsが生成したもの、インバウンドはsshとhttpのみ、さらにマイIPアドレスから許可するように、screenとvimのrcファイルを用意した。

あとは必要なものをビルドするだけ。

### 必要なもの

- [rtmpdump][rtmpdump]
- [swftools][swftools]
- [ffmpeg][ffmpeg]

### 前準備
```bash
yum install git
yum groupinstall "Development Tools"
```

### rtmpdump
オフィシャルの通り、`git clone git://git.ffmpeg.org/rtmpdump` する。READMEを見るとconfigureしなくてよいみたい。`make SYS=posix && make install`した。

```
# rtmpdump -v
rtmpdump: error while loading shared libraries: librtmp.so.1: cannot open shared object file: No such file or directory
```

soが読めてないっぽい。ビルドしたsoは`/usr/local/lib`にインストールされてる。

```
# cat /etc/ld.so.conf
include ld.so.conf.d/.conf
# echo /usr/local/lib > /etc/ld.so.conf.d/rtmpdump.conf
# ldconfig
```
cf. https://blogs.yahoo.co.jp/mrsd_tangerine/40359620.html

### swftools
最新のtarballを落としてくる。configure, make, make installですんなりいけた。(さくらVPSで使ってたdebianでは苦労した印象あったけど曖昧）

### ffmpeg
すっかり忘れてたんだけど旧環境ではlameを使ってて、それをconfigure時に指定してやる必要がある。（指定しなくてもビルドはできるけど、ここでやりたいのはflvからmp3にエンコードすることなので）

[lame][lame]から落としてくる。configure, make, make installですんなりビルドできる。soは/usr/local/libに吐かれる。
このあとffmpegのビルド。
```
# configure --enable-libmp3lame --disable-x86asm
# make
# make install
```

### 以上
こんな感じでした。

[rtmpdump]: https://rtmpdump.mplayerhq.hu/
[swftools]: http://www.swftools.org/download.html
[ffmpeg]: https://www.ffmpeg.org/download.html
[lame]: http://lame.sourceforge.net/download.php

