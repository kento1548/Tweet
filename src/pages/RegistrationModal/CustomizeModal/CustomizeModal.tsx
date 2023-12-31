import React,{FC,ReactElement} from "react";
import {Button,Dialog,DialogContent,Link as MuiLink, Radio,Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useCustomizeModalStyles} from './CustomizeModalStyles';
import {useGlobalStyles} from '../../../util/globalClasses';
import {NEW_ACCOUNT_SETTINGS} from '../../../util/url';

interface CustomizeModalProps{
    open:boolean;
    onClose:()=>void;
    onOpenCreateAccount:(value:boolean | ((prevVar:boolean)=>boolean))=>void;
}

const CustomizeModal:FC<CustomizeModalProps> = ({open,onClose,onOpenCreateAccount}):ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useCustomizeModalStyles();

    return (
        <Dialog open={open}
                className={globalClasses.modalShadow}
                transitionDuration={0}
                onClose={onClose}
                aria-labelledby='form-dialog-title'
                hideBackdrop
                >
            <DialogContent style={{paddingTop:0, paddingBottom:0}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography variant={'h3'} component={'div'} className={classes.title}>
                    Customize your experience
                </Typography>
                <Typography component={'div'} className={classes.subtitle}>
                    Track where you see Twitter content across the web
                </Typography>
                <Typography variant={'subtitle1'} component={'div'} className={classes.title}>
                    Twitter uses this data to personalize your experience. This web browsing history will never be
                    stored with your name, email or phone number.
                </Typography>
                <Radio className={classes.radio} color='primary' checked/>
                <Typography variant={'body1'} component={'div'}>
                    {"For more details about these settings, visit the"}
                    <MuiLink href={NEW_ACCOUNT_SETTINGS} variant='body1' target='_blank' rel='noopener'>
                        Help Center
                    </MuiLink>
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button
                        onClick={() => onOpenCreateAccount(true)}
                        variant='contained'
                        color={'primary'}
                        size={'small'}
                        fullWidth
                        >
                        Next
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomizeModal;