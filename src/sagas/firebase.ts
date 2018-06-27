import * as firebase from 'firebase';
import { eventChannel } from 'redux-saga'
import { take, put, takeEvery } from 'redux-saga/effects';
import { ActionType, UpdateChatLogAction } from '@/ducks/app';
import { ChatLogState } from '@/declare';

const config = {
  apiKey: 'AIzaSyCehnotAb2rl8TYfOl2MxSpZ5L4q0oP6Oc',
  authDomain: 'webchat-d27ea.firebaseapp.com',
  databaseURL: 'https://webchat-d27ea.firebaseio.com',
  projectId: 'webchat-d27ea',
  storageBucket: '',
  messagingSenderId: '739868784542',
};
firebase.initializeApp(config);
const db = firebase.database();
const chatRef = db.ref(`rooms/hoge/chat`);

// チャットログを購読する
const subscribeChannel = () => eventChannel(emmit => {
  const updateEvent = (snapshot: firebase.database.DataSnapshot) => {
    const chatLog = snapshot.val() as ChatLogState;
    emmit(chatLog);
  }
  chatRef.limitToLast(10).on('value', updateEvent);
  return () => {
    chatRef.off('value', updateEvent);
  }
})

// チャットログの変更を検知して更新をかける
export function* updateChat() {
  while (true) {
    const channel = yield takeEvery(subscribeChannel(), function* (action) {
      yield put(UpdateChatLogAction({ chatLog: action as ChatLogState }));
      return null;
    });
    yield take(ActionType.DisobserveChat);
    channel.close();
  }
}

// 送信する
export function* postChat() {
  while (true) {
    const action = yield take(ActionType.PostChatText);
    const name = '';
    const body = action.payload.text;
    if (body == '') continue;
    chatRef.push({ name, body });
  }
}
