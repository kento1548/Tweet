import {BaseListResponse, ListOwnerResponse} from "../../../types/lists";
import {Image, LoadingStatus} from "../../../types/common";

export interface ListState {
    list?: BaseListResponse;
    loadingState: LoadingStatus;
}

export interface EditListsRequest {
    id?: number;
    name?: string;
    listOwner: ListOwnerResponse;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: Image;
}
