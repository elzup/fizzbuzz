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
type PackFunc = (n: number, hitRules: Rule[]) => any

type Params = {
  readonly to: number
  readonly from: number
  readonly rules: Rule[]
  readonly packFunc: PackFunc
}
type OptionArguments = Partial<Params>

type Arguments = number | OptionArguments
type MakeIterator<T> = (to?: number, from?: number) => Generator<T, void, T>

type FizzBuzz<T> = {
  from: (to: number) => FizzBuzz<T>
  to: (to: number) => FizzBuzz<T>
  rules: (rules: Rule[]) => FizzBuzz<T>
  addRule: (rule: Rule) => FizzBuzz<T>
  take: (to?: number, from?: number) => T[]
  at: (n: number) => T
  it: MakeIterator<T>
}

type PackFuncReturn<T> = T extends { packFunc: (v: number) => infer U }
  ? U
  : DefaultPackFuncReturn

const basicRules: Rule[] = [
  { n: 3, name: 'Fizz' },
  { n: 5, name: 'Buzz' },
]
const defaultPackFunc: PackFunc = (n, hitRules) =>
  hitRules.length === 0 ? n : hitRules.map((v) => v.name).join('')

type DefaultPackFuncReturn = ReturnType<typeof defaultPackFunc>
const defaultArgumants: Params = {
  to: 30,
  from: 1,
  rules: basicRules,
  packFunc: defaultPackFunc,
}

const normalizeParams = (arg: Arguments): Params => {
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
    check: (v) => v % rule.n === 0,
  }
}

type CalcFunc = (n: number) => any

const genAt = (compRules: RuleComp[], packFunc: PackFunc) => {
  return (n: number) =>
    packFunc(
      n,
      compRules.filter((r) => r.check(n))
    )
}

const genGenIt = <CF extends CalcFunc, R extends ReturnType<CF>>(
  calc: CF,
  defaultTo: number,
  defaultFrom: number
): MakeIterator<R> => {
  return (to: number = defaultTo, from: number = defaultFrom) =>
    (function* () {
      for (let i = from; i <= to; i++) {
        yield calc(i)
      }
    })()
}

const fizzbuzz = <T extends Arguments, R extends PackFuncReturn<T>>(
  arg?: T
): FizzBuzz<R> => {
  const params = normalizeParams(arg)
  const compRules = params.rules.map(convertComp)
  const at = genAt(compRules, params.packFunc)
  const genIt = genGenIt(at, params.to, params.from)

  return {
    from: (from) => fizzbuzz({ ...params, from }),
    to: (to) => fizzbuzz({ ...params, to }),
    rules: (rules) => fizzbuzz({ ...params, rules }),
    addRule: (rule) => fizzbuzz({ ...params, rules: [...params.rules, rule] }),
    take: (to = params.to, from = params.from) => [...genIt(to, from)],
    at,
    it: genIt,
  }
}

export { basicRules, defaultPackFunc, defaultArgumants }
export default fizzbuzz
