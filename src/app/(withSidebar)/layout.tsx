'use client';

import NavBar from '../../components/NavBar';

export default function SidebarLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <div>
        <NavBar>{children}</NavBar>
        {/* <div className=" h-[calc(100vh-60px)]">
          <div>This is layout</div>
          <Link component={NextLink} href="/api/auth/signout">
            Sign Out
          </Link>
          <Button>
            <NextLink href="/api/auth/signout">Sign Out</NextLink>
          </Button>
          {children}
        </div> */}
      </div>
    </>
  );
}
