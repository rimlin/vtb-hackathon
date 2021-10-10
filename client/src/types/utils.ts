export type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never

export type Unpacked<T> = T extends (infer U)[]
	? U
	: T extends (...args: any[]) => infer U
	? U
	: T extends Promise<infer U>
	? U
	: T

/*
  	Используется для получения типа который возвращает Promise
	function promiseOne() {
		return Promise.resolve(1)
	}
	const promisedOne = promiseOne()

	type PromiseOneThenArg = ThenArg<typeof promisedOne> 
 */
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>
}
