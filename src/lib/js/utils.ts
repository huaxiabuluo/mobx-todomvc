import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export interface IContext2Use {
  [storeName: string]: any,
}

export const useInject = (cb: (s: IContext2Use) => any) => {
  const rootStore: IContext2Use = useContext(MobXProviderContext);
  return cb(rootStore);
}
