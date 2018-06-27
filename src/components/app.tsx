import * as React from 'react';
import { ChatLogState } from '@/declare';

export interface Props {
  text: string
  chatLog: ChatLogState
}

export interface Handlers {
  handleInputText: (text: string) => void
  handlePostText: (text: string) => void
}

export type State = Props & Handlers;

export default (state: State) => (
  <div>
    <input type="text" onChange={e => state.handleInputText(e.target.value)} value={state.text} />
    <button onClick={() => state.handlePostText(state.text)}>incrent</button>
    {
      Object.entries(state.chatLog).reverse().map(v => (
        <div key={v[0]}>
          <span>{v[1].name}</span>
          <span>{v[1].body}</span>
        </div>
      ))
    }
  </div>
);
