---
title: 'Markdown スタイルテスト'
description: 'Tailwind Typographyによるレンダリング結果を確認するための網羅的なテスト記事です。'
date: '2026-05-10'
tags: ['Test', 'Markdown', 'Design']
---

# 1. 見出し (h1)

本サイトのタイポグラフィとレンダリング結果を確認するためのテストページです。

## 2. 見出し (h2)

圧倒的なAIの進化に己の無力さを痛感する日々ですが、それでもエンジニアとしての意地だけは決して明け渡さずに、今日も指をくわえてAIに任せています。

### 3. 見出し (h3)

階層が深くなるにつれて、文字サイズが適切にスケールダウンするかを確認します。

#### 4. 見出し (h4)

見出しのフォントウェイトやマージンが正しく適用されているかの確認用です。

---

## テキストの装飾

これは通常の段落（パラグラフ）です。行間（leading）や字間（tracking）が読みやすく設定されているかを確認します。

テキストの一部を **太字（Bold）** にしたり、_斜体（Italic）_ にしたり、~~取り消し線（Strikethrough）~~ を引いたりすることができます。

インラインコードの例：`console.log("Hello, World!")` のように、文中にコードを埋め込むことができます。

リンクのテスト：[Tailwind CSS Typography Plugin](https://tailwindcss.com/docs/typography-plugin) へのリンクです。ホバー時の色変化も確認してください。

---

## リストの表示

### 箇条書き（Unordered List）

- 静的サイト生成 (SSG)
- Markdown ベースの記事管理
  - Nuxt Content v3 の活用
  - Zod による型安全なスキーマ定義
- Tailwind CSS によるスタイリング

### 番号付きリスト（Ordered List）

1. 要件定義と技術選定
2. 開発環境の構築
3. コンポーネントの実装
4. 最終確認とデプロイ

---

## 引用 (Blockquote)

> 魔法のように紡がれる不可視の知能に、私の凡庸な指先はとうに立ち尽くしている。
> それでも胸の奥の意地だけは決して売らないと誓いながら、今日もため息が出るほど賢い機械に、すべての思考を丸投げした。
>
> — Personal Site About Page

---

## コードブロック (Code Block)

以下は TypeScript のコードブロックの例です。シンタックスハイライトが適用されるか確認します。

```typescript
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()).optional(),
      })
    })
  }
})
```

---

## テーブル (Table)

| フレームワーク | 特徴                            | 採用理由                         |
| :------------- | :------------------------------ | :------------------------------- |
| Nuxt 3         | Vueベースの強力なフレームワーク | 開発体験の良さとSSGの容易さ      |
| Tailwind CSS   | ユーティリティファーストなCSS   | 柔軟なスタイリングと保守性       |
| Nuxt Content   | Markdown管理モジュール          | データベース不要で記事を管理可能 |

---

## 画像 (Image)

ローカルまたは外部の画像が適切にリサイズされ、表示されるかの確認です。

![サンプルの風景画像](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800&h=400)
_キャプション: 自然の風景（Unsplashより）_
