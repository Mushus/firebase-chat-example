import { actionCreatorFactory } from 'typescript-fsa';
import { upcastingReducer } from 'typescript-fsa-reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import app, { State, Props, Handlers } from '@/components/app';
import { State as RootState, ChatLogState } from '@/declare';

const actionCreator = actionCreatorFactory();

// payload

interface InputChatTextPayload {
  text: string;
}
interface PostChatTextPayload {
  text: string;
}
interface ObserveChatPayload {}
interface DisobserveChatPayload {}
interface UpdateChatLogPayload {
  chatLog: ChatLogState;
}

// actionType

export enum ActionType {
  // 入力中のテキストを変更する
  InputChatText = 'INPUT_CHAT_TEXT',
  // テキストを送信する
  PostChatText = 'POST_CHAT_TEXT',
  // チャットログを見る
  ObserveChat = 'OBSERVE_CHAT',
  // チャットログを見るのをやめる
  DisobserveChat = 'DISOBSERVE_CHAT',
  // チャットのログを更新する
  UpdateChatLog = 'UPDATE_CHAT_LOG',
}

// action

export const inputChatTextAction = actionCreator<InputChatTextPayload>(
  ActionType.InputChatText
);
export const postChatTextAction = actionCreator<PostChatTextPayload>(
  ActionType.PostChatText
);
export const ObserveChatAction = actionCreator<ObserveChatPayload>(
  ActionType.ObserveChat
);
export const DisobserveChatAction = actionCreator<DisobserveChatPayload>(
  ActionType.DisobserveChat
);
export const UpdateChatLogAction = actionCreator<UpdateChatLogPayload>(
  ActionType.UpdateChatLog
);

// handler

export const inputChatTextHandler = (
  state: RootState,
  { text }: InputChatTextPayload
): RootState => ({
  ...state,
  text,
});
export const UpdateChatLogHandler = (
  state: RootState,
  { chatLog }: UpdateChatLogPayload
): RootState => {
  return {
    ...state,
    chatLog,
  };
};

// reducer

export const reducer = upcastingReducer<RootState, RootState>()
  .case(inputChatTextAction, inputChatTextHandler)
  .case(UpdateChatLogAction, UpdateChatLogHandler);

const mapStateToProps = ({ text, chatLog }: RootState): Props => ({
  text,
  chatLog,
});
const mapDispatchToProps = (dispatch: Dispatch): Handlers => ({
  handleInputText: text => dispatch(inputChatTextAction({ text })),
  handlePostText: text => {
    dispatch(inputChatTextAction({ text: '' }))
    dispatch(postChatTextAction({ text }))
  },
});
export const App = connect<Props, Handlers, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(app);
