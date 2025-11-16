import defineEvent, {type EventListeners} from "../Event/Event.ts";

interface State<TStateContent> {
    getState(): TStateContent;

    setState(state: TStateContent): void;
    setState(state: (prevState: TStateContent) => void): void;

    evChanged: EventListeners<TStateContent>
}

export default function createState<TStateContent>(defaultValue: TStateContent): State<TStateContent> {
    let value = defaultValue;
    const evChanged = defineEvent<TStateContent>()

    function setState(newValue: (prevState: TStateContent) => void): void
    function setState(newValue: TStateContent): void
    function setState(newValue: unknown): void {
        if (typeof newValue === 'function') {
            value = newValue(value)
            return
        } else {
            value = newValue as TStateContent
        }

        evChanged.emit(getState())
    }

    function getState() {
        return value;
    }

    return {
        getState,
        setState,
        evChanged,
    }
}