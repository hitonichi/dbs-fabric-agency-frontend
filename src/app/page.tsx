import { getServerSession } from 'next-auth';
import SidebarLayout from './(withSidebar)/layout';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log('[INFO] got sssion', session);
  return (
    <>
      {session ? (
        <main>
          <SidebarLayout>
            {
              <>
                <div>This is homepage</div>
              </>
            }
          </SidebarLayout>
        </main>
      ) : (
        <div>[INFO] not authenticated</div>
      )}
    </>
  );
}
