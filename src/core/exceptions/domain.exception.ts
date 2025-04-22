export abstract class DomainException extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}

export class BadRequestException extends DomainException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ConflictException extends DomainException {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message, 404);
  }
}
