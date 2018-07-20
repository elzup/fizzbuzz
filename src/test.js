// @flow
const M = require('.').default

test('take', () => {
  const m = new M()
  expect(m.take(3)).toMatchSnapshot('to 3')
  expect(m.take(10)).toMatchSnapshot('to 10')
  expect(m.take(10, 5)).toMatchSnapshot('to 10 from 5')
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
