import { Button, Collapse, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

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

export default SidebarItem;
