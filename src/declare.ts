export interface State {
  text: string;
  chatLog: ChatLogState;
}

export interface LogEntity {
  name: string;
  body: string;
}

export interface ChatLogState {
  [x: string]: LogEntity;
}

export const initialState: State = {
  text: '',
  chatLog: {},
};
