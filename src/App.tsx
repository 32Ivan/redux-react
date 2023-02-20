import { useEffect, useState } from 'react';
import EditCustomer from './components/EditCustomer';
import { ICustomer, PageEnum } from './components/CustomerType';
import CustomerList from './components/CustomerList';
import './App.css';
import AddCustomer from './components/AddCustomer';

const App = () => {
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as ICustomer);

    useEffect(() => {}, []);

    const onAddCustomerClickHnd = () => {
        setShownPage(PageEnum.add);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
    };

    const editCustomerData = (data: ICustomer) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(data);
    };

    return (
        <>
            <article className="article-header">
                <header>
                    <h1>CRUD Application</h1>
                </header>
            </article>

            <section className="section-content">
                {shownPage === PageEnum.list && (
                    <>
                        <input type="button" value="Add Customer" onClick={onAddCustomerClickHnd} className="add-customer-btn" />
                        <CustomerList onEdit={editCustomerData} />
                    </>
                )}

                {shownPage === PageEnum.add && <AddCustomer onBackBtnClickHnd={showListPage} />}

                {shownPage === PageEnum.edit && <EditCustomer data={dataToEdit} onBackBtnClickHnd={showListPage} />}
            </section>
        </>
    );
};

export default App;
