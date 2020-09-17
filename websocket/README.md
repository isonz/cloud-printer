# Nest
```
npm i --save @nestjs/websockets @nestjs/platform-socket.io
npm i --save-dev @types/socket.io


https://www.npmjs.com/package/moment


npm install --save @nestjs/passport passport passport-jwt passport-http-bearer
npm install --save @nestjs/typeorm typeorm mysql
npm i typeorm-model-generator@no-engines
npm i log4js
npm i moment
npm i stacktrace-js
npm i chalk
npm i class-validator
npm i class-transformer
npm i @alicloud/pop-core



npm i -g @nestjs/cli
nest new my-nest

npm run start:debug


nest g module cats
nest g controller cats
nest g service cats 


http://localhost:3000/


npm i --save-dev @nestjs/testing



npm install --save js-sha256
npm install --save @hapi/joi
npm install --save class-validator class-transformer
npm install --save chalk


```

```
npm i typeorm-model-generator@no-engines
# npm i -g typeorm-model-generator
"db": "npx typeorm-model-generator -h localhost -d jiji_app -p 3306 -u root -x admin888 -e mysql -o libs/entities --noConfig true --ce pascal --cp camel",


"scripts": {
  "db": "rm -rf entities & npx typeorm-model-generator -h localhost -d testdabase -p 3306 -u root -x root -e mysql -o entities --noConfig true --ce pascal --cp camel"
}

rm -rf entities表示先删除文件夹entities
npx typeorm-model-generator如果全局安装了就不需要加npx没有全局安装就加上去
-h localhost -d 数据库名字 -p 端口 -u 用户名 -x 密码 -e 数据库类型
-o entities表示输出到指定的文件夹
--noConfig true表示不生成ormconfig.json和tsconfig.json文件
--ce pascal表示将类名转换首字母是大写的驼峰命名
--cp camel表示将数据库中的字段比如create_at转换为createAt
-a 表示会继承一个BaseEntity的类,根据自己需求加


npm run db


```

```
nx g @nrwl/workspace:lib entities
nx g @nrwl/workspace:lib repositories
```


https://www.npmjs.com/package/typeorm-model-generator
https://blog.csdn.net/kuangshp128/article/details/98062662


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
