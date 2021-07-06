export const assert = (isTrue: any, error: string) => {
    if (isTrue) {
        return
    } else {
        throw new Error(error)
    }
}

export const assertEqual = (item1: any, item2: any, error: string) => {
    if (item1 == item2) {
        return
    } else {
        throw new Error(error)
    }
}

export const assertStrictEqual = (item1: any, item2: any, error: string) => {
    if (item1 === item2) {
        return
    } else {
        throw new Error(error)
    }
}