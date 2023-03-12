export class DatabaseError {}

export class DeleteVenueError extends DatabaseError {
  message;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class DeleteEventError extends DatabaseError {
  message;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class DeleteGuetError extends DatabaseError {
  message;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
