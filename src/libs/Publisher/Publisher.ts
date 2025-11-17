import defineEvent, { type EventObserver, type Event} from "../Event/Event.ts";

export interface Publisher<TPayload = unknown, TKeys extends string = string> {
    /**
     * Getters
     */
    observers: Map<TKeys, Event<TPayload>>

    /**
     * Methods
     */
    on(key: TKeys, observer: EventObserver<TPayload>): void
    off(key: TKeys, observer: EventObserver<TPayload>): void
    emit(key: TKeys, payload: TPayload): void
}

export function definePublisher<TPayload = unknown, TKeys extends string = string>(): Publisher<TPayload, TKeys> {
    const observers = new Map<TKeys, Event<TPayload>>()

    // =========================

    function on(key: TKeys, observer: EventObserver<TPayload>): void {
        let existedEvent = observers.get(key)
        if (existedEvent === undefined) {
            existedEvent = defineEvent<TPayload>()
            observers.set(key, existedEvent)
        }
        existedEvent.on(observer)
    }

    function off(key: TKeys, observer: EventObserver<TPayload>): void {
        const existedObservers = observers.get(key)
        if (existedObservers === undefined) {
            throw new Error(`Observers list for key=$key{} not found`)
        }
        existedObservers.off(observer)
    }

    function emit(key: TKeys, payload: TPayload): void {
        const existedObservers = observers.get(key)
        if (existedObservers === undefined) {
            throw new Error(`Any observers not found for key=${key}`)
        }
        existedObservers.emit(payload)
    }

    return {
        observers,

        on,
        off,
        emit
    }
}