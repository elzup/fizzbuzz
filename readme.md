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
const fizzbuzz = require('fizzbuzz')
const fb = fizzbuzz()
fb.take(5)
// [ '1', '2', 'Fizz', '4', 'Buzz' ]

fb.from(3)
  .to(10)
  .take()
// [ 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz' ]

const t = fb.it()
t.next().value
// '1'
t.next().value
// '2'

fb.rules([{ name: 'test', n: 3 }]).take(5)
// [ '1', '2', 'test', '4', '5' ]

fb.addRule({ name: 'hey', n: 2 }).take(6)
// [ '1', 'hey', 'Fizz', 'hey', 'Buzz', 'Fizzhey' ]
```

## API

### `fizzbuzz = (arg?: Arguments) => FizzBuzz`

```js
type FizzBuzz = {|
  from: (to: number) => FizzBuzz,
  to: (to: number) => FizzBuzz,
  rules: (rules: Rule[]) => FizzBuzz,
  addRule: (rule: Rule) => FizzBuzz,
  take: (to?: number, from?: number) => string[],
  at: (n: number) => string,
  it: MakeIterator,
|}
```

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

```

```
