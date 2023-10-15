import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import ProfilePictureModal from "./ProfilePictureModal/ProfilePictureModal";
import ProfileHeaderModal from "./ProfileHeaderModal/ProfileHeaderModal";
import {ImageObj} from "../../components/AddTweetForm/AddTweetForm";
import ProfileDescriptionModal from "./ProfileDescriptionModal/ProfileDescriptionModal";
import ProfileUpdatedModal from "./ProfileUpdatedModal/ProfileUpdatedModal";
import {Image} from "../../store/types/common";
import {uploadImage} from "../../util/uploadImage";
import {
    selectUserProfileLocation,
    selectUserProfileUsername,
    selectUserProfileWebsite
} from "../../store/ducks/user/selectors";
import {updatedUserData} from "../../store/ducks/user/actionCreators";
import {useSetupProfileModalStyles} from "./SetupProfileModalStyles";

interface SetupProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

const SetupProfileModal: FC<SetupProfileModalProps> = ({visible, onClose}): ReactElement => {
    const classes = useSetupProfileModalStyles();
    const dispatch = useDispatch();
    const username = useSelector(selectUserProfileUsername);
    const location = useSelector(selectUserProfileLocation);
    const website = useSelector(selectUserProfileWebsite);
    const [visibleProfileHeaderModal, setVisibleProfileHeaderModal] = React.useState<boolean>(false);
    const [visibleProfileDescriptionModal, setVisibleProfileDescriptionModal] = React.useState<boolean>(false);
    const [visibleProfileUpdatedModal, setVisibleProfileUpdatedModal] = React.useState<boolean>(false);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [bio, setBio] = useState<string>("");

    const handleCloseModal = (): void => {
        setVisibleProfileHeaderModal(false);
        setVisibleProfileDescriptionModal(false);
        setVisibleProfileUpdatedModal(false);
        onClose();
    };

    const onSubmit = async () => {
        let avatarResponse: Image | undefined = undefined;
        let wallpaperResponse: Image | undefined = undefined;

        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(updatedUserData({
            username: username!,
            location: location!,
            website: website!,
            avatar: avatarResponse!,
            wallpaper: wallpaperResponse!,
            about: bio
        }));
        handleCloseModal();
    };

    return (
        <div className={classes.container}>
            <ProfilePictureModal
                open={visible}
                onClose={handleCloseModal}
                avatar={avatar}
                onChangeAvatar={setAvatar}
                onOpenProfileHeaderModal={setVisibleProfileHeaderModal}
            />
            <ProfileHeaderModal
                open={visibleProfileHeaderModal}
                avatar={avatar}
                wallpaper={wallpaper}
                onChangeWallpaper={setWallpaper}
                onClose={handleCloseModal}
                onOpenProfileDescriptionModal={setVisibleProfileDescriptionModal}
            />
            <ProfileDescriptionModal
                open={visibleProfileDescriptionModal}
                onClose={handleCloseModal}
                text={bio}
                onChangeText={setBio}
                onOpenProfileUpdatedModal={setVisibleProfileUpdatedModal}
            />
            <ProfileUpdatedModal
                open={visibleProfileUpdatedModal}
                onClose={handleCloseModal}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default SetupProfileModal;
