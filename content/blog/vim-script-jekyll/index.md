---
layout: post
title: "Jekyllのpostをvim scriptで作る"
date: 2018-01-01 12:17:25 +0900
categories: vim
---

### 問題
Jekyllでpost用のファイルを作るのがめんどくさい。
- ファイル名が `yyyy-mm-dd-{title}.md`
    - 数字やハイフンなんて打ちにくいところにあるのに…
- お決まりのテンプレートを書かなくちゃいけない
    - dateが特にめんどい
    - こんなの
```
---
layout: post
title: "記事のタイトル"
date: 2018-01-01 00:00:00 +0900
categories: vim
---
```

### 解決方法
vim pluginを探すと3つほどぱっと見つかるんだけど、欲しいものは簡単なものだし、自分でvim scriptを書いてみようと思った。

### 欲しいもの
- コマンドを実行するとバッファが開かれ、そこにテンプレートが展開される
- コマンドは複数の引数を受け取ってハイフンでつなぎ、それが `yyyy-mm-dd-{title}.md` の `title` になる
- 吐き出す場所はひとまずカレントディレクトリでいいや


### 参考にしたもの
- [Vimスクリプト基礎文法最速マスター - 永遠に未完成](http://thinca.hatenablog.com/entry/20100201/1265009821)
    - 数年前にもvim script書こうと思い立ったことがあって、ヘルプよりこっちを見てしまう
- [vim-jp » Vim script事始め](http://vim-jp.org/tips/start_vimscript.html)
    - `:h write-plugin` が丁寧でvimはドキュメントしっかりしてるな～と思った
    - `q-args` というのを初めて知った。 `args` だとコマンドの引数を文字列として扱ってくれないので不便だなあと悩んでいた。
    - プラグインの2重ロードを防ぐイディオム、開発のとき邪魔だからコメントアウトしてたんだけど、うっかりコミットしそう
        - 何回でもロードしていいように書くのが正解なのかな
- [Vimスクリプトを書いてみよう — KaoriYa](https://www.kaoriya.net/blog/2012/02/19/)
    - わかりやすい
- 自分のvimrc
    - 普段のメモを取るように、日付をファイル名にしたバッファを開くコマンドを作っていたのだった
    - それもどこからかコピーして持ってきたやつだったはず…


### できたもの
長いので折りたたみたい…

`gist:fourside/d09cbf3a755e292e977e31e592a7ee09`

### はまったところ
- 可変長引数をjoinすると、デリミタが無視されてスペースで連結されてしまう
    - 仕方なく、joinしてsplitしてjoinした…
- strftime('%z')から `+0900` みたいなタイムゾーンのオフセットを得たいのだけど、Windowsだと `東京（標準時）` が返ってきてしまう。
    - [strftime("%z") not working correctly · Issue #860 · vim/vim](https://github.com/vim/vim/issues/860)
    - 仕方ないっぽいので、Windowsでは `+0900` 固定にした。自分用だし。


