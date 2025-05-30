// This module should contain type definitions for modules which do not have
// their own type definitions and are not available on DefinitelyTyped.

declare module 'thirty-two' {
	export function encode(data: string | Buffer): string
	export function decode(data: string): Buffer
}

declare module 'tailwindcss-animate' {
	declare const _default: {
		handler: () => void
	}
	export = _default
}
