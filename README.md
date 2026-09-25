<div align="center">

# 🧠 OrderMind

### From chat chaos to clean orders.

**OrderMind** turns unstructured seller conversations into structured, continuously updated orders —
with auto-generated bills and a dashboard for human oversight.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/lint-oxlint-000000?style=flat-square)](https://oxc.rs/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#-mission)

[**Overview**](#-overview) •
[**Features**](#-features) •
[**Quick Start**](#-quick-start) •
[**Scripts**](#-scripts) •
[**Pages**](#-pages) •
[**Project Map**](#-project-map)

<br/>

<img src="https://img.shields.io/badge/platform-WhatsApp%20%7C%20Instagram%20%7C%20Telegram-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="platforms"/>

</div>

---

## 🧩 Overview

<table>
<tr>

<td width="50%">

### ❌ The Problem
Sellers doing business in chat spend hours each day **reading messages**, holding order details in their heads, and **re-typing them into billing apps**.

Every customer correction restarts the whole loop.

> The work is being done by hand that software should be doing.

</td>
<td width="50%">

### ✅ The Solution
OrderMind sits on top of the channels sellers already use — **WhatsApp Business**, **Instagram Messaging**, and **Telegram Bot APIs** — and provides:

- 🌐 **NLU & entity extraction**
- 📦 **Persistent order state**
- ✏️ **Incremental modifications**
- 🧾 **Auto-billing**
- 💸 **UPI-ready payment links**
- 🙋 **Human-in-the-loop dashboard**

</td>

</tr>
</table>

---

## ✨ Features

| | Capability | Description |
|:-:|---|---|
| 🗣️ | **Hinglish understanding** | Built for Hindi-English code-mixed speech — parses informal chat as cleanly as formal English |
| ✏️ | **Incremental order editing** | "Change black to blue", "make it 3", "remove item 2" — coreference resolution maps each edit onto the right line |
| 📚 | **Catalog-grounded recommendations** | Suggestions only ever come from your real catalogue, with live price and stock |
| 🧾 | **Automated billing** | Line items, discounts and GST resolve into a clean invoice the moment the customer confirms |
| 🙋 | **Dashboard with oversight** | Every structured order lands in a seller dashboard where a human can edit, approve, or flag for review |
| 🔌 | **Official API integrations** | Connected through WhatsApp Business, Instagram Messaging and Telegram Bot APIs — reliable, ToS-compliant, and never scraping |

---

## 🛠️ Tech Stack

<div align="center">

| ⚛️ Framework | 🎨 Language | ⚡ Build | 🔍 Linting | 🎭 Styling |
|:---:|:---:|:---:|:---:|:---:|
| React 19 | TypeScript 6 | Vite 8 | oxlint | Utility-first CSS |

</div>

- **React Router DOM 7** — client-side routing
- **SWR-style refresh** — stale-while-revalidate data patterns
- **Tailwind-inspired utilities** — hand-rolled, zero config

---

## 🚀 Quick Start

### 📋 Prerequisites

| Tool | Version |
|---|---|
| ![Node](https://img.shields.io/badge/Node.js-20.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white) | or 22.12+ |
| ![npm](https://img.shields.io/badge/npm-10%2B-CB3837?style=flat-square&logo=npm&logoColor=white) | bundled with Node |

### 1️⃣ Clone the project

```bash
git clone https://github.com/abhinavbahadursingh/OrderMind.git
cd OrderMind
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

<br/>

> 💡 The dev server starts at **http://localhost:5173** — open it in your browser and you're in.

---

## 📜 Scripts

| Script | Description |
|---|---|
| `npm run dev` | 🟢 Starts Vite dev server at `http://localhost:5173` |
| `npm run build` | 📦 Builds for production (TypeScript + Vite) |
| `npm run lint` | 🔍 Runs oxlint |
| `npm run preview` | 👀 Serves the production build locally |

---

## 📄 Pages

| | Page | Path | Key Content |
|:-:|---|---|---|
| 🏠 | **Home** | `/` | Hero, pipeline overview, core capabilities, trust badges |
| ⚙️ | **How It Works** | `/how-it-works` | Six-stage pipeline animation with real chat threads |
| ✨ | **Features** | `/features` | Detailed capability cards |
| 🧭 | **About** | `/about` | The problem / insight / approach, target audience |
| 📊 | **Dashboard** | `/dashboard` | Order list with human oversight actions |
| 📬 | **Contact** | `/contact` | Get started / book intro call |

---

## 🗂️ Project Map

<details>
<summary><b>🧱 Components</b> — click to expand</summary>

<br/>

| Component | Purpose |
|---|---|
| `Navbar` | Top navigation with theme toggle (light/dark) + mobile sheet |
| `Footer` | Branded footer with product / company / resources columns and platform logos |
| `Pipeline` | Ordered list of processing stages (reveals on scroll) |
| `Reveal` | IntersectionObserver-based entrance animations (fade / rise) |
| `PipelineStep` | Individual stage in a pipeline overview |
| `Icon` | SVG icon component supporting multiple names |
| `CTABand` | Call-to-action band at section bottoms |
| `HeroVisual` | Animated incoming chat visualization |
| `OrderCard` | Compact order summary card |
| `StatePanel` | JSON-like order state display |
| `Invoice` | Formatted invoice display |
| `ChatThread` | Conversational message thread visualization |

</details>

<details>
<summary><b>🎨 CSS Architecture</b> — utility-first with custom classes</summary>

<br/>

| Group | Classes |
|---|---|
| **Layout** | `section`, `section--tight`, `container`, `grid`, `grid--3` |
| **Buttons** | `btn`, `btn--primary`, `btn--secondary`, `btn--lg`, `btn--sm` |
| **Surfaces** | `card`, `card--hover`, `pill`, `pill--accent`, `chip` |
| **Navigation** | `nav`, `nav__links`, `nav__inner` |
| **Footer** | `footer`, `footer__grid`, `footer__brand`, `footer__col`, `footer__bottom` |
| **Hero** | `hero`, `hero__grid`, `hero__copy`, `hero__visual` |
| **Pipeline** | `stage`, `stage__copy`, `stage__visual`, `stage__frame`, `stage__num`, `stage__body` |
| **Problem** | `problem`, `problem__grid`, `problem__statement`, `problem__note` |
| **Split layouts** | `split`, `split--wide-left`, `split--wide-right`, `prose` |
| **Extras** | `trust-row`, `trust-item`, `coref`, `coref__notes`, `upi-card`, `page-head`, `page-head__inner`, `stat`, `stat__value`, `stat__label` |

</details>

---

## 🔌 Integration

OrderMind connects through **official platform APIs only** — no scraping, ever.

<div align="center">

| WhatsApp Business API | Instagram Messaging API | Telegram Bot API |
|:---:|:---:|:---:|
| ✅ Official | ✅ Official | ✅ Official |

</div>

- 📡 All webhooks are documented and **ToS-compliant**
- 🙋 Every consequential action (billing, payment link generation) is gated by **human approval** in the dashboard

---

## 💛 Mission

> Give every small seller the back office that big brands take for granted — structured orders, honest invoices, and a clear record — available to a two-person shop selling in a WhatsApp group, not just to enterprises with ERP budgets.

---

<div align="center">

**Built with ⚡ Vite + ⚛️ React + 🔷 TypeScript**

[![GitHub](https://img.shields.io/badge/GitHub-OrderMind-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhinavbahadursingh/OrderMind)

</div>
