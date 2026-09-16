# BTC Pure Virgin Palm Oil 🌴

> **Official Web Portal, Product Showcase & Wholesale Order System**  
> *100% Unadulterated, First Cold-Pressed Red Palm Oil Direct from Delta State, Nigeria.*  
> **Official Website:** [https://btcpureoil.com](https://btcpureoil.com) | **Official Email:** [btcpureoil@gmail.com](mailto:btcpureoil@gmail.com)

---

## 📖 Overview

**BTC Pure Palm Oil** is a premium, unrefined, zero-additive red palm oil brand crafted for households, culinary artisans, and commercial food businesses. Sourced exclusively from ethically farmed *Elaeis guineensis* palm groves across smallholder family farms in the Niger Delta basin, BTC Oils guarantees pure culinary-grade oil free from artificial coloring (Sudan dyes), chemical bleaches, or palm sludge blending.

This repository contains the complete production website, interactive quotation calculator, and multi-channel order dispatch system.

---

## ✨ Key Features

- **Interactive Wholesale & Logistics Calculator**:
  - Real-time calculations with both Nigerian Naira (₦) and US Dollar ($) equivalents.
  - Pre-configured pricing for all sizes: 5L (₦30,000 / ~$20), 10L (₦40,000 / ~$27), 20L (₦57,000 / ~$38), 25L (₦65,000 / ~$43), and 30L (₦75,000 / ~$50).
  - Integrated haulage estimate engine for 8 key hubs (Lagos, Abuja, Port Harcourt, Onitsha, Kano, Ibadan, Benin City, Aba).
- **1-Click Multi-Channel Order Dispatch**:
  - **Instant WhatsApp Link**: Auto-populates itemized product name, quantity, volume, location, and estimated price directly into chat.
  - **Smooth Native Email Composer**: Custom cross-platform dispatcher (`launchEmailComposer`) that invokes Android/iOS native Gmail/Mail app intents instantly with zero blank tabs or popup friction.
- **Culinary Soul Interactive Showcase**:
  - Instant in-place recipe browser displaying authentic Nigerian dishes: *Delta Banga Soup (Ofe Akwu)*, *Village Native Jollof (Iwuk Edesi)*, *Traditional Egusi & Bitterleaf Soup*, and *Smoky Yam Porridge (Asaro) & Akara*.
- **Purity & Adulteration Contrast Tool**:
  - Visual side-by-side comparison illustrating the difference between fresh cold-pressed virgin red oil and market adulterated oil.
- **Enterprise SEO & Meta Optimization**:
  - Fully structured JSON-LD (Schema.org `Organization` and `Product` schemas), OpenGraph, Twitter Cards, and canonical tags.
  - Valid `sitemap.xml` and `robots.txt` included.
- **Zero-Dependency High Performance**:
  - Built with clean vanilla JavaScript, modular CSS architecture, responsive design, and optimized imagery.

---

## 📁 Project Structure

```
BTC/
├── index.html                   # Main production single-page application
├── serve.js                     # Zero-dependency local development server (Node.js)
├── start_preview.bat            # One-click Windows development preview launcher
├── sitemap.xml                  # XML sitemap for search engine indexing
├── robots.txt                   # Crawler directives
├── assets/
│   ├── css/
│   │   ├── variables.css        # Color palette, spacing, typography tokens
│   │   ├── style.css            # Base layouts & typography
│   │   ├── components.css       # Cards, calculator, hero, badges, modals
│   │   └── responsive.css       # Mobile & tablet viewports
│   ├── js/
│   │   ├── config.js            # Official business constants, pricing & contact info
│   │   ├── main.js              # Navigation, mobile drawer, toast & email dispatcher
│   │   ├── calculator.js        # Wholesale pricing engine & logistics estimator
│   │   ├── story.js             # Visual contrast tool & culinary showcase controls
│   │   └── contact.js           # Form validation & dispatch handler
│   └── images/
│       ├── brand/               # Official logos, badges, fruit photography
│       ├── craft/               # Extraction & purity photography
│       ├── dishes/              # High-definition Nigerian recipe dish photography
│       └── hero/                # Sunrise plantation landscape
└── .gitignore                   # Git ignore configuration
```

---

## 🚀 Running Locally

### Option 1: Direct in Browser
Double-click `index.html` in your file explorer to open it directly in any browser.

### Option 2: Using the Included Node.js Server
Ensure [Node.js](https://nodejs.org/) is installed, then run:
```bash
node serve.js
```
Or double-click `start_preview.bat`.

The server will be available at:
- **Local PC**: `http://localhost:3000`
- **Mobile Devices (Same Wi-Fi)**: `http://<your-local-ip>:3000`

---

## 📞 Official Contacts

- **Brand**: BTC Pure Virgin Palm Oil
- **Domain**: [https://btcpureoil.com](https://btcpureoil.com)
- **Email**: [btcpureoil@gmail.com](mailto:btcpureoil@gmail.com)
- **WhatsApp / Phone**: +234 814 538 6475
- **Origin**: Delta State & Niger Delta Palm Belt, Nigeria
