import { ConflictException, NotFoundException } from './domain.exception';

export class AddressAlreadyExistsException extends ConflictException {
  constructor(street: string, number: string) {
    super(`Address ${street}, ${number} already exists`);
  }
}
export class AddressNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Address ${id} not found`);
  }
}
