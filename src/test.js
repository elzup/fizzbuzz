// @flow
const M = require('.').default

test('snapshot', () => {
  const m = new M()
  expect(m.take()).toMatchSnapshot()

  const t = m.it()
  expect(t.next().value).toMatchSnapshot()
  expect(t.next().value).toMatchSnapshot()
  expect(t.next().value).toMatchSnapshot()
})
