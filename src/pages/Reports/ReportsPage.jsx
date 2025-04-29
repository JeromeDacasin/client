
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BorrowLimit from '../../components/Settings/BorrowLimits/BorrowLimit';
import { useAuth } from '../../context/AuthContext';

import BorrowerReport from '../../components/Reports/BorrowerReport/BorrowerReport';

const ReportsPage = () => {

    return (
        <div className="setting-page">
            <Tabs>
                <TabList>
                    <Tab>Borrowers</Tab>
                  
                </TabList>

                <TabPanel>
                    <BorrowerReport />
                </TabPanel>
              
            </Tabs>
        </div>
     
    )
}

export default ReportsPage