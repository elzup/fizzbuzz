# fizzbuzz

[![Build Status](https://travis-ci.org/elzup/fizzbuzz.svg?branch=master)](https://travis-ci.org/elzup/fizzbuzz)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> elzup&#39;s rich fizz buzz

## Install

```
$ npm install @elzup/fizzbuzz
```

## Usage

```js
const FizzBuzz = require('fizzbuzz')
const fb = new FizzBuzz(30)
fb.take(5)

//=> Array [ "1", "2", "Fizz", "4", "Buzz" ]

fb.at(15)
//=> "FizzBuzz"
```

## API

### `fizzbuzz(input, [options])`

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## License

MIT © [elzup](http://elzup.com)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/2284908?v=4" width="100px;"/><br /><sub><b>elzup</b></sub>](https://elzup.com)<br />[💻](https://github.com/elzup/generator-nm/commits?author=elzup "Code") [📖](https://github.com/elzup/generator-nm/commits?author=elzup "Documentation") [⚠️](https://github.com/elzup/generator-nm/commits?author=elzup "Tests") [🚇](#infra-elzup "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
