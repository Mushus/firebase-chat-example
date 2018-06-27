export interface State {
  text: string;
  chatLog: ChatLogState;
}

export interface ChatLogState {
  [x: string]: {
    name: string;
    body: string;
  };
}

export const initialState: State = {
  text: '',
  chatLog: {},
};
