# cracked.io auth js edition

## usage

### cjs
```js
const cioAuth = require('cio-auth');

async function authenticate() {
    await cioAuth.login();
};
await authenticate();

//anything after the autenticate function will be ran if the user is authenticated
console.log("Hello, authenticated user!");
```

### es6/ts
```js
import cioAuth from "cio-auth";

await cioAuth.login();

//anything after the autenticate function will be ran if the user is authenticated
console.log("Hello, authenticated user!");
```

## notes
- contact me if this stops working or u have bugs or dont know how to use it
- i threw this together in 30 mins its probably not perfect