
export type Dimension = "2D" | "3D" | "4D" | "5D";

export type Axis = "x" | "y" | "z" | "u" | "v" | "w" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t";

export type Point = { [axis in Axis]: -1 | 0 | 1 | 2 };

export type Point_2D = Pick<Point, 'x' | 'y'>;
export type Point_3D = Point_2D & Pick<Point, 'z'>;
export type Point_4D = Point_3D & Pick<Point, 'u'>;
export type Point_5D = Point_4D & Pick<Point, 'v'>;
export type Point_6D = Point_5D & Pick<Point, 'w'>;
export type Point_7D = Point_6D & Pick<Point, 'a'>;
export type Point_8D = Point_7D & Pick<Point, 'b'>;
export type Point_9D = Point_8D & Pick<Point, 'c'>;
export type Point_10D = Point_9D & Pick<Point, 'd'>;
export type Point_11D = Point_10D & Pick<Point, 'd'>;
export type Point_12D = Point_11D & Pick<Point, 'f'>;
export type Point_13D = Point_12D & Pick<Point, 'g'>;
export type Point_14D = Point_13D & Pick<Point, 'h'>;
export type Point_15D = Point_14D & Pick<Point, 'i'>;
export type Point_16D = Point_15D & Pick<Point, 'j'>;
export type Point_17D = Point_16D & Pick<Point, 'k'>;
export type Point_18D = Point_17D & Pick<Point, 'l'>;
export type Point_19D = Point_18D & Pick<Point, 'm'>;
export type Point_20D = Point_19D & Pick<Point, 'n'>;
export type Point_21D = Point_20D & Pick<Point, 'o'>;
export type Point_22D = Point_21D & Pick<Point, 'p'>;
export type Point_23D = Point_22D & Pick<Point, 'q'>;
export type Point_24D = Point_23D & Pick<Point, 'r'>;
export type Point_25D = Point_24D & Pick<Point, 's'>;
export type Point_26D = Point_25D & Pick<Point, 't'>;

export type Point_Set = Point_2D | Point_3D | Point_4D | Point_5D;



type RotationAxis = { axis: Axis[] };
type RotationFixValue = { fixValue: number };
type RotationValueAngleMultiplicator = { angleMultiplicator: number };//0 | 0.25 | 0.5 | 0.75 | 1 };

export type Rotate_Set = RotationAxis & RotationFixValue & RotationValueAngleMultiplicator;