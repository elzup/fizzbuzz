type Mutable<T> = { -readonly [P in keyof T]: T[P] }

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
type PackFunc<T> = (n: number, hitRules: Rule[]) => T

type Params<T> = {
  readonly to: number
  readonly from: number
  readonly rules: Rule[]
  readonly packFunc: PackFunc<T>
}
type OptionArguments<T> = Partial<Params<T>>

type Arguments<T> = number | OptionArguments<T>
type MakeIterator<T> = (to?: number, from?: number) => Generator<T, void, T>

const defaultPackFunc: PackFunc<number | string> = (n, hitRules) =>
  hitRules.length === 0 ? n : hitRules.map(v => v.name).join('')

type FizzBuzz<T> = {
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

type DefaultPackFuncReturn = ReturnType<typeof defaultPackFunc>
const defaultArgumants: Params<DefaultPackFuncReturn> = {
  to: 30,
  from: 1,
  rules: basicRules,
  packFunc: defaultPackFunc,
}

type PackFuncReturn<T> = T extends OptionArguments<infer U>
  ? U
  : DefaultPackFuncReturn

const normalizeParams = <T>(
  arg: Arguments<T>
): Params<PackFuncReturn<Arguments<T>>> => {
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

type CalcFunc<T> = (n: number) => T

const genAt = <T>(
  compRules: RuleComp[],
  packFunc: PackFunc<T>
): CalcFunc<T> => {
  return (n: number) =>
    packFunc(
      n,
      compRules.filter(r => r.check(n))
    )
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

const fizzbuzz = <T>(
  arg?: Arguments<T>
): FizzBuzz<PackFuncReturn<Arguments<T>>> => {
  const params = normalizeParams(arg)
  const compRules = params.rules.map(convertComp)
  const at = genAt(compRules, params.packFunc)
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
