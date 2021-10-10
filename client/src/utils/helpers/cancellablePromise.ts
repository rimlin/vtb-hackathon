import axios from 'axios';
import { useRef, useEffect } from 'react';

import { ApiErrorConstruction } from 'types/Request';

import { errorHandle } from './errorHandle';

export interface CancelablePromiseError {
  isCanceled: boolean;
}

interface CancelablePromise {
  promise: Promise<any>;
  cancel: () => void;
}

function makeCancelable(promise: Promise<any>): CancelablePromise {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val =>
        isCanceled ? reject({ isCanceled } as CancelablePromiseError) : resolve(val)
      )
      .catch(error =>
        isCanceled ? reject({ isCanceled } as CancelablePromiseError) : reject(error)
      );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export function useCancellablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true);

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error('promise wrapper argument must provide a cancel() function');
  }

  const promises = useRef<CancelablePromise[]>([]);

  useEffect(() => {
    return function cancel() {
      promises.current.forEach(p => p.cancel());
      promises.current = [];
    };
  }, []);

  function cancellablePromise<T extends any>(p: Promise<T>) {
    const cPromise = cancelable(p);
    promises.current.push(cPromise);
    return cPromise.promise as Promise<T>;
  }

  return { cancellablePromise };
}

export function handleCancellableApiError(
  callback: (error: ApiErrorConstruction) => any
): any {
  return (rawError: (ApiErrorConstruction & CancelablePromiseError) | any) => {
    if (
      rawError &&
      (rawError.isCanceled || rawError.isHandled || axios.isCancel(rawError))
    ) {
      return;
    }

    const error = errorHandle(rawError, rawError) as ApiErrorConstruction &
      CancelablePromiseError;

    callback(error);
  };
}
