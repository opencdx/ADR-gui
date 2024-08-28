# ADR UI

<p>
  <img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
  <img alt="redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white" />
  <img alt="NextJs" src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" />
  <img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="MaterialUI" src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white" />
  <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
  <img alt="Cypress" src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
  <img alt="StoryBook" src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

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
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

# 508 Compliance (Accessibility):
# Semantic HTML: 
The project strictly adheres to semantic HTML structure (headings, lists, etc.), making it easier for screen readers and assistive technologies to interpret content.
Keyboard Navigation: All interactive elements can be accessed and used with a keyboard alone, ensuring that users who cannot use a mouse can still navigate the application.
- Color Contrast: Color choices for text and background meet or exceed minimum contrast ratios for readability, accommodating users with visual impairments.
- Alternative Text: All images have descriptive alternative text (alt text) to convey their meaning to users who cannot see them.
- ARIA Attributes: Where appropriate, ARIA (Accessible Rich Internet Applications) attributes are used to provide additional context for assistive technologies.
- Focus Management: The focus is programmatically managed to ensure a smooth and predictable navigation experience for keyboard-only users.

# Additional Features:

- Internationalization (i18n): Support for multiple languages to reach a broader audience.
- Responsive Design: Ensures the application looks and functions well on various screen sizes (desktops, tablets, mobile devices).
- Unit/Integration Testing: Tests that validate the functionality of individual components and their interactions.


# Getting Started

To get started, follow these steps:


## Prerequisits

Before cloning/forking this project, make sure you have the following tools installed:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

## Installation
1. Clone this repository and the ui library to your local machine:

   ```bash
   git clone https://github.com/opencdx/ADR-gui.git
   git clone https://github.com/opencdx/ui-library.git

2. Install the project dependencies using npm in both ui-library and ADR-gui:
   
   ```bash
   npm install


3. Start the app

   ```bash
    npm start

4.  Open your web browser and visit http://localhost:3000 (or the URL in the cosole) to access the application

5. To use development host use

   ```bash
    npm run startDev


## Cypress

1. Start the Cypress

   ```bash
    npm run cy

2.  Open your web browser to access the application



# Bundle Analyzer
Helps you manage the size of your JavaScript modules. It generates a visual report of the size of each module and their dependencies. You can use the information to remove large dependencies, split your code, or only load some parts when needed, reducing the amount of data transferred to the client.

1. To run 

   ```bash
    npm run build



