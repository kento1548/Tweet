import React,{ChangeEvent,FC,ReactElement,useState} from "react";
import {Route,useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import {useNotificationsStyles} from './NotificationsStyles';
import {useGlobalStyles} from "../../util/globalClasses";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import {NOTIFICATION, NOTIFICATIONS, NOTIFICATIONS_MENTIONS} from "../../util/pathConstants";
import NotificationsPage from './NotificationsPage/NotificationsPage';
import MentionsPage from './MentionsPage/MentionsPage';

const Notifications: FC = (): ReactElement => {
    const classes = useNotificationsStyles();
    const globalClasses = useGlobalStyles();
    const history = useHistory();
    const [activeTab,setActiveTab] = useState<number>(0);

    const handleChangeTab = (event:ChangeEvent<{}>,newValue:number): void => {
        if(newValue === 0){
            history.push(NOTIFICATIONS);
        } else {
            history.push(NOTIFICATIONS_MENTIONS);
        }
        setActiveTab(newValue);
    };

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant={'outlined'}>
            <Paper className={classnames(globalClasses.pageHeader,classes.header)}>
                <div className={globalClasses.pageHeaderTitleWrapper}>
                    <Typography variant={'h5'}>
                        Notifications
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor={'primary'} textColor={'primary'} onChange={handleChangeTab}>
                        <Tab className={classes.tab} label={'All'}/>
                        <Tab className={classes.tab} label={'Mentions'}/>
                    </Tabs>
                </div>
                <Route exact path={NOTIFICATION} component={NotificationsPage}/>
                <Route exact path={NOTIFICATIONS_MENTIONS} component={MentionsPage}/>
            </div>
        </Paper>
    )
}

export default withDocumentTitle(Notifications)("Notifications");