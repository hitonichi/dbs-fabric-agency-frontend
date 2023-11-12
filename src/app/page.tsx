import { getServerSession } from 'next-auth';
import SidebarLayout from './(withSidebar)/layout';
import { authOptions } from './api/auth/[...nextauth]/route';
import Switch from '@mui/material/Switch';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log('[INFO] got sssion', session);
  return (
    <>
      {session ? (
        <main>
          <div>This is homepage</div>
          <Switch />
          <SidebarLayout>{}</SidebarLayout>
        </main>
      ) : (
        <div>[INFO] not authenticated</div>
      )}
    </>
  );
}
