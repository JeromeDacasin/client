
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './SettingPage.css';
import Holiday from '../../components/Settings/Holidays/Holiday';
import PenaltyPage from '../Penalties/PenaltyPage';
import BorrowLimit from '../../components/Settings/BorrowLimits/BorrowLimit';

const SettingPage = () => {
    return (
        <div className='setting-page'>
            <Tabs>
                <TabList>
                    <Tab>Holidays</Tab>
                    <Tab>Borrowing Limits</Tab>
                    <Tab>Fines / Penalties</Tab>
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
            </Tabs>
        </div>
     
    )
}

export default SettingPage