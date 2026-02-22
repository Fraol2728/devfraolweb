import { useSyncExternalStore } from "react";

type Listener = () => void;

type Setter<T> = (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void;
type Getter<T> = () => T;

export type UseBoundStore<T> = {
  (): T;
  <U>(selector: (state: T) => U): U;
  getState: Getter<T>;
  setState: Setter<T>;
  subscribe: (listener: Listener) => () => void;
};

export const create = <T extends Record<string, unknown>>(
  initializer: (set: Setter<T>, get: Getter<T>) => T,
): UseBoundStore<T> => {
  const listeners = new Set<Listener>();
  let state: T;

  const getState: Getter<T> = () => state;

  const setState: Setter<T> = (partial, replace = false) => {
    const partialState = typeof partial === "function" ? partial(state) : partial;
    state = (replace ? partialState : { ...state, ...partialState }) as T;
    listeners.forEach((listener) => listener());
  };

  state = initializer(setState, getState);

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function useStore<U>(selector?: (s: T) => U) {
    const pick = selector ?? ((s: T) => s as unknown as U);
    return useSyncExternalStore(subscribe, () => pick(state), () => pick(state));
  }

  (useStore as UseBoundStore<T>).getState = getState;
  (useStore as UseBoundStore<T>).setState = setState;
  (useStore as UseBoundStore<T>).subscribe = subscribe;

  return useStore as UseBoundStore<T>;
};
