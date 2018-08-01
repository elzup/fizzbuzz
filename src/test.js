// @flow
const fizzbuzz = require('.').default

test('take', () => {
  const fb = fizzbuzz()
  expect(fb.take()).toMatchSnapshot('to 30')
  expect(fb.take(3)).toMatchSnapshot('to 3')
  expect(fb.take(10, 5)).toMatchSnapshot('to 10 from 5')
})

test('at', () => {
  const fb = fizzbuzz()
  expect(fb.at(3)).toMatchSnapshot('3 fizz')
  expect(fb.at(5)).toMatchSnapshot('5 buzz')
  expect(fb.at(15)).toMatchSnapshot('15 fizzbuzz')
  expect(fb.at(7)).toMatchSnapshot('7')
})

// test('addRule', () => {
//   const m = fizzbuzz(10)
//   m.addRule({ name: 'hey', n: 2 })
//   expect(m.take(6)).toMatchSnapshot('with hey')
// })

test('custom func', () => {
  const fb = fizzbuzz({
    rules: [
      { name: 'KYOKO', n: 2 },
      { name: '_toshino_', check: v => v === 5 },
    ],
  })
  expect(fb.take(10)).toMatchSnapshot('to 3')
})

test('it', () => {
  const m = fizzbuzz()
  const t = m.it()
  expect([
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
  ]).toMatchSnapshot('works')
})
