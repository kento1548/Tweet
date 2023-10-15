import {
    AcceptFollowerRequestActionInterface,
    DeclineFollowerRequestActionInterface,
    FetchFollowerRequestsActionInterface,
    FollowerRequestsActionsType,
    ResetFollowerRequestsStateActionInterface,
    SetFollowerRequestsActionInterface,
    SetFollowerRequestsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {FollowerRequestsState} from "./contracts/state";
import {LoadingStatus, PageableResponse} from "../../types/common";
import {ProcessFollowRequestActionInterface, UserActionsType} from "../user/contracts/actionTypes";

export const setFollowerRequests = (payload : PageableResponse<FollowerRequestsState['items']>):SetFollowerRequestsActionInterface => ({
    type : FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
    payload
});

export const fetchFollowerRequests = (payload:number):FetchFollowerRequestsActionInterface => ({
    type : FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS,
    payload
});

export const acceptFollowRequest = (payload:number):AcceptFollowerRequestActionInterface => ({
    type : FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST,
    payload
});

export const declineFollowRequest = (payload:number):DeclineFollowerRequestActionInterface => ({
    type : FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST,
    payload
});

export const processFollowRequest = (payload:number):ProcessFollowRequestActionInterface => ({
    type : UserActionsType.PROCESS_FOLLOW_REQUEST,
    payload
});

export const setFollowerRequestsLoadingState = (payload:LoadingStatus):SetFollowerRequestsLoadingStateActionInterface => ({
    type : FollowerRequestsActionsType.SET_LOADING_STATE,
    payload
});

export const resetFollowerRequestsState = (): ResetFollowerRequestsStateActionInterface => ({
    type : FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE
});