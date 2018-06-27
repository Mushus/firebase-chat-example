import { fork, put } from 'redux-saga/effects';
import { updateChat, postChat } from '@/sagas/firebase';
import { ObserveChatAction } from '@/ducks/app';

export default function* rootSaga() {
  yield fork(updateChat);
  yield fork(postChat);
  yield put(ObserveChatAction({}));
}
