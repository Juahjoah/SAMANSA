import { atom } from 'recoil'

const todoListState = atom({
  key: 'Todos',
  default: ['값이 없어요.'],
})

export { todoListState }
