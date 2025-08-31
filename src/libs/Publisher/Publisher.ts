import defineEvent, { type EventObserver, type Event} from "../Event/Event.ts";

type PublisherObserverKey = string

export interface Publisher<TPayload = unknown> {
    /**
     * Getters
     */
    observers: Map<PublisherObserverKey, Event<TPayload>>

    /**
     * Methods
     */
    on(key: PublisherObserverKey, observer: EventObserver<TPayload>): void
    off(key: PublisherObserverKey, observer: EventObserver<TPayload>): void
    emit(key: PublisherObserverKey, payload: TPayload): void
}

export function definePublisher<TPayload = unknown>(): Publisher<TPayload> {
    const observers = new Map<PublisherObserverKey, Event<TPayload>>()

    // =========================

    function on(key: PublisherObserverKey, observer: EventObserver<TPayload>): void {
        let existedEvent = observers.get(key)
        if (existedEvent === undefined) {
            existedEvent = defineEvent<TPayload>()
            observers.set(key, existedEvent)
        }
        existedEvent.on(observer)
    }

    function off(key: PublisherObserverKey, observer: EventObserver<TPayload>): void {
        const existedObservers = observers.get(key)
        if (existedObservers === undefined) {
            throw new Error(`Observers list for key=$key{} not found`)
        }
        existedObservers.off(observer)
    }

    function emit(key: PublisherObserverKey, payload: TPayload): void {
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