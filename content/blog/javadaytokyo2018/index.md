---
layout: post
title: "Java Day Tokyo 2018"
date: 2018-05-18 06:42:37 +0900
categories: 
---

メールをプリントアウトして名刺と合わせて受付をするんだけど、メールに書いてある名前がメールアドレスのアカウントになっていて、名刺に載っている情報と全く一致せず、受付の人を困惑させてしまった。oracleアカウント、個人のやつだしね…。

メモと感想です(後でスライドが公開されるだろうけど)。

## key note
- リリースモデルについて、わかりやすいけどOpenJDKはLTS出ないのね
- jdk11が今年9月に出る(予定通り)
    - JEPsはこれからも追加される
- mission controll と flight recorder
    - Eclipse pluginで開けて便利
        - 下部のペインにスタックトレースからコードにジャンプできる
    - パフォーマンスの問題3例での見え方
        - LinkedListのループ内のget
        - シングルトンインスタンス(ロガーとか)
            - これどういうシチュエーションの問題だっけ
        - ループ内でオートボクシングが発生しててGC走りまくってる
            - 赤いアイコン出ないので問題なさそうに見えるので注意
                - どう気づけばいいんだ？
- リリース未定だったりする新しい機能
    - Valhalla
    - Portola
    - Panama
    - Amber
    - Loom
    - ZGC
- fn
    - サーバレス
    - cli
        - ボイラープレートを吐いたり
        - ローカルサーバ起動できたり
            - 個人的にこれがすごく良いと思う
        - アプリをデプロイできたり
    - javaで単一の処理で書けてしまうが、裏では複数のコンテナが実行されてるやつのデモ
        - flickrから車の写真を集めてきて最終的にslackにポストしまくる

## Java in a Wolrd of Containers
- 翻訳レシーバの付け方がわからなくて英語で聞いてみたけどやっぱり翻訳必要だな…
- jlink, jdeps
- musl libc
- portola
- AppCDSでコンテナ間のクラスデータのシェア
- Dockerの設定を考慮するJava起動オプションのサポート
- 適切なbase imageを使うとサイズの軽量化できる

## Project Valhalla
- Value Types
- Generics Specialization
- Var Handles

- 名前の由来
    - Value Typesと似てるっしょ
- シンタックス
    - 例えばこんなの
    - ```value class Hoge { } ```
- クラスのように書けてプリミティブのように振る舞う
    - ヘッダがない
        - オブジェクトのメタ情報
            - 何のインスタンスなのかとか
    - モニタがない
        - ロックの情報
    - キャッシュミスしない
        - これはどういう理屈だっけ…
    - "What Would Int Do"
- ジェネリクス
    - どう扱えるの？
    - `List<int> list = ...`
- IntStreamとかToIntFunctionとかなくせる
- クラスの継承ツリー
    ```
    -- any(仮)
     |- primitive(int/long/...)
     |- Object
          | - ...
    ```
    - このany(仮)をバイトコードでどう表現するのとか悩んでるらしい
- VarHandles
    - Unsafeで扱えたメモリ操作ができる
- 余談
    - メモリバリア
    - volatile
        - この辺理解できてない

## Curing you Domain Model Anemia...
- DDDに触れてからのコードスメル
    - フォーカスする話題の粒度が真逆というか振り幅がでかいというか
- Martin Fowlerの"When to make a type"
    - 疑問に思ったらクラスを作れ
- ライブコーディング！
    - githubやyoutubeにサンプルあるから探してくれ
    - dddするときのモデルに特定のフレームワークを使っても(よい|ダメ)派がある
        - 使ってもいい派
        - 今回はjpaのエンティティをモデルとして扱う
    - ex. 「primitiveなフィールド、マイナスにしたくない」
        - オブジェクトにしちゃう
            - イミュータブルにする
                - コンストラクタはprivateにして、static factoryを作る
                    - その中で引数の検査をする
                - getterで参照を返すときはコピーを返そう
            - hashcode/eqaulsの実装忘れずに
            - toStringはデバッグ情報を出すようにすべき
            - Formattable知ってる？
                - ビジネス要件での出力
                - 国際化するときも使える、詳しくはjavadoc
    - ComparisonChain使ってたけどよく知らない、何がうれしいか調べておく
    - enumコンストラクタはjava8での書き方があるらしい
        - 今回は時間の都合でjava7のやり方（おなじみやつ）
        - コードサンプル調べておく
    - JPAでのtips
        - イミュータブルなエンティティにするには
            - コンストラクタはprotected
        - フィールドにオブジェクトを持つ場合
            - それがバリューオブジェクトだったら@ElementCollection
            - エンティティだったらいつもの@OneToManyなど
            - 件数が数件程度ならバリューオブジェクト、100件とかになったらエンティティにしたほうがよい


## Get ready for a cloud native...
- k8s + istio でコンテナのメトリクスを簡単に取得できる話
- k8sで環境ごとのurlを用意しなくてよくなる
    - アプリ側で使うのは論理的なURL
- サイドカーコンテナ
    - mainコンテナとproxyコンテナのセット
- istio使うとgrafanaでモニタリングのダッシュボードが表示される
- eclipse micro profile
- server.xml
- リクエストに関する設定(ルール)
    - コネクションタイムアウト
    - レスポンスのディレイ設定
        - テストしやすくてよい！
- リクエストヘッダにtrace-idみたいなのがついている
    - これを追うとどのコンテナを通っていったか追跡できる
- サーキットブレーカーという単語が出てきたけど、それが何だっていうところ聞き逃した…
    - 言葉の意味は「一時的に止める措置」？

```
service meshes: key takeaways
- transparently add technical cross-cutting concerns.
- think "AOP for applications"
- routing, load-balancing, resiliency, telemetry, auth
- integrates well with Java enterprise approach:
    - business logic is responsibility of the applications
    - technical concerns are part of the envioronment
```

### 全体的に
- Cloudというかコンテナ周りというかにフォーカスされているのを確認した。
- 面白かったのは新しい機能だったり普段の暮らしに近いコーディング周りだったり。
    - DDDは座学な印象あるけど実地で見せてもらうと楽しい。

