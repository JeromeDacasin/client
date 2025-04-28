
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SettingPage.css';
import Holiday from '../../components/Settings/Holidays/Holiday';
import PenaltyPage from '../Penalties/PenaltyPage';
import BorrowLimit from '../../components/Settings/BorrowLimits/BorrowLimit';
import UsersPage from '../Users/UsersPage';
import RolePage from '../Roles/RolePage';
import { useAuth } from '../../context/AuthContext';
import DayToReturn from '../../components/Settings/DayToReturn/DayToReturn';

const SettingPage = () => {

    const { user } = useAuth();

    return (
        <div className="setting-page">
            <Tabs>
                <TabList>
                    <Tab>Holidays</Tab>
                    <Tab>Borrowing Limits</Tab>
                    <Tab>Fines / Penalties</Tab>
                    <Tab>Days to Return</Tab>
                    {user.user === 'Admin' && (
                        <>
                            <Tab>Librarians</Tab>
                            <Tab>Roles</Tab>
                        </>
                    )}
                </TabList>

                <TabPanel>
                    <Holiday />
                </TabPanel>
                <TabPanel>
                    <BorrowLimit />
                </TabPanel>
                <TabPanel>
                    <PenaltyPage />
                </TabPanel>
                <TabPanel>
                    <DayToReturn />
                </TabPanel>
                {user.user === 'Admin' && (
                    <>
                        <TabPanel>
                            <UsersPage roleId={1} title="Librarian" />
                        </TabPanel>
                        <TabPanel>
                            <RolePage />
                        </TabPanel>
                    </>
                )}
            </Tabs>
        </div>
     
    )
}

export default SettingPage