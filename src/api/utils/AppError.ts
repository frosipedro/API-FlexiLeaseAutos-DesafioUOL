class AppError extends Error {
  public readonly code: number;
  public readonly status: number;
  public readonly message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.status = this.getStatusFromCode(code);
    this.message = message;
  }

  private getStatusFromCode(code: number): number {
    switch (code) {
      case 400:
        return 400; // Bad Request
      case 401:
        return 401; // Unauthorized
      case 403:
        return 403; // Forbidden
      case 404:
        return 404; // Not Found
      case 500:
        return 500; // Internal Server Error
      default:
        return 500; // Default to Internal Server Error
    }
  }
}

export default AppError;
