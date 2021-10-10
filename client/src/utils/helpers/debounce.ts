export function debounce<T extends (...args: any) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: number | null

	return function (this: Function) {
		let context = this
		let args = arguments

		const later = function () {
			timeout = null
			func.apply(context, args as any)
		}

		clearTimeout(timeout as number)

		timeout = window.setTimeout(later, wait)
	}
}
