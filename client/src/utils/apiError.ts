import { ApiErrorConstruction } from 'types/Request'

export class ApiError implements ApiErrorConstruction {
	error
	isHandled

	constructor(options: ApiErrorConstruction) {
		this.error = options.error
		this.isHandled = options.isHandled
	}
}
