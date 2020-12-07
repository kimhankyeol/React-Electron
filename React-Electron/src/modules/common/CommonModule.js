import { takeEvery , getContext } from 'redux-saga/effects';

//액션타입 경로이동
//path 경로에 맞게
const GOTO_PATH = 'go/GOTO_PATH';

export const goToPath = (path) => ({type: GOTO_PATH,payload:{path:path}});

function* goToPathSaga(action) {
    const history = yield getContext('history');
    yield history.push(action.payload.path);
}


export function* CommonsSaga() {
    yield takeEvery(GOTO_PATH,goToPathSaga);
}
