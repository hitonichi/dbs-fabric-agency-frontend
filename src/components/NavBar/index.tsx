'use client';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import Sidebar from '../Sidebar';
import { Session } from 'next-auth';

export default function NavBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/${pathname}`);
    },
  });

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleToggleDrawer = () => {
    console.log('toggling drawer');
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar sx={{ width: '100%' }}>
          {!openDrawer && (
            <>
              <IconButton
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon className="text-white" />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: 'white' }}
              >
                LOGO
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Sidebar
        open={openDrawer}
        handleToggleDrawer={handleToggleDrawer}
        session={session as Session}
      />
      <div
        className={`${
          openDrawer ? 'ml-[240px]' : ''
        } p-4 transition ease-in-out delay-150`}
      >
        {children}
      </div>
    </>
  );
}
