export class PersonAlreadyExistsException extends Error {
  constructor(document: string) {
    super(`Person with document ${document} already exists in this account`);
  }
}
export class PersonNotFoundException extends Error {
  constructor(id: string) {
    super(`Person ${id} not found`);
  }
}
