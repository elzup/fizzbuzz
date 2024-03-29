import fizzbuzz from '.'

test('take', () => {
  const fb = fizzbuzz()

  expect(fb.take(15)).toMatchInlineSnapshot(`
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
      11,
      "Fizz",
      13,
      14,
      "FizzBuzz",
    ]
  `)
  expect(fb.take(10, 5)).toMatchInlineSnapshot(`
    [
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
    ]
  `)
})

test('chain', () => {
  const fb = fizzbuzz(10)

  expect(fb.to(5).take()).toMatchInlineSnapshot(`
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
    ]
  `)
  expect(fb.from(3).take()).toMatchInlineSnapshot(`
    [
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
    ]
  `)
  expect(fb.from(3).to(8).take()).toMatchInlineSnapshot(`
    [
      "Fizz",
      4,
      "Buzz",
      "Fizz",
      7,
      8,
    ]
  `)
  expect(fb.rules([{ name: 'test', n: 3 }]).take(5)).toMatchInlineSnapshot(`
    [
      1,
      2,
      "test",
      4,
      5,
    ]
  `)
})

test('at', () => {
  const fb = fizzbuzz()

  expect(fb.at(7)).toMatchInlineSnapshot(`7`)
  expect(fb.at(3)).toMatchInlineSnapshot(`"Fizz"`)
  expect(fb.at(5)).toMatchInlineSnapshot(`"Buzz"`)
  expect(fb.at(15)).toMatchInlineSnapshot(`"FizzBuzz"`)
})

test('argument', () => {
  expect(fizzbuzz().take(5)).toMatchInlineSnapshot(`
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
    ]
  `)
  expect(fizzbuzz(5).take()).toMatchInlineSnapshot(`
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
    ]
  `)
  expect(fizzbuzz(5).take(2)).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `)
  expect(fizzbuzz({ to: 3, from: 2, rules: [] }).take()).toMatchInlineSnapshot(`
    [
      2,
      3,
    ]
  `)
})

test('addRule', () => {
  const fb = fizzbuzz(10).addRule({ name: 'hey', n: 2 })

  expect(fb.take(6)).toMatchInlineSnapshot(`
    [
      1,
      "hey",
      "Fizz",
      "hey",
      "Buzz",
      "Fizzhey",
    ]
  `)
})

test('custom func', () => {
  const fb = fizzbuzz({
    rules: [
      { name: 'KYOKO', n: 2 },
      { name: '_toshino_', check: (v) => v === 5 },
    ],
  })

  expect(fb.take(10)).toMatchInlineSnapshot(`
    [
      1,
      "KYOKO",
      3,
      "KYOKO",
      "_toshino_",
      "KYOKO",
      7,
      "KYOKO",
      9,
      "KYOKO",
    ]
  `)
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
  ]).toMatchInlineSnapshot(`
    [
      1,
      2,
      "Fizz",
      4,
      "Buzz",
    ]
  `)
  const t10 = m.it(10, 5)

  expect([...t10]).toMatchInlineSnapshot(`
    [
      "Buzz",
      "Fizz",
      7,
      8,
      "Fizz",
      "Buzz",
    ]
  `)
})

test('packFunc', () => {
  expect(
    fizzbuzz({
      rules: [
        { name: 'x2', n: 2 },
        { name: 'x3', n: 3 },
      ],

      packFunc: (v, rules) => {
        // only 1 rule hit filter and return always string
        if (rules.length === 1) {
          return rules[0].name
        }
        return `_${v}`
      },
    }).take(12)
  ).toMatchInlineSnapshot(`
    [
      "_1",
      "x2",
      "x3",
      "x2",
      "_5",
      "_6",
      "_7",
      "x2",
      "x3",
      "x2",
      "_11",
      "_12",
    ]
  `)
  const fb123 = fizzbuzz({
    rules: [
      { name: 'a', n: 1 },
      { name: 'b', n: 2 },
      { name: 'c', n: 3 },
    ],
    packFunc: (v, rules) => rules.length,
  })

  expect(fb123.take(8)).toMatchInlineSnapshot(`
    [
      1,
      2,
      2,
      2,
      1,
      3,
      1,
      2,
    ]
  `)
})
