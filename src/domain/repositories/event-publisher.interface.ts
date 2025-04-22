export interface IEventPublisher {
  publish<T>(topic: string, payload: T): Promise<void>;
}
