# ADR UI

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About

UI for crafting and running ADR queries.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React DnD](https://react-dnd.github.io/react-dnd/about)
- [Zustand](https://github.com/pmndrs/zustand)
- [Immer](https://immerjs.github.io/immer/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)

# Getting Started

## Prerequisits

Before cloning/forking this project, make sure you have the following tools installed:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)
- [OpenCDx UI Library](https://github.com/opencdx/ui-library)

   - Clone the UI Library in the same parent directory as ADR-gui (so parent directory contains both ADR-gui and ui-library)
      ```bash
      git clone git@github.com:opencdx/ui-library.git
   - Under ui-library install project dependencies
      ```bash
      npm install

## Installation

1. Install the project dependencies using npm in both ui-library and ADR-gui:
   
   ```bash
   npm install


2. Start the app

   ```bash
    npm start

4.  The URL for the application will be dispalyed in the console logs (e.g. http://localhost:3000)



