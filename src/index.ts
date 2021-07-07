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
  rules?: Rule[]
}

type Params = {
  readonly to: number
  readonly from: number
  readonly rules: Rule[]
}

type Arguments = number | OptionArguments

type MakeIterator<T> = (to?: number, from?: number) => Generator<T, void, T>

type FizzBuzz<T = string | number> = {
  from: (to: number) => FizzBuzz<T>
  to: (to: number) => FizzBuzz<T>
  rules: (rules: Rule[]) => FizzBuzz<T>
  addRule: (rule: Rule) => FizzBuzz<T>
  take: (to?: number, from?: number) => T[]
  at: (n: number) => T
  it: MakeIterator<T>
}

const basicRules: Rule[] = [
  { n: 3, name: 'Fizz' },
  { n: 5, name: 'Buzz' },
]

const defaultArgumants: Params = {
  to: 30,
  from: 1,
  rules: basicRules,
}

const normalizeParams = (arg?: Arguments): Params => {
  if (!arg) return defaultArgumants
  if (typeof arg === 'number') {
    return Object.assign({}, defaultArgumants, { to: arg })
  }
  return Object.assign({}, defaultArgumants, arg)
}

const isRuleDiv = (rule: Rule): rule is RuleDiv => 'n' in rule
const convertComp = (rule: Rule): RuleComp => {
  if (!isRuleDiv(rule)) return rule
  return {
    name: rule.name,
    check: v => v % rule.n === 0,
  }
}

type CalcFunc<T = string | number> = (n: number) => T

const genAt = (compRules: RuleComp[]): CalcFunc => {
  return (n: number) => {
    const hitRules = compRules.filter(r => r.check(n))

    if (hitRules.length === 0) return n

    return hitRules.map(v => v.name).join('')
  }
}

const genGenIt = <T>(
  calc: CalcFunc<T>,
  defaultTo: number,
  defaultFrom: number
): MakeIterator<T> => {
  return (to: number = defaultTo, from: number = defaultFrom) =>
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
