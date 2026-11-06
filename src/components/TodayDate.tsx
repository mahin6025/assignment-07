'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => { };

const getClientDate = () =>
    new Date().toLocaleDateString('bn-BD', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

const getServerDate = () => '';

const TodayDate = ({ className }: { className?: string }) => {
    const today = useSyncExternalStore(subscribe, getClientDate, getServerDate);

    return <span className={className}>{today}</span>;
};

export default TodayDate;