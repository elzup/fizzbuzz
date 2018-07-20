// @flow
const M = require('.').default

test('snapshot', () => {
  const m = new M()
  expect(m.take(3)).toMatchSnapshot('to 3')
  expect(m.take(10)).toMatchSnapshot('to 10')

  const t = m.it()
  expect([
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
    t.next().value,
  ]).toMatchSnapshot('iterator')
})
