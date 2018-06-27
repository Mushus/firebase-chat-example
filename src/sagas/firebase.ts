import * as firebase from 'firebase';
import { eventChannel } from 'redux-saga'
import { take, call, takeEvery } from 'redux-saga/effects';
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

// 購読する
const subscribeChannel = () => eventChannel(emmit => {
  const updateEvent = (snapshot: firebase.database.DataSnapshot) => {
    const chatLog = snapshot.val() as ChatLogState;
    // eslint-disable-next-line no-console
    console.log(chatLog);
    emmit(chatLog);
  }
  chatRef.on('value', updateEvent);
  return () => {
    chatRef.off('value', updateEvent);
  }
})

export function* updateChat() {
  while (true) {
    yield takeEvery(ActionType.ObserveChat, function* (action) {
      return null;
    });
    const channel = yield call(subscribeChannel)
    yield take(ActionType.DisobserveChat);
    channel.close();
  }
}
export function* postChat() {
  while (true) {
    const action = yield take(ActionType.PostChatText);
    const name = '';
    const body = action.payload.text;
    if (body == '') continue;
    chatRef.push({ name, body });
  }
}
