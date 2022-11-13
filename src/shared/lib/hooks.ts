import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import { useUserSelector } from "../../entities/user";
import { UserRoles } from "../../entities/user/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

function useInitialThunk<P = never>(thunk: AsyncThunk<P, void, any>): boolean;

function useInitialThunk<P = never, A = never>(
  thunk: AsyncThunk<P, A, any>,
  args: A
): boolean;

function useInitialThunk<P = never, A = never>(
  thunk: AsyncThunk<P, A, any> | AsyncThunk<P, never, any>,
  args?: A
) {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const promise = dispatch(thunk(args as A));
    promise.then((action) => {
      if (action.meta.requestStatus == "fulfilled") setPending(false);
    });

    return () => {
      promise.abort();
    };
  }, []);

  return pending;
}

const useUserAccess = () => {
  const user = useUserSelector();
  return user.role === UserRoles.admin;
};

export { useInitialThunk, useUserAccess };
