import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'

export function useQuery<T>(): T {
	return (parse(useLocation().search) as any) as T
}
