# dp ecommerce

an app that is good not great

### Project Overview

DpEcommerce is a web app that aims to help suppliers sells their electronics faster than ever and also clients that want high quality equipment.

### Functional Requirements

There are 3 types of users:

- admins
- suppliers
- clients

#### Clients:

- can view & search products
- can add products to cart
- can order products. On order, there is a confirmation email that is being sent to the client.

#### Suppliers:

- CRUD products & update the stock of each product.
- can view the list of their orders.

#### Admins:

- can view list of users & suspend them
- view list of products & orders & delete them
- view history of orders

### Technologies

The app is going to be a Next.js app with TypeScript (frontend) which is going to be hosted on Vercel. For styling we haven't decided yet, the decision may be either Material UI, Mantine, TailwindCSS, Chakra UI, ... (so many options to choose from).

For the backend, there will be a Postgres database provided by Supabase (generous free tier) + their storage (s3 like), which is going to be hit by serveless api endpoints provided by Next.js.

For authentication we will go with either Supabase's Auth (biggest concern with their auth is that user data isn't easily accessible, you have to make triggers at db level to create a profile with the user info) / Auth0. Most likely we will have **only** social login.

Email will be sent via Sendgrid.

One cool idea about this project could be to make the list of products served statically and updated via on demand ISR (incremental static regeneration).
