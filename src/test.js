// @flow
const fizzbuzz = require('.').default

test('take', () => {
  const m = fizzbuzz(30)
  expect(m.take()).toMatchSnapshot('to 30')
  expect(m.take(3)).toMatchSnapshot('to 3')
  expect(m.take(10, 5)).toMatchSnapshot('to 10 from 5')
})

test('at', () => {
  const m = fizzbuzz()
  expect(m.at(3)).toMatchSnapshot('3 fizz')
  expect(m.at(5)).toMatchSnapshot('5 buzz')
  expect(m.at(15)).toMatchSnapshot('15 fizzbuzz')
  expect(m.at(7)).toMatchSnapshot('7')
})

test('custom func', () => {
  const m = fizzbuzz(10, [
    { name: 'KYOKO', n: 2 },
    { name: '_toshino_', check: v => v === 5 },
  ])
  expect(m.take()).toMatchSnapshot('to 3')
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
