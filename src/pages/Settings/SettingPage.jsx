
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SettingPage.css';
import Holiday from '../../components/Settings/Holidays/Holiday';
import PenaltyPage from '../Penalties/PenaltyPage';
import BorrowLimit from '../../components/Settings/BorrowLimits/BorrowLimit';
import UsersPage from '../Users/UsersPage';

const SettingPage = () => {
    return (
        <div className='setting-page'>
            <Tabs>
                <TabList>
                    <Tab>Holidays</Tab>
                    <Tab>Borrowing Limits</Tab>
                    <Tab>Fines / Penalties</Tab>
                    <Tab>Librarians</Tab>
                </TabList>
            
                <TabPanel>
                    <Holiday/>
                </TabPanel>
                <TabPanel>
                    <BorrowLimit/>
                </TabPanel>
                <TabPanel>
                    <PenaltyPage/>
                </TabPanel>
                <TabPanel>
                    <UsersPage roleId={1} title='Librarian'/>,
                </TabPanel>
            </Tabs>
        </div>
     
    )
}

export default SettingPage