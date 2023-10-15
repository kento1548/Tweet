import {
    AddChatMessageActionInterface,
    AddChatMessageWithTweetActionInterface, ChatMessagesActionsType,
    FetchChatMessagesActionInterface
} from "./contracts/actionTypes";
import {call, put, takeLatest} from "redux-saga/effects";
import {setChatMessages, setChatMessagesLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types/common";
import {AxiosResponse} from "axios";
import {ChatMessageResponse} from "../../types/chat";
import {ChatApi} from "../../../services/api/chatApi";

export function* fetchChatMessagesRequest({payload}:FetchChatMessagesActionInterface){
    try {
        yield put(setChatMessagesLoadingState(LoadingStatus.LOADING));
        const response:AxiosResponse<ChatMessageResponse[]> = yield call(ChatApi.getChatMessages,payload);
        yield put(setChatMessages(response.data));
    } catch (e) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageRequest({payload}:AddChatMessageActionInterface){
    try {
        yield put(setChatMessagesLoadingState(LoadingStatus.LOADING));
        yield call(ChatApi.addMessage,payload);
    } catch (e) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageWithTweetRequest({payload}:AddChatMessageWithTweetActionInterface){
    try {
        yield put(setChatMessagesLoadingState(LoadingStatus.LOADING));
        yield call(ChatApi.addMessageWithTweet,payload);
    } catch (e) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatMessagesSaga() {
    yield takeLatest(ChatMessagesActionsType.FETCH_CHAT_MESSAGES, fetchChatMessagesRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE, addChatMessageRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET, addChatMessageWithTweetRequest);
}
