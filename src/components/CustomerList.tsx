import { useEffect, useState } from 'react';
import { ICustomer } from './CustomerType';
import CustomerModal from './CustomerModal';
import { deleteCustomers, fetchCustomers } from '../store/features/customerSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import './CustomerList.css';

type Props = {
    onEdit: (data: ICustomer) => void;
};

const CustomerList = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

    const data = useAppSelector((state) => state.customer.customers);

    const dispatch = useAppDispatch();
    const { onEdit } = props;

    const deleteCustomer = (id: string) => {
        dispatch(deleteCustomers(id));
        setDeleted((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [deleted, dispatch]);

    const handleViewCustomer = (customer: ICustomer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <h3 className="list-header">Customer List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Date of Birth</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((customer: any, index: number) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.surname}</td>
                                <td>{customer.email}</td>
                                <td>{customer.city}</td>
                                <td>{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                                <td>
                                    <div className="td-buttons">
                                        <button className={'button1'} onClick={() => handleViewCustomer(customer)}>
                                            View
                                        </button>
                                        <button className={'button2'} onClick={() => onEdit(customer)}>
                                            Edit
                                        </button>
                                        <button className={'button3'} onClick={() => deleteCustomer(customer._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showModal && selectedCustomer !== null && <CustomerModal onClose={handleCloseModal} data={selectedCustomer} />}
        </div>
    );
};

export default CustomerList;
