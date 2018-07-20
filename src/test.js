// @flow
const M = require('.').default

test('take', () => {
  const m = new M(30)
  expect(m.take()).toMatchSnapshot('to 30')
  expect(m.take(3)).toMatchSnapshot('to 3')
  expect(m.take(10, 5)).toMatchSnapshot('to 10 from 5')
})

test('custom func', () => {
  const m = new M(10, [
    { name: 'KYOKO', n: 2 },
    { name: '_toshino_', check: v => v === 5 },
  ])
  expect(m.take()).toMatchSnapshot('to 3')
})

test('it', () => {
  const m = new M()
  const t = m.it()
  expect([
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
  ]).toMatchSnapshot('works')
})
