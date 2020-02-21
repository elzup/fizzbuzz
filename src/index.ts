type RuleDiv = {
  readonly n: number
  readonly name: string
}

type CheckFunc = (v: number) => boolean

type RuleComp = {
  readonly check: CheckFunc
  readonly name: string
}

type Rule = RuleDiv | RuleComp

type OptionArguments = {
  to?: number
  from?: number
  rules?: Array<Rule>
}

type Params = {
  readonly to: number
  readonly from: number
  readonly rules: Array<Rule>
}

type Arguments = number | OptionArguments

type MakeIterator = (
  to?: number,
  from?: number
) => Generator<string, void, string>
type FizzBuzz = {
  from: (to: number) => FizzBuzz
  to: (to: number) => FizzBuzz
  rules: (rules: Array<Rule>) => FizzBuzz
  addRule: (rule: Rule) => FizzBuzz
  take: (to?: number, from?: number) => Array<string>
  at: (n: number) => string
  it: MakeIterator
}

const basicRules: Array<Rule> = [
  { n: 3, name: 'Fizz' },
  { n: 5, name: 'Buzz' },
]

const defaultArgumants: Params = {
  to: 30,
  from: 1,
  rules: basicRules,
}

const normalizeParams = (arg?: Arguments): Params => {
  if (!arg) {
    return defaultArgumants
  }
  if (typeof arg === 'number') {
    return {
      from: defaultArgumants.from,
      rules: defaultArgumants.rules,
      to: arg,
    }
  }
  return {
    ...defaultArgumants,
    ...arg,
  }
}

const makeDiv = (n: number): CheckFunc => v => v % n === 0
const convertComp = (rule: Rule): RuleComp => {
  if (rule.check) {
    return rule
  }
  return {
    name: rule.name,
    check: makeDiv(rule.n),
  }
}

type CalcFunc = (n: number) => string

const genAt = (compRules: Array<RuleComp>): CalcFunc => {
  return (n: number) => {
    const hitRules = compRules.filter(r => r.check(n))
    if (hitRules.length === 0) {
      return `${n}`
    }
    return hitRules.map(v => v.name).join('')
  }
}

const genGenIt = (
  calc: CalcFunc,
  defaultTo: number,
  defaultFrom: number
): MakeIterator => {
  return (
    to: number = defaultTo,
    from: number = defaultFrom
  ): Generator<string, void, string> =>
    (function*() {
      for (let i = from; i <= to; i++) {
        yield calc(i)
      }
    })()
}

const fizzbuzz = (arg?: Arguments): FizzBuzz => {
  const params = normalizeParams(arg)
  const compRules = params.rules.map(convertComp)
  const at = genAt(compRules)
  const genIt = genGenIt(at, params.to, params.from)

  return {
    from: from => fizzbuzz({ ...params, from }),
    to: to => fizzbuzz({ ...params, to }),
    rules: rules => fizzbuzz({ ...params, rules }),
    addRule: rule => fizzbuzz({ ...params, rules: [...params.rules, rule] }),
    take: (to = params.to, from = params.from) => [...genIt(to, from)],
    at,
    it: genIt,
  }
}

export { basicRules }
export default fizzbuzz
