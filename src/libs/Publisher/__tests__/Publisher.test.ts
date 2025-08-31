import {definePublisher} from "../Publisher.ts";
import {expect, describe, it} from "vitest";

describe('Publisher', () => {
    it('Subscribe by key', () => {
        const publisher = definePublisher()

        publisher.on('test-1', () => {
            console.log('Test 1')
        })

        publisher.on('test-1', () => {
            console.log('Test 1-1')
        })

        publisher.on('test-2', () => {
            console.log('Test 2')
        })

        expect(publisher.observers.get('test-1')?.observersList.size).toBe(2)
        expect(publisher.observers.get('test-2')?.observersList.size).toBe(1)
    })

    it ('Unsubscribe by key', () => {
        const publisher = definePublisher()

        const listener = () => {
            console.log('Test 1')
        }

        publisher.on('test-1', listener)

        publisher.on('test-1', () => {
            console.log('Test 1-1')
        })

        publisher.on('test-2', () => {
            console.log('Test 2')
        })

        expect(publisher.observers.get('test-1')?.observersList.size).toBe(2)
        expect(publisher.observers.get('test-2')?.observersList.size).toBe(1)

        publisher.off('test-1', listener)

        expect(publisher.observers.get('test-1')?.observersList.size).toBe(1)
        expect(publisher.observers.get('test-2')?.observersList.size).toBe(1)
    })

    it('Emit', () => {
        const publisher = definePublisher()
        const result: string[] = []

        publisher.on('test-1', () => {
            result.push('test-1')
        })

        publisher.on('test-1', () => {
            result.push('test-1-1')
        })

        publisher.on('test-2', () => {
            result.push('test-2')
        })

        publisher.emit('test-1', {} as never)

        expect(result).toEqual(['test-1', 'test-1-1'])
    })

    it ('Emit with payload', () => {
        const publisher = definePublisher<Record<'title', string>>()
        const payload = { title: 'Hello World' }
        const calledListeners: string[] = []

        publisher.on('test-1', (p) => {
            expect(p).toEqual(payload)
            calledListeners.push('test-1')
        })

        publisher.on('test-1', (p) => {
            expect(p).toEqual(payload)
            calledListeners.push('test-1-1')
        })

        publisher.on('test-2', (p) => {
            expect(p).toEqual(payload)
            calledListeners.push('test-2')
        })

        publisher.emit('test-1', payload)
        publisher.emit('test-2', payload)

        expect(calledListeners).toEqual(['test-1', 'test-1-1', 'test-2'])
    })
})