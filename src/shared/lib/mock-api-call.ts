type MockApiCall = <F extends (...params: any[]) => any>(
  fn: F
) => (...params: Parameters<F>) => Promise<ReturnType<F>>;

export const mockApiCall: MockApiCall =
  (fn) =>
  (...params: Parameters<typeof fn>) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(fn(...params));
      }, 500)
    );
