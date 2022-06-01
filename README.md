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

- can view list of users
- can update user role

### Technologies

The app is a [Next.js](https://nextjs.org/) web app with TypeScript, which is going to be hosted on Vercel. As styling solution, we've chosen [Mantine](https://mantine.dev), using both their Core library + Forms (similar to Formik) + Notification system.

As rendering strategy, most of the app will be client-side rendered (maybe the list of products will be a mixture of on-demand Incremental Static Regeneration + CSR). For fetching data we are using [SWR](https://swr.vercel.app/), which providers a layer of caching.

The endpoints are serverless functions (the ones that come in the Next.js ecosystem, AWS lambdas in prod).

As Auth solution, we've chosen [Next-Auth](https://next-auth.js.org/).

The database is a PostgreSQL instance (locally run via `docker-compose`).

For handling db queries we've chosen [Prisma](https://www.prisma.io/), a wonderful ORM, which handles the schema too. Making migrations is easier than ever.

Email will be sent via Nodemailer.

### Understanding the project structure

- `./components` -> reusable components / components that need their own logic.
- `./layout` -> layout of the app.
- `./pages` -> this is the place where both client pages are + the API endpoints (`./pages/api/**`). This is the _standard_ file system routing provided by Next.
- `./lib` -> utilities
- `./prisma` -> schema + migrations

### How to run

#### Prerequisites

**Node.js v16**

This project uses `yarn` as package manager, which means that you need to have it globally installed.

```
npm install -g yarn
```

You also need to have [Docker installed](https://www.docker.com/products/docker-desktop/) and also the [Postgres official image](https://hub.docker.com/_/postgres).

In addition to that, [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) also needs to be installed (to avoid env conflicts between Next and Prisma, since we'll be using `.env.local` for local development and that should be used by Prisma too).

```
yarn global add dotenv-cli
```

Last but not least, you need to have and `GOOGLE_ID` and `GOOGLE_SECRET` for authentication, [visit this](https://console.cloud.google.com), search for credentials, click on _Create Credentials_, and add an _OAuth Client ID_.

#### Running the project

Firstly, run:

```
cp .env.local.example .env.local
```

And fill all the information.

Run: `yarn run dx` (this should create your database + run all the migrations)

And then: `yarn run dev`

Voila, you should now be able to go to [your localhost](http://localhost:3000) and be able to login.

Be aware, you need to manually change the role of your user (in order to make it admin). Connect to the db via any db client you want.
