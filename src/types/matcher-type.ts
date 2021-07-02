export type MatcherType<
  E,
  M extends (
    ...args: any[]
  ) => jest.CustomMatcherResult | Promise<jest.CustomMatcherResult>
> = (...args: [received: E, ...rest: Parameters<M>]) => ReturnType<M>;
