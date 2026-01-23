---
title: 常用的高级类型
createTime: 2026/01/23 12:35:12
permalink: /docs/web/6tszm0iu/
---

## `Partial<Type>`
`Partial<T> `可以快速把某个接口类型中定义的属性变成可选的
源代码
```
type Partial<T> = {
    [P in keyof T]?: T[P];
};


interface {
age:number
}
```

举例: 
```
interface IUser={
  name:string;
  age:number  
}

type optional = Partial<IUser>

//转化后的结果
type optional = {
  name?:string;
  age?:number
}
```

项目实战: 
```
//materialForm.ts  43
type IMaterialVarLength = Partial<IStimuliInputKey<number>>;
```

## `Required<Type>`
和Partial刚好相反，将一个定义中的属性全部变成必选参数.让一个类型的属性全部必填
源代码

```
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```
举例
```
interface Person {
    name: string;
    age?: number;
}

type person = Required<Person>;
// person === {name: string; age: number}
```
项目实战: 
```
interface IExtraProps {
    placeholder?: string;
}
//input audioInput.ts
	protected _getRestOfCompProps(): Required<IExtraProps> {
		return {
			placeholder: this._props.placeholder,
		};
	}
```

## `Readonly<Type>`
如果要求对象中的一些字段只能在创建的时候被赋值，使用 readonly 定义只读属性。(只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候)
源代码

```
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
举例
interface Person {
    readonly id: number;
    name: string;
let tom: Person = {
    id: 89757,
    name: 'Tom',
};
tom.id = 9527;      //  Cannot assign to 'id' because it is a constant or a read-only 
```

项目实战

```
//share form.ts (68)
readonly inputConfig: Readonly<TInputConfig>;
readonly value: Readonly<TValue>;
```

## `Record<Keys, Type>()`
`Record<K,T>`具有给定类型T的一组属性K的类型。在将一个类型的属性映射到另一个类型的属性时，Record非常方便。
[相关解释](https://zhuanlan.zhihu.com/p/356662885)
源代码

```
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

举例

```
type person6 = Record<'name' | 'age', string>
// person6 === {name: string; age: string}

type CatName = "miffy" | "boris"
const cats: Record<CatName, person6> = {
   miffy: { name: 10, age: "Persian" },
   boris: { name: 5, age: "Maine Coon" },
}
```

项目实战
```
//layoutInput.ts
export class LayoutInputConfig extends InputConfigBase<
	ILayoutInputSetting,
	ILayoutValue,
	Record<string, any>
> {
...
}

//Record<string, any>
// {
    [x: string]: person6;   //索引签名
}

name:any
sex:angry  
```
综合实战应用1

```
//针对Paradigm 中blockForm.ts
export const blockInputPresets: Partial<Record<keyof IBlockValue, IInputPropPreset>> = {
...
}
// * 执行keyof IBlockValue 的联合类型 例如maxPump | gain | count;
// * 执行Record maxPump：IInputPropPreset，gain：IInputPropPreset，count：IInputPropPreset   
export type IInputPropPreset = {
	label: string;
	description?: string;
	constraint?: INumberConstraint;
};
// * 执行Partial里面的参数 都是不必填内容
```
## `Pick<Type, Keys>` (部分选择)
》可能需要从一个已声明的类型中抽取出一个子类型，在子类型中包含父类型中的部分或全部属性，这时我们可以使用Pick来实现，
源代码

```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

举例

interface User {
    id: number;
    name: string;
    age: number;
    gender: number;
    email: string;
}
 
type PickUser = Pick<User, "id" | "name" | "gender">;
 
// 等价于
type PickUser = {
    id: number;
    name: string;
    gender: number;
    }
项目实战
//multiLevelInput.ts
const defaultSetting: Pick<IMultiLevelInputSetting, 'level'> = {
	level: {
		constraint: numberConstraints.int_1_20,
		lengthRange: numberConstraints.int_1_20,
	},
};

export interface IMultiLevelInputSetting {
    /** 默认值 int 1-20 */
    level?: {
        constraint: INumberConstraint;
        lengthRange: IRange;
    };
    varSettings: IMultiLevelVarNumberSetting[];
}
```

## `Omit<Type, Keys>`（属性忽略） 
与Pick相反，Pick用于拣选出我们需要关心的属性，而Omit用于忽略掉我们不需要关心的属性

举例
```
interface User {
    id: number;
    name: string;
    age: number;
    gender: number;
    email: string;
}
 
// 表示忽略掉User接口中的age和email属性
type OmitUser = Omit<User, "age" | "email">;
// 等价于
type OmitUser = {
  id: number;
  name: string;
  gender: number;
};
```

项目实战
```
	//所有的block.ts文件中
  protected _createConstants(
		blockValue: IBlockValue
	): Omit<ITrialConstants, 'feedback' | 'fileManager'> {
		return { keys: blockValue.key, area: blockValue.area, pos: blockValue.pos };
	}
```

条件类型
(参考地址)[https://blog.csdn.net/diecuoxie4468/article/details/102360892?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-102360892-blog-104111165.pc_relevant_antiscanv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-102360892-blog-104111165.pc_relevant_antiscanv2&utm_relevant_index=2]

## `Exclude<UnionType, ExcludedMembers>`
一个类型从另一个类型中剔除部分属性key
源码
```
type Exclude<T, U> = T extends U ? never : T;
```

举例
```
type T0 = Exclude<"a" | "b" | "c", "a">;
type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

type T1 = "c"

//解释 对于联合类型，是如何进行类比的？
T1 = | ("a" extends "a" | "b" ? never : "a")
  | ("b" extends "a" | "b" ? never : "b")
  | ("c" extends "a" | "b" ? never : "c")
最终结果 T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
     
type T2 = string | number
```


项目实战
```
// orderedBlock.ts

export type ILevelVarPool<T extends IOrderedTrialLevel> = {
	[key in Exclude<keyof T, 'index'>]: Array<T[key]>;
};


//is.ts    如果value不是null的为true
export function noNull<T>(v: T | null): v is Exclude<T, null> {
	return v !== null;
}
```

## `Extract<Type, Union>`
Extract 的功能，与 Exclude 相反，它是 提取 T 中可以赋值给 U 的类型

源码

```
type Extract<T, U> = T extends U ? T : never;

举例
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
     
type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;
     
type T1 = () => void
```

项目实战暂无
## `NonNullable<Type>`
非空类型中排除 null 和 undefined

举例：
```
type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]
```

项目案例

```
export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
	// eslint-disable-next-line unicorn/no-null
	return v != null;
}
```

## `ReturnType`（函数返回值类型） 
`ReturnType<T>`的作用是用于获取函数 T 的返回类型。  

```
declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>;
     
type T0 = string
type T1 = ReturnType<(s: string) => void>;
     
type T1 = void
type T2 = ReturnType<<T>() => T>;
     
type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
     
type T3 = number[]
type T4 = ReturnType<typeof f1>;
     
type T4 = {
    a: number;
    b: string;
}
```

项目实战无

## `Parameters`（函数参数类型）
Parameters的作用是用于获取函数 T 的参数类型

举例

```
// 获取函数所有参数的类型元组
type T0 = Parameters<() => string>;
     
type T0 = []
type T1 = Parameters<(s: string) => void>;
     
type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>;
     
type T2 = [arg: unknown]
```
项目实战无