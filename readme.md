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
const fizzbuzz = require('@elzup/fizzbuzz')
const fb = fizzbuzz()
fb.take(5)
// [ 1, 2, 'Fizz', 4, 'Buzz' ]

fb.from(3)
  .to(10)
  .take()
// [ 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz' ]

const t = fb.it()
t.next().value
// 1
t.next().value
// 2

fb.rules([{ name: 'test', n: 3 }]).take(5)
// [ 1, 2, 'test', 4, 5 ]

fb.addRule({ name: 'hey', n: 2 }).take(6)
// [ 1, 'hey', 'Fizz', 'hey', 'Buzz', 'Fizzhey' ]
```

## Behavior

The library is built from small behaviors that can be composed without mutating
the original `FizzBuzz` instance.

### Default rules

- `3` maps to `Fizz`.
- `5` maps to `Buzz`.
- If multiple rules match, their names are joined in rule order.
- If no rule matches, the original number is returned.

### Ranges

- `take(to, from)` and `it(to, from)` use an inclusive range.
- If `from` is greater than `to`, the result is empty.
- `from()` and `to()` return a new `FizzBuzz` instance with updated defaults.

### Rules

- `rules(nextRules)` replaces the rule list.
- `addRule(rule)` appends a rule after existing rules.
- A divisor rule with `n: 0` does not match any value.
- A custom `check` rule matches when it returns `true`.

### Packing

`packFunc(number, hitRules)` owns the final return value. Without a custom
`packFunc`, the return value is `number | string`.

## API

### `fizzbuzz = (arg?: Arguments) => FizzBuzz`

```js
type Rule =
  | { n: number, name: string }
  | { check: (value: number) => boolean, name: string }

type FizzBuzz<T = number | string> = {
  from: (from: number) => FizzBuzz<T>,
  to: (to: number) => FizzBuzz<T>,
  rules: (rules: Rule[]) => FizzBuzz<T>,
  addRule: (rule: Rule) => FizzBuzz<T>,
  take: (to?: number, from?: number) => T[],
  at: (n: number) => T,
  it: (to?: number, from?: number) => Generator<T>,
}
```

## License

MIT © [elzup](https://elzup.com)
