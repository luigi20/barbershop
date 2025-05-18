class AppError extends Error {
  public readonly statusCode: number;
  public readonly id: string;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;

    // Corrigir o prototype para garantir instanceof funcione (opcional, mas recomendado)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export { AppError };
