export type Ok<T> = { ok: true; value: T };

export interface IError {
  kind: string;
  message: string;
}

export type Err<E extends IError> = { ok: false; error: E };

export type Result<T, E extends IError> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E extends IError>(error: E): Err<E> => ({ ok: false, error });
