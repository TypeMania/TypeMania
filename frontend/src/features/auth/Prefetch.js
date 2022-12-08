import { store } from '../../app/store'
import { userApiSlice } from '../users/userApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const user = store.dispatch(userApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            user.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch