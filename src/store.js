import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
class VideoStore {
  duration = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setDuration(num) {
    this.duration = num;
  }
}

const StoreContext = createContext(new VideoStore());

const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { VideoStore, StoreProvider, useStore };
