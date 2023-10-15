import {call, put,takeLatest} from 'redux-saga/effects';

import {
    setListMembers,
    setListSuggested,
    setLoadingMembersState,
    setLoadingSuggestedState,
    setUserToList
} from './actionCreators';
import {
    FetchListFollowersActionInterface,
    FetchListMembersActionInterface,
    FetchListMembersByUsernameActionInterface, ListMembersActionsType,
    ProcessUserToListMembersActionInterface
} from './contracts/actionTypes';
import {LoadingStatus} from "../../types/common";
import {AxiosResponse} from "axios";
import {ListsOwnerMemberResponse} from "../../types/lists";
import {ListsApi} from "../../../services/api/listsApi";
import {setLoadingState} from "../lists/actionCreators";
import {setMembersSize} from "../list/actionCreators";

export function* fetchListMembersRequest({payload}:FetchListMembersActionInterface){
    try {
        yield put(setLoadingMembersState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListsOwnerMemberResponse[]> = yield call(ListsApi.getListMembers,payload.listId,payload.listOwnerId);
        yield put(setListMembers(response.data));
    } catch (error) {
        yield put(setLoadingMembersState(LoadingStatus.ERROR));
    }
}

export function* fetchListFollowersRequest({payload}:FetchListFollowersActionInterface){
    try {
        yield put(setLoadingMembersState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListsOwnerMemberResponse[]> = yield call(ListsApi.getListFollowers,payload.listId,payload.listOwnerId);
        yield put(setListMembers(response.data));
    } catch (e) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchListMembersByUsernameRequest({payload}:FetchListMembersByUsernameActionInterface){
    try {
        yield put(setLoadingMembersState(LoadingStatus.LOADING));
        const response: AxiosResponse<ListsOwnerMemberResponse[]> = yield call(ListsApi.searchListMembersByUsername,payload.listId,payload.username);
        yield put(setListSuggested(response.data));
    } catch (e) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* processListMemberRequest({payload}:ProcessUserToListMembersActionInterface){
    try {
        yield put(setLoadingSuggestedState(LoadingStatus.LOADING));
        const {data}: AxiosResponse<boolean> = yield call(ListsApi.addUserToList,payload.userId,payload.listId);
        yield put(setUserToList({userId:payload.userId, isUserAdded:data,isSuggested:payload.isSuggested}));
        yield put(setMembersSize(data));
    } catch (e) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* listMembersSaga() {
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS, fetchListMembersRequest);
    yield takeLatest(ListMembersActionsType.FETCH_LIST_FOLLOWERS, fetchListFollowersRequest);
    yield takeLatest(ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME, fetchListMembersByUsernameRequest);
    yield takeLatest(ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS, processListMemberRequest);
}
