// @flow

type RuleDiv = {|
  +n: number,
  +name: string,
|}

type CheckFunc = (v: number) => boolean

type RuleComp = {|
  +check: CheckFunc,
  +name: string,
|}

type Rule = RuleDiv | RuleComp

type OptionArguments<T> = {|
  to?: number,
  from?: number,
  rules?: Rule[],
  rawCallback?: (v: number) => T,
|}

type Params<T> = {|
  +to: number,
  +from: number,
  +rules: Rule[],
  +rawCallback: (v: number) => T,
|}

type Arguments<T> = number | OptionArguments<T>

type FizzBuzz<T> = {|
  from: (to: number) => FizzBuzz<T>,
  to: (to: number) => FizzBuzz<T>,
  rules: (rules: Rule[]) => FizzBuzz<T>,
  addRule: (rule: Rule) => FizzBuzz<T>,
  take: (to?: number, from?: number) => Array<string | T>,
  at: (n: number) => string | T,
  it: (to?: number, from?: number) => Generator<string, void, T>,
|}

const basicRules: Rule[] = [{ n: 3, name: 'Fizz' }, { n: 5, name: 'Buzz' }]

const defaultArgumants: Params<string> = {
  to: 30,
  from: 1,
  rawCallback: v => `${v}`,
  rules: basicRules,
}

const normalizeParams = <T>(arg: Arguments<T>): Params<T> => {
  if (typeof arg === 'number') {
    return { ...defaultArgumants, to: arg }
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

function fizzbuzz<T: string>(arg?: Arguments<T>): FizzBuzz<T> {
  const params: Params<T> = arg ? defaultArgumants : normalizeParams(arg)
  const compRules = params.rules.map(convertComp)
  const calc = (n: number): string | T => {
    const hitRules = compRules.filter(r => r.check(n))
    if (hitRules.length === 0) {
      return params.rawCallback(n)
    }
    return hitRules.map(v => v.name).join('')
  }

  const genIt = (
    to: number = params.to,
    from: number = params.from
  ): Generator<string, void, T> =>
    (function*() {
      for (let i = from; i <= to; i++) {
        yield calc(i)
      }
    })()

  return {
    from: from => fizzbuzz({ ...params, from }),
    to: to => fizzbuzz({ ...params, to }),
    rules: rules => fizzbuzz({ ...params, rules }),
    addRule: rule => fizzbuzz({ ...params, rules: [...params.rules, rule] }),
    take: (to = params.to, from = params.from) => [...genIt(to, from)],
    at: n => `${calc(n)}`,
    it: genIt,
  }
}

export { basicRules }
export default fizzbuzz
