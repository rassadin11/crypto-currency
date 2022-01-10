export function ValidateSelect(instanceValue: string, e: string): string | boolean | void {
    let regexLetters = /[^0-9.,]/g
    let regexDots = /[.,]/g

    if (e === '') e = '0'
    if (regexLetters.test((e[e.length - 1]))) return

    if (e.match(regexDots) !== null) {
        if ((e === `${instanceValue}.` || e === `${instanceValue},`) && (e.match(regexDots)!.length <= 1)) {
            return `${instanceValue}.`
        }
    }

    if (e[e.length - 1] === '.' || e[e.length - 1] === ',') return `${e}`

    return true
}