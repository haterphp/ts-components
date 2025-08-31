# Publisher component

Library component. Before usage put **Event component** near Publisher in neighbour directory

This component implement basic Observer pattern. How it works you can see [Observer pattern](https://refactoring.guru/design-patterns/observer) on Refactoring Guru

The best point of this component - you can assign observer triggering for key and you don't need to define many Publishers if they working with the same payload structure

## Usage example

````TypeScript
import {definePublisher} from "./Publisher";

interface Payload {
    example: string
}

const ev = definePublisher<Payload>()
const handler = (payload: Payload) => {
    console.log(payload)
}

ev.on('key-1', handler)
ev.on('key-2', handler)

ev.emit('key-1', {example: 'Hello'})

ev.off('key-1', handler)
ev.off('key-2', handler)
````

And you will see this output

````
Output

> Hello
````