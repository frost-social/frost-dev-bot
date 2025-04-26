export class Optional<T> {
  static readonly ABSENT = Symbol("#ABSENT");

  readonly #value;

  constructor(value: typeof Optional.ABSENT | T) {
    this.#value = value;
  }

  static of<T>(
    valueProvider: (absent: typeof this.ABSENT) => typeof this.ABSENT | T,
  ) {
    return new Optional(valueProvider(this.ABSENT));
  }

  static ofNullish<T>(nullish: null | undefined | T) {
    return new Optional(nullish ?? this.ABSENT);
  }

  getOr<O>(otherProvider: () => O) {
    return this.#value !== Optional.ABSENT ? this.#value : otherProvider();
  }

  map<R>(mapper: (value: T) => R) {
    return (this.#value !== Optional.ABSENT)
      ? new Optional(mapper(this.#value))
      : this;
  }

  flatMap<R>(mapper: (value: T) => Optional<R>): Optional<R> {
    return this.map((value) => mapper(value).getOr(() => Optional.ABSENT as R));
  }
}
