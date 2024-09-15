# Full Stack - Final Project

# Credits
## [Student](https://github.com/djohoe28/fs_ui_final_316294321)
Jonathan Eddie Amir

ID 316294321

## [School](https://www.telhai.tech/)
Tel Hai Engineering

Computer Engineering

2023-2024

## Powered By
[ViteJS](https://vitejs.dev/)

[ReactJS](https://react.dev/)

[MobX](https://mobx.js.org/README.html)

## API Credits
[PokeAPI](https://pokeapi.co/)

[Exchange Rate API](https://www.exchangerate-api.com)

[Logo by PokeShop](https://pokeshop.co.il/)

# Details
A simulated storefront for buying Pokémon online.

A user can select their preferred currency for display.

An "admin"-level user can control the Pokémon available for purchase by Generation (I-VIII).

# Main Components
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

## ErrorPage ([default](/src/components/ErrorPage.jsx))

## MyStore ([MobX Store](/src/modules/MyStore.jsx))
The MyStore module is a MobX store that manages the application's state,
including the available Pokémon, user preferences, and other relevant data.

It provides a centralized way to access and update the application's state.