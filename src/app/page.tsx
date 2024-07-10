import React from 'react';

import Login from '@/components/auth/login';
import Dashboard from './dashboard/page';
import RootLayout from './dashboard/layout';

// export default function LoginPage() {
//   return <Login />;
// }
import {redirect} from 'next/navigation';

export default function IndexPage() {
  redirect('/login');
}