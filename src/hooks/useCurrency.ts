import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrency as setCurrencyAction } from '@/redux/features/currency/currencySlice';

export const useCurrency = () => {
    const dispatch = useDispatch();
    const { currency, rate } = useSelector((state: RootState) => state.currency);

    const setCurrency = (c: 'USD' | 'EUR' | 'GBP' | 'BDT') => dispatch(setCurrencyAction(c));

    const formatPrice = (price: number) => {
        const amount = price * rate;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    return { currency, rate, setCurrency, formatPrice };
};
