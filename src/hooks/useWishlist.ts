import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToWishlist, removeFromWishlist } from '@/redux/features/wishlist/wishlistSlice';

export const useWishlist = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.wishlist.items);

    const isInWishlist = (id: string) => items.includes(id);

    const toggleWishlist = (id: string) => {
        if (isInWishlist(id)) {
            dispatch(removeFromWishlist(id));
        } else {
            dispatch(addToWishlist(id));
        }
    };

    return { items, isInWishlist, toggleWishlist, addToWishlist: (id: string) => dispatch(addToWishlist(id)), removeFromWishlist: (id: string) => dispatch(removeFromWishlist(id)) };
};
