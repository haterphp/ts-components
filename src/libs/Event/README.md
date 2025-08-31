# Event component

Library component. Can be used if you need implement publisher pattern but you don't need to propagate this event for grouped by keys subscribers

## Usage example

````TypeScript
import defineEvent from "./Event";

interface Payload {
    example: string
}

const ev = defineEvent<Payload>()
const handler = (payload: Payload) => {
    console.log(payload)
}

ev.on(handler)

ev.emit({example: 'Hello'})
ev.emit({example: 'World'})

ev.off(handler)
````

And you will see this output

````
Output

> Hello
> World
````