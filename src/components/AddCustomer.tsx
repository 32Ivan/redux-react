import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import './CustomerForm.css';
import DatePicker from 'react-date-picker';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchPrice } from '../store/features/priceSlice';
import { saveCustomer } from '../store/features/customerSlice';

type Props = {
    onBackBtnClickHnd: () => void;
};

const AddCustomer = (props: Props) => {
    const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCityName] = useState('other');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const { onBackBtnClickHnd } = props;

    const priceCity = useAppSelector((state) => state.price.price);

    const dispatch = useAppDispatch();

    const capitalizeWords = (str: string) => {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const onSubmitBtnClickHnd = (e: any) => {
        e.preventDefault();
        dispatch(saveCustomer({ name, surname, city, email, dateOfBirth }));
        onBackBtnClickHnd();
    };

    const onChange = (date: Date) => {
        setDateOfBirth(date);
    };

    useEffect(() => {
        dispatch(fetchPrice());
    }, [dispatch]);

    return (
        <div className="form-container">
            <div>
                <h3>Add Customer Form</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div>
                    <label>First Name : </label>
                    <input type="text" value={name} onChange={(e) => setFirstName(capitalizeWords(e.target.value))} required />
                </div>
                <div>
                    <label>Last Name : </label>
                    <input type="text" value={surname} onChange={(e) => setLastName(capitalizeWords(e.target.value))} required />
                </div>
                <div>
                    <label>Email Add : </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={'select-city'}>
                    <label className="form-label select-label">Example label</label>
                    <select className="select" id="citi" value={city} onChange={(e) => setCityName(e.target.value)}>
                        {priceCity.map((c, index) => (
                            <option className={'dropdown'} value={c.city} key={index}>
                                {c.city}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date Of Birth : </label>
                    <DatePicker onChange={onChange} value={dateOfBirth} required />
                </div>
                <div>
                    <input type="button" value="Back" onClick={onBackBtnClickHnd} />
                    <input type="submit" value="Add ustomer" />
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;
