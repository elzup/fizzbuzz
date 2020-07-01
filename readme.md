# fizzbuzz

![Node CI](https://github.com/elzup/fizzbuzz/workflows/Node%20CI/badge.svg)
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
type FizzBuzz = {
  from: (to: number) => FizzBuzz,
  to: (to: number) => FizzBuzz,
  rules: (rules: Rule[]) => FizzBuzz,
  addRule: (rule: Rule) => FizzBuzz,
  take: (to?: number, from?: number) => string[],
  at: (n: number) => string,
  it: MakeIterator,
}
```

## License

MIT © [elzup](https://elzup.com)

```

```
