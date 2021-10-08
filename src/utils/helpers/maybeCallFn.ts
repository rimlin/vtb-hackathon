export const maybeCallFn = <T extends (...args: any) => any>(
	fn?: T,
	...args: Parameters<T>
) => {
	return fn && typeof fn === 'function' && fn.apply(fn, args)
}
