# Personal Site Architecture & Specification

## 1. Project Overview

This document outlines the architectural specifications and design decisions for the personal website, developed to showcase technical skills and acquire new projects. The core concept is to provide an immersive, seamless 3D web experience using modern web technologies.

## 2. Tech Stack

- **Framework:** Nuxt.js
- **Language:** TypeScript
- **Package Manager:** npm
- **3D Rendering:** TresJS (Vue wrapper for Three.js)
- **Styling:** Tailwind CSS (@nuxtjs/tailwindcss)
- **Content Management:** @nuxt/content
- **Database:** Better SQLite3 (Used as a local indexing engine for high-performance content querying during development and build time)
- **Assets/Typography:** @nuxt/fonts, @nuxt/icon
- **Code Quality:** ESLint (@nuxt/eslint), Prettier

## 3. UI/UX & 3D Design Specifications

- **Theme:** A clean, abstract 3D space with a white background and floating particles.
- **Navigation:** Camera-movement-based seamless transitions. The 3D camera moves dynamically to different coordinates when navigating between pages (Home, About, Works, Blog), fully synchronized with Nuxt's file-based routing mechanism.
- **Blog UI:** Text content is displayed on "frosted glass" (backdrop-filter: blur) floating in the 3D space. _(Performance Fallback: On mobile devices, if critical performance drops occur, the blur effect will be dynamically replaced with simple semi-transparency.)_
- **Contact Interaction:** A seamless modal triggered by clicking specific 3D particles via Raycaster, rather than a traditional page transition.
- **Responsive & Performance:** Fully responsive. On mobile devices, the number of 3D particles will be dynamically reduced to maintain optimal GPU performance.

## 4. Technical Implementation & Policies

### 4.1. Global 3D Scene Management

- **Persistent Canvas:** To achieve seamless camera transitions, the TresJS canvas is defined within the Nuxt Layout (`layouts/default.vue`). This ensures the 3D context remains active while page-specific DOM content is swapped via `<NuxtPage />`.
- **Routing & Camera:** Page transitions are handled by observing Nuxt route changes. A global camera controller updates the camera's coordinates and look-at vectors based on the current path.

### 4.2. Performance & Memory Management (Optimization)

- **Resource Disposal:** To prevent memory leaks, all Three.js resources (geometries, materials, textures) must be explicitly disposed of using `onUnmounted` hooks or TresJS's automatic disposal features when objects are removed from the scene.
- **Asset Optimization:** Use compressed textures (e.g., Basis Universal) and low-poly models where possible to minimize GPU memory usage.

### 4.3. Accessibility (a11y) & SEO

- **Semantic Overlay:** Every interactive 3D object (e.g., contact particles) must have a corresponding hidden semantic HTML element (e.g., `<button>` or `<a>`) positioned in the DOM or accessible via keyboard.
- **Aria Attributes:** Provide `aria-label` for 3D interactions to support screen readers.
- **Indexability:** Ensure all text content rendered on "frosted glass" UI exists as standard HTML within the Nuxt page structure to remain discoverable by search engine crawlers (SEO).
