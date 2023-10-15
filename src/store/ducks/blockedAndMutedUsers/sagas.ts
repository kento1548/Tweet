import {
    BlockedAndMutedUsersActionsType,
    FetchBlockedUsersActionInterface,
    FetchMutedUsersActionInterface
} from "./contracts/actionTypes";
import {call, put, takeLatest} from "redux-saga/effects";
import {setBlockedAndMutedUsersLoadingState, setBlockedUsers, setMutedUsers} from "./actionCreators";
import {LoadingStatus} from "../../types/common";
import {AxiosResponse} from "axios";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";

export function* fetchBlockedUsersRequest({payload}:FetchBlockedUsersActionInterface){
    try {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<Array<BlockedUserResponse>> = yield call(UserApi.getBlockList,payload);
        yield put(setBlockedUsers({
            items:response.data,
            pagesCount:parseInt(response.headers['page-total-count'])
        }));
    } catch (e) {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchMutedUsersRequest({payload}:FetchMutedUsersActionInterface){
    try {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.LOADING));
        const response:AxiosResponse<Array<MutedUserResponse>> = yield call(UserApi.getMutedList,payload);
        yield put(setMutedUsers({
            items:response.data,
            pagesCount:parseInt(response.headers['page-total-count'])
        }));
    } catch (e) {
        yield put(setBlockedAndMutedUsersLoadingState(LoadingStatus.ERROR));
    }
}

export function* blockedAndMutedUsersSaga() {
    yield takeLatest(BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS, fetchBlockedUsersRequest);
    yield takeLatest(BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS, fetchMutedUsersRequest);
}