type NewLine = `
`;

type Invert<I, R extends string = ""> =
  I extends `${infer Head}${infer Tail}`
  ? Invert<Tail, `${R}${Head extends "1" ? "0" : "1"}`>
  : R;

type Invert1 = Invert<"001">;
type Invert2 = Invert<"10010101">;

type WrapLine<I, R extends string = ""> =
  I extends `${infer _Head}${infer Tail}`
  ? WrapLine<Tail, `${R}-`>
  : R;
type Wrap<I extends string> = `**${WrapLine<I>}**${NewLine}* ${I} *${NewLine}**${WrapLine<I>}**`;

type Wrap1 = Wrap<"Hello World!">;
type Wrap2 = Wrap<"WrapperPart">;

type WordCount<I, R extends 0[] = [0]> = I extends `${infer _Head} ${infer Tail}`
  ? WordCount<Tail, [0, ...R]>
  : R["length"];

type WordCount1 = WordCount<"Hello World">;
type WordCount2 = WordCount<"Hello World and Rest">;

type MatrixLine<I, S extends 0[] = [], R extends string = ""> = S["length"] extends I
  ? R
  : MatrixLine<I, [0, ...S], `${R}*`>;
type Matrix<I, S extends 0[] = [], R extends string = ""> = S["length"] extends I
  ? R
  : Matrix<I, [...S, 0], `${R}${NewLine}${MatrixLine<I>}`>;

type Matrix1 = Matrix<3>;
type Matrix2 = Matrix<5>;

type Min<A, B, C extends 0[] = []> = C["length"] extends A
  ? A
  : C["length"] extends B
  ? B
  : Min<A, B, [0, ...C]>;

type Min1 = Min<3, 5>;
type Min2 = Min<7, 5>;

type Max<A, B, C extends 0[] = []> = C["length"] extends A
  ? B
  : C["length"] extends B
  ? A
  : Max<A, B, [0, ...C]>;

type Max1 = Max<3, 5>;
type Max2 = Max<7, 5>;

type Count<A, S extends 0[] = []> = S["length"] extends A
  ? S
  : Count<A, [0, ...S]>

type Count1 = Count<3>;
type Count2 = Count<5>;

type Inc<A> = [0, ...Count<A>]["length"];

type Inc1 = Inc<3>;
type Inc2 = Inc<5>;

type Dec<A> = Count<A> extends [infer _Head, ...infer Tail]
  ? Tail["length"]
  : 0;

type Dec1 = Dec<3>;
type Dec2 = Dec<5>;

type Add<A, B> = B extends 0
  ? A
  : Add<Inc<A>, Dec<B>>;

type Add1 = Add<2, 5>;
type Add2 = Add<3, 7>;

type Sub<A, B> = B extends 0
  ? A
  : Sub<Dec<A>, Dec<B>>;

type Sub1 = Sub<7, 5>;
type Sub2 = Sub<10, 7>;

type Mul<A, B, R = 0> = B extends 0
  ? R
  : Mul<A, Dec<B>, Add<R, A>>;

type Mul1 = Mul<2, 5>;
type Mul2 = Mul<4, 6>;

type Div<A, B, R = 0> = A extends Mul<B, Inc<R>>
  ? Inc<R>
  : Min<A, Mul<B, Inc<R>>> extends A
  ? R
  : Div<A, B, Inc<R>>;

type Div1 = Div<10, 2>;
type Div2 = Div<26, 6>;

type Mod<A, B> = Sub<A, Mul<Div<A, B>, B>>;

type Mod1 = Mod<20, 10>;
type Mod2 = Mod<17, 10>;

type FilterOut<T extends unknown[], F> = T extends [infer head, ...infer Tail]
  ? head extends F
  ? FilterOut<Tail, F>
  : [head, ...FilterOut<Tail, F>]
  : [];

type FilterOut1 = FilterOut<[1, 2, null, boolean, 3], null | boolean>;
type FilterOut2 = FilterOut<[1, 2, null, boolean, 3], number>;

// const a = [1, 2, 3, 4, 5] as const;
// const b = [1, 2, 3, 4, 5] as const;

// type IndexOf<T extends [].S extends number[] = []> = T["length"] extends S["length"]
//   ? S[number]
//   : IndexOf<T, [S["length"], ...S]>;

// a.forEach((_, i: IndexOf<typeof a>) => {
//   const c = b[i + 1];
// })

type canCross = "green" | "orange";
type shouldStop = "orange" | "red";
type trafficLight = canCross | shouldStop;
type trafficLight2 = canCross & shouldStop;

type A = { a: string };
type B = { b: number };
type A1 = A & {c: boolean};
type B1 = B & {c: boolean};
type C1 = A1 & B1;
type C2 = A1 | B1;
type C11 = keyof (A & B);
type C12 = keyof (A1 & B1);
type C21 = keyof (A1 | B1);
type C31 = keyof (C1)
type C32 = keyof (C2)
type C33 = keyof (A1)
type C34 = keyof (A1)

type D = never;

type Expect<T extends true> = T;
type Equal<X, Y> = <T>() => T extends X ? 1 : 2 extends <T>() => T extends Y ? 1 : 2 ? true : false;
// type Equal<X, Y> = X extends Y ? true: false;

const res1 = 1;
type test1 = Equal<typeof res1, number>
// type test1 = Expect<Equal<typeof res1, number>>

type User = {
  name: string;
  age: number;
  role: "admin" | "standard";
};
const looksLikeAUser = {
  name: "Alice",
  age: 35,
  role: "admin" as const,
  bio: "...", // <- extra prop!
};
const alice: User = looksLikeAUser;

type Name = [firstName: string, lastName: string];
/** 
* description 
* @param  second line
* @returns script version
**/
function nameF(...name:Name):string {
  const [firstName] = name;
  return firstName;
}
const ln = nameF("Emanuel","Förster")