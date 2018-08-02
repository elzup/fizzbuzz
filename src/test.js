// @flow
const fizzbuzz = require('.').default

test('take', () => {
  const fb = fizzbuzz()
  expect(fb.take()).toMatchSnapshot('to 30')
  expect(fb.take(3)).toMatchSnapshot('to 3')
  expect(fb.take(10, 5)).toMatchSnapshot('to 10 from 5')
})

test('chain', () => {
  const fb = fizzbuzz(10)
  expect(fb.to(8).take()).toMatchSnapshot('1~8')
  expect(fb.from(3).take()).toMatchSnapshot('3~10')
  expect(
    fb
      .from(3)
      .to(8)
      .take()
  ).toMatchSnapshot('3~8')
  expect(fb.rules([{ name: 'test', n: 3 }]).take(5)).toMatchSnapshot('rule')
})

test('at', () => {
  const fb = fizzbuzz()
  expect(fb.at(3)).toMatchSnapshot('3 fizz')
  expect(fb.at(5)).toMatchSnapshot('5 buzz')
  expect(fb.at(15)).toMatchSnapshot('15 fizzbuzz')
  expect(fb.at(7)).toMatchSnapshot('7')
})

test('argument', () => {
  expect(fizzbuzz().take(5)).toMatchSnapshot('empty')
  expect(fizzbuzz(5).take()).toMatchSnapshot('to')
  expect(fizzbuzz(5).take(2)).toMatchSnapshot('overwrite number')
  expect(fizzbuzz({ to: 3, from: 2, rules: [] }).take()).toMatchSnapshot(
    'froms'
  )
})

test('addRule', () => {
  const fb = fizzbuzz(10).addRule({ name: 'hey', n: 2 })
  expect(fb.take(6)).toMatchSnapshot('with hey')
})

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
