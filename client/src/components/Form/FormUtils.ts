import { createContext } from "react"

export type FormSubscriber<T> = (state: T) => any

export type FormControlProtocol = {
    helperText: Record<string, string | undefined>
    error: Record<string, boolean | undefined>
    value: Record<string, any>
}


export class FormStore<T extends Record<string, any>> {
    private _state = {} as T
    private deps: Record<string, Set<FormSubscriber<T>>> = {}
    private globalDeps: Set<FormSubscriber<T>> = new Set()

    private getDeepState(target: Record<string, any>, keys: string[]) {
        let state = target
        for (const key of keys) {
            if (state[key] === undefined) return undefined
            state = state[key]
        }
        return state
    }

    constructor(defaultValue?: T) {
        if (defaultValue) this._state = defaultValue
    }

    subscribe(callback: FormSubscriber<T>, deps?: string[]) {
        if (!deps) this.globalDeps.add(callback)
        else {
            deps.forEach(dep => {
                if (!this.deps[dep]) this.deps[dep] = new Set()
                this.deps[dep].add(callback)
            })
        }
        // 返回取消订阅的方法
        return () => {
            this.globalDeps.delete(callback)
            deps?.forEach(dep => this.deps[dep].delete(callback))
        }
    }

    get state() {
        return { ...this._state }
    }

    setState(state: Partial<T>) {
        // 浅层合并新State
        const current = {
            ...this._state,
            ...state
        }
        Object.entries(this.deps).forEach(([key, callbacks]) => {
            const splittedKey = key.split('.')
            if (this.getDeepState(current, splittedKey) !== this.getDeepState(this._state, splittedKey)) {
                callbacks.forEach(callback => callback({ ...current }))
            }
        })
        this.globalDeps.forEach(callback => callback({ ...current }))
        this._state = current
    }
}

export const FormContext = createContext(new FormStore<FormControlProtocol>())
