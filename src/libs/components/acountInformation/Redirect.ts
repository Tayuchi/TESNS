'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectIfNoUser = () => {
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');

    if (!userInfo) {
      router.push('/login');
    }
  }, [router]);
};

export default RedirectIfNoUser;
