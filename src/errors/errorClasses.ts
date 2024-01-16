// class DatabaseError extends Error { ... }: This line defines a new class named DatabaseError that extends the built-in Error class. This means that DatabaseError inherits properties and methods from Error.

// super(message);: The super keyword is used to call the constructor of the parent class (Error in this case). It passes the message argument to the parent class's constructor. This sets the error message for the DatabaseError instance, which is a standard behavior inherited from the Error class.

// this.name = "DatabaseError";: This line sets the name property of the DatabaseError instance to "DatabaseError." This is typically done to provide a custom name for your error class.

// this.message = message || "Error connecting to database";: Here, the message property of the DatabaseError instance is set to the message argument passed to the constructor, or a default message ("Error connecting to database") if no message argument is provided.

// this.statusCode = statusCode || 500;: This line sets a custom statusCode property for the DatabaseError instance. The statusCode is used to indicate the HTTP status code associated with the error response when this error is used in an HTTP context. It defaults to 500 (Internal Server Error) if no statusCode argument is provided.

class DatabaseError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    // Call the constructor of the parent class (Error)
    super(message);
    // Set the custom properties for the DatabaseError class
    this.name = "DatabaseError";
    this.message = message || "Error connecting to database";
    this.statusCode = statusCode || 500;
  }
}

class ValidationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ValidationError";
    this.message = message || "Invalid request";
    this.statusCode = statusCode || 400;
  }
}

class AuthenticationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AuthenticationError";
    this.message = message || "Invalid credentials";
    this.statusCode = statusCode || 401;
  }
}

export { DatabaseError, ValidationError, AuthenticationError };
