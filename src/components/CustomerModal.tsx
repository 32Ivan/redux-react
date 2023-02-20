import { ICustomer } from './CustomerType';
import './CustomerModal.css';
import { useState } from 'react';

type Props = {
    onClose: () => void;
    data: ICustomer;
};

const CustomerModal = (props: Props) => {
    const [price, setPrice] = useState<any>('');

    const calculatePrice = async (city: string, dateOfBirth: any) => {
        const response = await fetch(`http://localhost:1066/cal/get/${city}/${dateOfBirth}`);
        const data = await response.json();
        setPrice(data.calculate);
    };

    const { onClose, data } = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h3>Customer Data</h3>
                <div>
                    <div>
                        <label>First Name : {data.name}</label>
                    </div>
                    <div>
                        <label>Last Name : {data.surname}</label>
                    </div>
                    <div>
                        <label>Email Add. : {data.email}</label>
                    </div>
                    <div>
                        <label>City : {data.city}</label>
                    </div>
                    <div>
                        <label>Date Of Birth : {new Date(data.dateOfBirth).toLocaleDateString()}</label>
                    </div>
                    <div>
                        <button className={'calculate-btn'} onClick={() => calculatePrice(data.city, data.dateOfBirth)}>
                            calculate the price
                        </button>
                        <p className={'price-list'}>Price is: {price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
