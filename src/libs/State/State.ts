import defineEvent, {type EventListeners} from "../Event/Event.ts";

interface State {
    evChanged: EventListeners // FIXME: Probably we should add payload, but I'm not sure which format for that i should pick
    evDefined: EventListeners
    evDestroyed: EventListeners
}

export default function createState(): State {
    const evDefined = defineEvent()
    const evChanged = defineEvent()
    const evDestroyed = defineEvent()

    return {
        evDefined,
        evChanged,
        evDestroyed
    }
}