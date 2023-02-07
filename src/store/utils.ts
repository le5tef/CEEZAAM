// @ts-nocheck
import type {
  _GettersTree,
  DefineStoreOptions,
  Pinia,
  StateTree,
  Store,
  StoreDefinition,
} from 'pinia'
import { defineStore } from 'pinia'

export const storeInitIfNeed = (store: Store) => {
  if (store.init && !store.isInitInProgress && !store.ready) {
    store.init()
  }
  return store
}

export const storeResetAndInit = (store: Store) => {
  store.$reset()
  storeInitIfNeed(store)
}

export function defineAutoInitStore<
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A
>(id: Id, options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>): StoreDefinition<Id, S, G, A> {
  const useStore = defineStore(id, options)
  const storeDefinition = (pinia?: Pinia | null) => {
    let store = useStore(pinia)
    store = storeInitIfNeed(store)
    store.$id = id
    return store
  }
  storeDefinition.$id = id
  return storeDefinition
}
