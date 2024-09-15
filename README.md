# Full Stack - Final Project

https://github.com/djohoe28/fs_ui_final_316294321

## Credits
Student: [Jonathan Eddie Amir](https://github.com/djohoe28/fs_ui_final_316294321) (ID: 316294321)

School: [Tel Hai Engineering](https://www.telhai.tech/) - Computer Engineering (2023-2024)

## Framework
- [npm](https://www.npmjs.com/)
- [bun](https://bun.sh/) (NOTE: bun was used only during development - using npm instead should still work as intended.)
- [ViteJS](https://vitejs.dev/)
- [ReactJS](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [MobX](https://mobx.js.org/README.html)

## APIs
- [PokeAPI](https://pokeapi.co/)
- [Exchange Rate API](https://www.exchangerate-api.com)
- [Logo by PokeShop](https://pokeshop.co.il/)

# Details
A simulated storefront for buying Pokémon online.

A user can select their preferred currency for display.

An "admin"-level user can control the Pokémon available for purchase by Generation (I-VIII).

# Main Components
NOTE: The component details below were AI-generated with Codeium for Visual Studio Code,
because I forgot to document a lot of things, and there's only 2 hours left to submit.

The same note applies to *most* of the documentation within the .jsx files in this project;

Please check [this commit](https://github.com/djohoe28/fs_ui_final_316294321/commit/40bfe38cd6af0ec09d23390efe41dc4122eb4fa8) (September 15th, 2024) to see which parts were AI-generated.

## HomePage ([Outlet](/src/components/HomePage.jsx))
The HomePage component is the main landing page of the application,
providing an overview of the simulated storefront and its features.

## TitlePage ([/](/src/components/TitlePage.jsx))
The TitlePage component serves as the entry point of the application,
displaying the title and possibly other introductory content.

## LoginCard ([/login](/src/components/LoginCard.jsx))
The LoginCard component handles user authentication,
allowing users to log in to the application.

## InventoryPage ([/inventory](/src/components/InventoryPage.jsx))
The InventoryPage component displays the available Pokémon for purchase, organized by Generation (I-VIII).

It also includes a load progress indicator and an inventory table.

## CartPage ([/cart](/src/components/CartPage.jsx))
The CartPage component allows users to view and manage their shopping cart,
including adding, removing, and updating items.

## UserOptions ([/options](/src/components/CartPage.jsx))
The UserOptions component provides a dropdown menu for users to access their account settings.

The UserOptions component uses the UserContext to retrieve the user's authentication status.

It displays a dropdown menu with options to view account settings, logout, or access admin-level features (if applicable).

The component also includes a link to the CartPage component.

## ErrorPage ([default](/src/components/ErrorPage.jsx))
The ErrorPage component is displayed for any unrecognized routes.

## MyStore ([MobX Store](/src/modules/MyStore.jsx))
The MyStore module is a MobX store that manages the application's state,
including the available Pokémon, user preferences, and other relevant data.

It provides a centralized way to access and update the application's state.