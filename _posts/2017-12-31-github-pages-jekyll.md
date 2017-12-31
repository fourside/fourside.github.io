---
layout: post
title:  "blog 環境"
date:   2017-12-31 11:43:00 +0900
categories: infra
---

今までメモはローカルに溜めていて、マシンの買い替えなんかが起きるとめんどくさくて、そのせいでDropboxが必須になってしまっていたり、自宅でやったことを職場で確認したいだとかは基本的に困難なので、ブログとして公開することにした。

### 構成要素と理由

- [GitHub Pages][GitHub Pages]
- [jekyll][jekyll]
- on WSL

はてなやMediumでもよいんだろうけどソーシャルな機能はいらないし、tech系の話だったらgithubアカウント上でやったほうがいいかな程度の理由。テキストが手元に残るのもよい。

あと最近、自宅のマシンをWindows10にしたことも大きい。WSLだったらWindows上でrubyの開発環境を整えることに苦労しなくなると思った。cmd.exeからbashと打つだけでlinuxの世界になるのはすごい楽。ただrubyのビルドにえらい時間がかかったので途中で諦め、パッケージマネージャからインストールすることにした。バージョンはちょい古めだけど、nokogiriがすんなり入るのはうれしい。

### 手順
```
$ sudo apt-get install ruby ruby-dev zlib1g-dev
$ ruby -v
ruby 2.3.1p112 (2016-04-26) [x86_64-linux-gnu]
$ gem install jekyll jekyll-feed minima
$ jekyll -v
jekyll 3.6.2
$ jekyll new fourside.github.io
```

zlibの1gってなんだろうね。

### はまりどころ(未解決)
WSL(Ubuntu)でrootだと日本語が表示できない。標準ユーザだとできる。envコマンドの差分を見たけど影響しそうなところがないように見える。どこに差があるのか分からない。ターミナルに弱い。

### めんどくさいところ
postするときにいっぱつでテンプレートを開きたい。ファイル名`yyyy-mm-dd-{title}.md`なんて手で打ちたくないし、ファイルの中身に作成日時まで入れなくちゃいけない。jekyllのコマンドにあってよさそうだけど、ぱっと見ない。

vim pluginを探すか、これくらいなら自分で作ってみようかなという気持ちになっている。


[GitHub Pages]: https://pages.github.com/
[jekyll]: https://jekyllrb-ja.github.io/
