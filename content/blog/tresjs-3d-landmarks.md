---
title: 'TresJS 入門：3Dオブジェクトの描画と質感'
description: '本サイトの背景で回っている3Dランドマークの仕組みを、Mesh、Geometry、Materialの基礎から解説します。'
date: '2026-05-24'
tags: ['Nuxt', 'TresJS']
---

本サイトでは、BlogページやWorksページなど、ページごとに異なる3Dオブジェクト（ランドマーク）が背景でゆっくりと自転しています。

今回は、この **3Dオブジェクト** がどのような仕組みで動いているのか、解説していきます。

## この記事で学習できること

- TresJSにおける3D空間の作り方
- 3Dオブジェクトを構成する「3つの基本要素（Mesh, Geometry, Material）」の役割
- 骨組み（Geometry）の形や引数の変え方
- 材質（Material）による見た目や光の反応の違い

## 開発環境

この記事のコードは、以下の環境・バージョンで動作検証を行っています。

- **Nuxt**: 4.4.4
- **@tresjs/nuxt**: 5.6.0
- **Tailwind CSS**: 4.2.4

---

## 1. TresJSとは？

**TresJS** は、Webで3Dグラフィックスを扱うための標準ライブラリである「Three.js」を、Vue / Nuxt のエコシステム上で直感的に扱えるようにした非常に強力なライブラリです。

通常、Three.jsを素のJavaScriptで書くと、初期設定だけで何十行ものコードが必要になりますが、TresJSならVueのテンプレート記法を使って、HTMLを書くかのように3D空間を構築できます。

---

## 2. 3D描画の基本：Mesh、Geometry、Material

まずは、一番シンプルな「立方体」を1つだけ描画してみます。

```html
<template>
  <div class="h-screen w-screen">
    <TresCanvas clear-color="#000000">
      <TresPerspectiveCamera :position="[0, 0, 5]" />

      <TresMesh>
        <TresBoxGeometry />
        <TresMeshBasicMaterial />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
```

コード内で使用している2つの重要なベース要素についても軽く触れておきます。

- **`TresCanvas`**: 3Dを描画するための「空間（キャンバス）」そのものです。`clear-color` で背景色を指定できます。
- **`TresPerspectiveCamera`**: その空間を覗き込む「カメラ（視点）」です。`:position="[0, 0, 5]"` は、空間の中心（0, 0, 0）から手前（Z軸方向に5）に少し離れた場所から見つめている、という意味になります。

そして、3D空間に目に見える物体を表示させるには、必ず上記のように **`TresMesh`** という型の中に、**「Geometry（骨組み）」** と **「Material（皮膚・質感）」** の2つをセットで入れる必要があります。

- **Geometry（骨組み）**：物体の「形」を決定するデータ（頂点の集まり）。
- **Material（皮膚・質感）**：物体の「見た目」を決定するデータ（色や透明度、ワイヤーフレームにするか等）。

これらには最初から初期値が存在するため、属性を何も指定しなくても、自動的に「半径1の真っ白な立方体（面塗りつぶし）」として画面に実体化してくれます。

![box](/images/blog/tresjs-3d-landmarks/box.png)

---

## 3. 形を変えてみる：正二十面体（Icosahedron）

先ほど作成した立方体を、本サイトのBlogページで採用している「正二十面体」に形（Geometry）を変更してみましょう。
今回は初期値ではなく、サイズや網目を指定する引数（`args`）を追加します。

```html
<TresMesh>
  <TresIcosahedronGeometry :args="[1.5, 1]" />
  <TresMeshBasicMaterial />
</TresMesh>
```

- **`:args="[1.5, 1]"`**：第一引数はサイズ、第二引数は「面の細かさ」です。ここを `1` や `2` に増やすと面が細かく分割され、数字を大きくするほど球体に近づいていきます。

![icosahedron](/images/blog/tresjs-3d-landmarks/icosahedron.png)

---

## 4. 複数配置と「ホログラム感」の演出

次に、Worksページで使用している「ドーナツ型（Torus）」も同時に配置してみましょう。
ただ置くだけだと正二十面体と完全に重なってしまうため、それぞれの `TresMesh` に位置（`:position`）を設定して左右にずらします。

さらに、本サイトの「ホログラム感」を出すために、マテリアルに `wireframe`（線画表示）を追加します。

```html
<TresMesh :position="[-2, 0, 0]">
  <TresIcosahedronGeometry :args="[1, 1]" />
  <TresMeshBasicMaterial wireframe />
</TresMesh>

<TresMesh :position="[2, 0, 0]">
  <TresTorusGeometry :args="[0.8, 0.2, 8, 32]" />
  <TresMeshBasicMaterial wireframe />
</TresMesh>
```

- **`:position="[X, Y, Z]"`**：3D空間内の自由な場所にオブジェクトを配置します。
- **`wireframe`**：これを追記するだけで、面が透けて骨組みの「線」だけで描画されるようになります。

実際にワイヤーフレームの有無でどう見た目が変わるのか、見比べてみましょう。

### ワイヤーフレーム無し

![torus](/images/blog/tresjs-3d-landmarks/torus.png)

### ワイヤーフレーム有り

![wireframe](/images/blog/tresjs-3d-landmarks/wireframe.png)

---

## 5. もっと知りたい：GeometryとMaterialの種類

Three.js / TresJSには、標準でたくさんの形や材質が用意されています。
組み合わせ次第で様々な表現が可能です。

### 代表的な Geometry（形）

1. **`<TresSphereGeometry />`**：
   ツルツルした球体（地球儀など）
2. **`<TresConeGeometry />`**：
   円錐（カラーコーンのような形）
3. **`<TresCylinderGeometry />`**：
   円柱（缶ジュースのような形）

### 代表的な Material（質感）

1. **`TresMeshBasicMaterial`（今回使用）**：
   光の影響を一切無視します。ライトがなくても指定した色がそのまま100%発光するように見えるため、ホログラムやUI要素に最適です。
2. **`TresMeshPhongMaterial`**：
   光を計算し、プラスチックやガラスのような「ツヤ（ハイライト）」を表現できます。
3. **`TresMeshStandardMaterial`**：
   現代の3Dの主流。金属のリアルな光沢や、木材のざらざら感など、現実世界の物理法則に近いリアルな質感を表現できます。

---

## まとめ

TresJSを使った3D描画の第一歩として、以下の3つを学びました。

1. 3D空間は **`TresCanvas`** と **`TresPerspectiveCamera`** で用意する。
2. 目に見える物体は、**Geometry（形）** と **Material（質感）** を **Mesh** に入れて実体化させる。
3. オブジェクトは、**`:position`** を使用することで、3D空間の好きな位置にずらせる。

ここまでの知識だけでも、様々な形と質感を組み合わせて、自分だけの3D空間をデザインすることができるようになります。

「でも、たくさんのオブジェクトをセットで動かしたいときは、いちいち全部のpositionを書き直すの？」\
「静止しているこの物体を、滑らかに自転させるにはどうするの？」

といった疑問が湧いてくるかと思います。

次回は、複数の物体を透明な箱にまとめる **`TresGroup`** と、毎フレーム処理を実行して物体を回転させる **`useLoop`（自動アニメーション）** について解説します。

是非、ご覧ください。
