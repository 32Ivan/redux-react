import { useEffect, useState } from 'react';
import { ICustomer } from './CustomerType';
import DatePicker from 'react-date-picker';
import './CustomerForm.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchPrice } from '../store/features/priceSlice';

type Props = {
    data: ICustomer;
    onBackBtnClickHnd: () => void;
};

const EditCustomer = (props: Props) => {
    const { data, onBackBtnClickHnd } = props;
    const [firstName, setFirstName] = useState(data.name);
    const [lastName, setLastName] = useState(data.surname);
    const [email, setEmail] = useState(data.email);
    const [city, setCity] = useState(data.city);
    const [dateOfBirth, setDateOfBirth] = useState(data.dateOfBirth);
    const priceCity = useAppSelector((state) => state.price.price);

    const dispatch = useAppDispatch();

    const capitalizeWords = (str: string) => {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        dispatch(fetchPrice());
    }, [dispatch]);

    const onSubmitBtnClickHnd = (e: any) => {
        e.preventDefault();

        axios
            .patch(`http://localhost:1066/customers/update/${data._id}`, {
                name: firstName,
                surname: lastName,
                email: email,
                city: city,
                dateOfBirth: dateOfBirth
            })
            .then(() => {
                onBackBtnClickHnd();
            })
            .catch((error: { response: any; request: any }) => {
                if (error.response) {
                    console.log(error.response);
                    console.log('server responded');
                } else if (error.request) {
                    console.log('network error');
                } else {
                    console.log(error);
                }
            });
    };
    const onChange = (date: Date) => {
        typeof date === 'string' ? setDateOfBirth(new Date(date)) : setDateOfBirth(date);
    };

    return (
        <div className="form-container">
            <div>
                <h3>Add Customer Form</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div>
                    <label>First Name : </label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(capitalizeWords(e.target.value))} required />
                </div>
                <div>
                    <label>Last Name : </label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(capitalizeWords(e.target.value))} required />
                </div>
                <div>
                    <label>Email Add : </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={'select-city'}>
                    <label className="form-label select-label">Example label</label>
                    <select className="select" id="citi" onChange={(e) => setCity(e.target.value)} value={city}>
                        {priceCity.map((c, index) => (
                            <option className={'dropdown'} value={c.city} key={index}>
                                {c.city}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date Of Birth : </label>
                    <DatePicker className="myMenuClassName" onChange={onChange} value={new Date(dateOfBirth)} required />
                </div>
                <div>
                    <input type="button" disabled={firstName.length === 0 || lastName.length === 0 || email.length === 0 || city.length === 0} value="Back" onClick={onBackBtnClickHnd} />
                    <input type="submit" value="Update Customer" />
                </div>
            </form>
        </div>
    );
};

export default EditCustomer;
