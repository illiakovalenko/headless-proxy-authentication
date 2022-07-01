## Contains reproduction of failed authentication using node-headless-ssr-proxy

* Don't need to install sitecore
* Run once [PullRequest](https://github.com/Sitecore/jss/pull/1087) is merged

### Prerequisites

1. cd ./react-app
1. npm i
1. npm run build
1. cd ../node-headless-ssr-proxy
1. npm i
1. Copy the build output from `/react-app/build` into `/node-headless-ssr-proxy/dist/react-app`
1. npm run start

### Additional information

* Extra route is added to render `/login` page: [AppRoot.js](https://github.com/illiakovalenko/headless-proxy-authentication/blob/master/react-app/src/AppRoot.js#L38)
* API Mocks are defined in `/node-headless-ssr-proxy/src/mocks`
* `Home`, `Styleguide` and `Login` pages ONLY are mocked
* Authentication error handling is added [here](https://github.com/illiakovalenko/headless-proxy-authentication/blob/master/node-headless-ssr-proxy/src/config.ts#L117-L122), `location` header handles the redirect

### Steps to reproduce

1. Open `http://localhost:3000/styleguide` page
1. The window should be redirected to the `/login` page

> **NOTE** If you will open `/` and after that you will try to open `/styleguide` using `Styleguide` link, the authentication error will not be handled as you have client side routing and 401 should be handled on the client side, but it's not related to the scope of current issue. If you open `http://localhost:3000/styleguide` directly, the server handles request