'use client';

import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Button,
  Toolbar,
  Collapse,
} from '@mui/material';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, useState } from 'react';

const DRAWER_WIDTH = 240;

const routes = [
  {
    path: '/dashboard',
    Icon: () => <LogoutIcon />,
    label: 'Dashboard',
  },
  {
    path: '/profile',
    Icon: () => <LogoutIcon />,
    label: 'Profile',
  },
  {
    Icon: () => <LogoutIcon />,
    label: 'Transactions',
    items: [
      {
        path: '/transactions/create',
        label: 'Create',
      },
      {
        path: '/transactions/view',
        label: 'View',
      },
    ],
  },
];

interface SidebarItemProps {
  Icon?: () => ReactNode;
  label: string;
  path?: string;
  items?: { path: string; label: string }[];
}

const SidebarItem: FC<SidebarItemProps> = ({ Icon, label, path, items }) => {
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = useState<boolean>(false);

  const rootItem = (
    <Button fullWidth sx={{ padding: '0px' }} onClick={() => setOpen(!open)}>
      <div className="flex justify-between p-4 w-full text-white">
        <div className="flex gap-4">
          {Icon ? <Icon /> : <div className="ml-4"></div>}
          {path ? (
            <Link href={path}>
              <Typography variant="body1">{label}</Typography>
            </Link>
          ) : (
            <Typography variant="body1">{label}</Typography>
          )}
        </div>
        {isExpandable && open && <ExpandMoreIcon />}
        {isExpandable && !open && <ExpandLessIcon />}
      </div>
    </Button>
  );

  const childrenItems = isExpandable && (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider
        sx={{
          bgcolor: 'primary.dark',
        }}
      />
      {items.map((item, id) => (
        <SidebarItem {...item} key={id} />
      ))}
    </Collapse>
  );

  return (
    <>
      {rootItem}
      {childrenItems}
    </>
  );
};

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
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
          transition: 'none',
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        transitionDuration={{ enter: 0, exit: 0 }}
      >
        <div className="bg-slate-700 h-full ">
          <div className="flex p-4 gap-3 items-center justify-between ">
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              LOGO
            </Typography>
            <IconButton
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              edge="start"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </div>
          <Divider
            sx={{
              bgcolor: 'primary.dark',
            }}
          />
          <div className="flex p-4 gap-3 items-center justify-between ">
            <div className="flex flex-col gap-0 justify-center items-start text-white">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {session?.user?.name}
              </Typography>
              <Typography variant="body2">role</Typography>
            </div>
            <Link href="/api/auth/signout">
              <LogoutIcon className="text-white" />
            </Link>
          </div>
          <Divider
            sx={{
              bgcolor: 'primary.dark',
            }}
          />
          {routes.map((route, id) => (
            <SidebarItem {...route} key={id} />
          ))}
          <SidebarItem
            Icon={() => <LogoutIcon />}
            label="Hi there"
            items={[
              { label: 'hihi', path: 'hihi' },
              { label: 'haha', path: 'hihi' },
            ]}
          />
        </div>
      </Drawer>
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

{
  {
    /* <ul className="flex items-center justify-center gap-2 flex-1 flex-grow">
            {pages.map(({ path, label }) => {
              const linkStyle = pathname === path ? 'bg-orange-500' : '';
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={[
                      'p-2 rounded text-white hover:bg-orange-400',
                      linkStyle,
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul> */
  }

  {
    /* <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col gap-0 justify-center items-end text-white">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {session?.user?.name}
              </Typography>
              <Typography variant="body2">role</Typography>
            </div>
            <Link href="/api/auth/signout">
              <LogoutIcon className="text-white" />
            </Link>
          </div> */
  }

  /* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={path} onChange={(value) => }>
                <Tab />
            </Tabs>
            <Button
              sx={{
                my: 1,
                color: 'white',
                display: 'block',
                backgroundColor: 'red',
              }}
            >
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
            <Button sx={{ my: 1, color: 'white', display: 'block' }}>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
            <Button sx={{ my: 1, color: 'white', display: 'block' }}>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </Box> */
}
