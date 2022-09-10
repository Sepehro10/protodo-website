# protodo-website

## Information
ProTodo [Pro(ject)Todo] is a basic Todo List FullStack Web Application with Upgrade-ability

This was my First project using JS, NodeJS, ExpressJS, Vue, Nuxt, Vuetify, ...
and I Learned alot from this Project

### `Tech Stack`
#### BackEnd: Full REST CRUD API
- NodeJS, ExpressJS (Server and API)
- Yup (Input Validation)
- jsonwebtoken, PassportJS, PassportJWT (Authentication, Session)

- Prisma (Database ORM)
- PostgreSQL (Database)

#### Front End :
- VueJS, NuxtJS, Vuetify

### `Features`
1. Full Account Registration and Login (Authorization, Sessions, Password Hashing, ...)
2. Multiple Todo Lists per User (Creating, Editing, Deleting Multiple Lists)
3. List based Todos (each list has its own seperate List of Todos)
4. Todos with Name, Description, Status (is this Todo Done or not?)
5. Managing Todos (Creating, Editing, Deleting, Marking Done/UnDone Todos)

## To be Updated Later.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
