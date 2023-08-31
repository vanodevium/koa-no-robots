# koa-no-robots

Koa middleware for different **robots.txt** content on different domains.
Use it to avoid search engine indexing of public dev/test/demo/staging servers etc.

### Install

```sh
npm install koa-no-robots
```

### Usage

A minimum of an array of domain names must be supplied.
Optional the robots.txt content for allowed and disallowed domains can be passed.

```js
noRobots(allowedDomains[, allowedText][, disallowedText]);
```

### Example:

```js
const app = require("koa")();
const noRobots = require("koa-no-robots");

app.use(noRobots(["domain1.com", "domain2.com"])); // for domain3.com robots.txt will be disallowed
```

### Defaults robots.txt content

**allowed** robots.txt:

```text
User-agent: *
Disallow:
```

**disallowed** robots.txt:

```text
User-agent: *
Disallow: /
```

### License

**koa-no-robots** is open-sourced software licensed under the [MIT license](./LICENSE.md).

[Vano Devium](https://github.com/vanodevium/)

---

Made with ❤️ in Ukraine
