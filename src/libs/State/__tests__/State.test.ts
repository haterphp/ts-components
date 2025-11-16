import {expect, describe, it} from "vitest";
import createState from "../State.ts";

describe("State", () => {
    it('State defined and have opportunity to get it shapshot', () => {
        const { getState } = createState('Hello world')
        expect(getState()).toEqual('Hello world')
    })

    it('State defined and have opportunity to get it shapshot after changes', () => {
        const { getState, setState } = createState('Hello world')
        expect(getState()).toEqual('Hello world')
        setState('Hello the whole world')
        expect(getState()).toEqual('Hello the whole world')
    })

    it('State defined and have opportunity to get it shapshot after changes', () => {
        const { getState, setState } = createState('Hello world')
        expect(getState()).toEqual('Hello world')
        setState((prev) => prev + ' world')
        expect(getState()).toEqual('Hello world world')
    })

    it('State defined and have opportunity to subscribe to callback when data is changed', () => {
        const { setState, getState, evChanged } = createState('Hello world')
        evChanged.on((newState) => {
            expect(newState).toEqual('Hello world world')
        })
        setState('Hello world world')
        expect(getState()).toEqual('Hello world world')
    })
})