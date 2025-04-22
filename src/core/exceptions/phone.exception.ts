import { ConflictException, NotFoundException } from './domain.exception';

export class PhoneAlreadyExistsException extends ConflictException {
  constructor(number: string) {
    super(`Phone number ${number} already exists`);
  }
}
export class PhoneNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Phone ${id} not found`);
  }
}
