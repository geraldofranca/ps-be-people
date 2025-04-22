export class PersonCreatedEvent {
  constructor(public readonly personId: string) {}
}

export class PersonUpdatedEvent {
  constructor(public readonly personId: string) {}
}
