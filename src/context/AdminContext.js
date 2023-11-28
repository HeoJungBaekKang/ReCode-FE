import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import NoticeForm from '../components/Notice/NoticeForm';

function AdminContext() {
    const { user } = useContext(UserContext);

    if (user && user.role === 'ADMIN') {
        return <NoticeForm />;
    } else {
        return <p>접근 권한이 없습니다.</p>;
    }
}
