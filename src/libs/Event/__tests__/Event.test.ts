import defineEvent from "../Event.ts";
import { describe, it, expect } from 'vitest'

describe('Event', () => {
    it('subscribe', () => {
        const ev = defineEvent()

        ev.on(() => {
            console.log('Hello')
        })
        ev.on(() => {
            console.log('World')
        })

        expect(ev.observersList.size).toBe(2)
    })

    it('unsubscribe', () => {
        const ev = defineEvent()

        const listener = () => {
            console.log('Hello')
        }

        ev.on(listener)

        ev.on(() => {
            console.log('World')
        })

        expect(ev.observersList.size).toBe(2)

        ev.off(listener)

        expect(ev.observersList.size).toBe(1)
    })

    it('emit', () => {
        const ev = defineEvent()
        const result: string[] = []
        const expected = ['Hello', 'World']

        ev.on(() => {
            result.push('Hello')
        })

        ev.on(() => {
            result.push('World')
        })

        ev.emit({} as never)

        expect(result).toEqual(expected)
    })

    it('emit with payload', () => {
        const ev = defineEvent<Record<'title', string>>()
        const payload = { title: 'Hello World' }

        ev.on((p) => {
            expect(p).toEqual(payload)
        })

        ev.emit(payload)
    })
})