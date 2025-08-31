export type EventObserver<TPayload = never> = (payload: TPayload) => void

export interface EventListeners<TPayload = never> {
    on(observer: EventObserver<TPayload>): void
    off(observer: EventObserver<TPayload>): void
}

export interface Event<TPayload = never> extends EventListeners<TPayload> {
    observersList: Set<EventObserver<TPayload>>

    emit(payload: TPayload): void
    remove(): void
}

export default function defineEvent<TPayload = never>(): Event<TPayload> {
    const observers: Set<EventObserver<TPayload>> = new Set()

    function on(observer: EventObserver<TPayload>): void {
        observers.add(observer)
    }

    function off(observer: EventObserver<TPayload>): void {
        observers.delete(observer)
    }

    function remove(): void {
        observers.clear()
    }

    function emit(payload: TPayload): void {
        observers.forEach(o => o(payload))
    }

    return {
        observersList: observers,

        on,
        off,
        emit,
        remove
    }
}