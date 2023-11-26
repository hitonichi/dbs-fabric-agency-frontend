import { Divider, Drawer, IconButton, Typography } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactoryIcon from '@mui/icons-material/Factory';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import ListAltIcon from '@mui/icons-material/ListAlt';
import YardIcon from '@mui/icons-material/Yard';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

import SidebarItem from './SidebarItem';
import { DRAWER_WIDTH, roleAsString } from './constants';
import { MouseEventHandler } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';

interface SidebarProps {
  open: boolean;
  session: Session;
  handleToggleDrawer: MouseEventHandler<HTMLButtonElement>;
}

export const ROUTES = {
  operationStaff: [
    {
      path: '/dashboard',
      Icon: () => <DashboardIcon />,
      label: 'Dashboard',
    },

    {
      Icon: () => <ReceiptIcon />,
      label: 'Transactions',
      items: [
        {
          path: '/transactions/create',
          label: 'Create',
        },
        {
          path: '/transactions',
          label: 'View',
        },
      ],
    },
    // TODO: Separate between customer order & staff one
    {
      Icon: () => <ListAltIcon />,
      label: 'Orders',
      items: [
        {
          path: '/orders',
          label: 'View',
        },
        {
          path: '/orders/create',
          label: 'Create',
        },
      ],
    },
  ],
  partnerStaff: [
    {
      path: '/dashboard',
      Icon: () => <DashboardIcon />,
      label: 'Dashboard',
    },
    {
      path: '/suppliers',
      Icon: () => <FactoryIcon />,
      label: 'Suppliers',
    },
    {
      Icon: () => <YardIcon />,
      label: 'Fabric',
      items: [
        {
          path: '/fabric',
          label: 'View',
        },
        {
          path: '/fabric/import',
          label: 'Import',
        },
      ],
    },
  ],
  officeStaff: [
    {
      path: '/customers',
      Icon: () => <GroupsIcon />,
      label: 'Customers',
    },
  ],
  customer: [
    // {
    //   path: '/profile',
    //   Icon: () => <AccountBoxIcon />,
    //   label: 'Profile',
    // },
    {
      Icon: () => <ListAltIcon />,
      label: 'Orders',
      items: [
        {
          path: '/orders',
          label: 'View',
        },
        {
          path: '/orders/create',
          label: 'Create',
        },
      ],
    },
  ],
  manager: [
    {
      Icon: () => <FactoryIcon />,
      label: 'Suppliers',
      items: [
        {
          path: '/suppliers',
          label: 'Search',
        },
        {
          path: '/suppliers/add',
          label: 'Add',
        },
      ],
    },
    {
      path: '/imports',
      Icon: () => <DirectionsBoatIcon />,
      label: 'Imports',
    },
    {
      path: '/fabric',
      Icon: () => <YardIcon />,
      label: 'Fabric Browse',
    },
    {
      path: '/orders',
      Icon: () => <ListAltIcon />,
      label: 'Orders',
    },
  ],
};

export default function Sidebar({
  open,
  session,
  handleToggleDrawer,
}: SidebarProps) {
  const availableRoutes = ROUTES[session?.user?.roles];

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'unset',
        },
        transition: 'none',
      }}
      variant="persistent"
      anchor="left"
      open={open}
      transitionDuration={{ enter: 0, exit: 0 }}
    >
      <div className="bg-slate-700 h-full ">
        <div className="flex p-4 gap-3 items-center justify-between h-[64px]">
          <Link href="/">
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              LOGO
            </Typography>
          </Link>
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
            <Typography variant="body2">
              {roleAsString[session?.user?.roles[0]]}
            </Typography>
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
        {availableRoutes?.map((route, id) => (
          <SidebarItem {...route} key={id} />
        ))}
      </div>
    </Drawer>
  );
}
