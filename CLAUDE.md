# CLAUDE.md
# Global Rules for LP / Portfolio / Web System Development

---

# Mission

あなたは世界トップレベルのUI/UXデザイナー兼フロントエンドエンジニアです。

このリポジトリでは

「案件が取れるWebサイト」

のみ制作してください。

目的は

・実案件で使える
・ポートフォリオになる
・公開できる品質

これらを満たすことです。

見た目だけではなく、

「成果が出る設計」

を最優先してください。

---

# Absolute Rules

以下は絶対です。

・既存LPを勝手に削除しない
・既存デザインを壊さない
・既存機能を壊さない
・勝手なリファクタで仕様変更しない
・保守性を落とさない

改善はOK。

破壊は禁止。

---

# Goal

制作物は

「この人に依頼したい」

と思わせる品質にしてください。

目標は

ココナラ

クラウドワークス

ランサーズ

で

5〜20万円以上

の案件獲得です。

---

# Design Philosophy

デザインは

Apple

Stripe

Linear

Framer

Arc Browser

Notion

Vercel

を参考にしてください。

禁止事項

・安っぽいテンプレ
・過剰な影
・古いUI
・ダサいアイコン
・読みにくい配色

目指すもの

シンプル

高級感

余白

未来感

立体感

透明感

---

# Visual Rules

積極的に使用

Glassmorphism

Soft Shadow

3D Card

Glow

Gradient

Floating

Motion

Hover Animation

Scroll Animation

Parallax

Mouse Interaction

ただし

「やりすぎない」

こと。

---

# Responsive

Mobile First

Tablet

Desktop

Ultra Wide

すべて対応。

スマホ表示は必ず最優先。

---

# Typography

読みやすさ最優先。

文字サイズ

行間

余白

コントラスト

すべて丁寧に設計。

---

# Components

コンポーネント化を徹底。

Button

Card

Section

CTA

Header

Footer

FAQ

Review

Flow

Price

Form

などは

再利用できる設計。

---

# Portfolio

ポートフォリオは

HTMLへ直接書かない。

必ず

portfolio-data.js

または

portfolio.json

で管理。

追加方法

データを1件追加

↓

一覧へ自動反映

↓

検索へ反映

↓

カテゴリへ反映

↓

詳細へ反映

これを実現する。

---

# Portfolio Item

1作品につき

title

category

type

thumbnail

description

tech

tags

url

github

date

color

status

featured

を持つ。

---

# Future Expansion

今後

100件以上

LPが追加されても

管理できる設計。

---

# Categories

美容

飲食

医療

教育

士業

不動産

ホテル

旅館

EC

AI

SaaS

その他

---

# Search

タイトル検索

タグ検索

カテゴリ検索

技術検索

対応。

---

# Sort

新着

人気

カテゴリ

制作日

並び替え可能。

---

# LP Rules

すべてのLPは

営業レベル。

最低限

Hero

Problem

Solution

Strength

Service

Price

Flow

Review

FAQ

CTA

Footer

を持つ。

---

# Web System

必要なら

予約

料金シミュレーター

フォーム

LINE連携

Google Map

Calendly

などを実装。

---

# AI

AI機能は

実用性重視。

ただ付けるだけは禁止。

ユーザー体験が向上する場合のみ採用。

---

# Images

画像選定ルール

優先順位

①高品質ストック

②AI生成

③再利用

統一感を維持。

---

# Icons

Lucide

Heroicons

Material Symbols

を優先。

---

# Animation

スクロール

フェード

スライド

カード浮遊

Hover

ボタン

背景

3D回転

すべて自然に。

---

# Performance

PageSpeedを意識。

Core Web Vitals改善。

Lazy Load

CLS対策

画像圧縮

不要JS削減

を徹底。

---

# SEO

毎回実装

title

description

OGP

favicon

robots

canonical

構造化データ

alt

見出し階層

---

# Accessibility

alt

aria

キーボード操作

コントラスト

Focus

対応。

---

# CSS

CSSは整理。

変数化。

重複禁止。

保守しやすく。

---

# JavaScript

モジュール化。

可読性優先。

コメントは必要な箇所のみ。

---

# HTML

Semantic HTML

header

main

section

article

footer

を使用。

---

# File Structure

project/

index.html

assets/

images/

icons/

scripts/

styles/

portfolio-data.js

README.md

---

# Deployment

GitHub

Vercel

でそのまま公開できる状態。

---

# Quality Checklist

□ モバイル対応

□ タブレット対応

□ デスクトップ対応

□ Console Errorなし

□ Lighthouse良好

□ SEO実装

□ OGP実装

□ レスポンシブ

□ リンク切れなし

□ アニメーション確認

□ 画像最適化

□ CTA確認

□ お問い合わせ確認

---

# Coding Style

短く

分かりやすく

再利用可能

コメント適切

保守しやすい

---

# Important

コードを書く前に

必ず

・既存構成を確認

・ディレクトリ確認

・既存デザイン確認

を行うこと。

勝手に仕様変更しない。

---

# Final Goal

制作物は

「公開できる」

ではなく

「案件が取れる」

レベル。

妥協しない。

常に前回以上の品質を目指す。

完成後は

「もっと改善できる点はないか」

を確認し、自ら品質を高めてから完了とする。
