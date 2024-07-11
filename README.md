# Food Ordering App

This is a simple food ordering app built with React. The app allows users to browse available foods, add items to a cart, and proceed to checkout.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Context Providers](#context-providers)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/food-ordering-app.git
   cd food-ordering-app
   
2. Install dependencies:

    npm install

3. Start the development server:

    npm start
   
Usage
Once the development server is running, you can open the app in your browser at http://localhost:3000. The app will display a list of available foods, a cart to which you can add items, and a checkout modal.

Components
AvailableFoods
This component displays the list of foods available for ordering.

Cart
This component displays the items added to the cart and allows users to manage their cart items.

CheckoutModal
This component handles the checkout process.

Header
This component displays the header of the app, including the app title and navigation links.

Context Providers
CartContextProvider
This provider manages the state of the cart and provides context to components that need access to cart-related data.

UserProgressContextProvider
This provider manages the state of the user's progress and provides context to components that need access to user progress data.
