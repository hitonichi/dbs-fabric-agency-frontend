import Link from 'next/link';
import React from 'react';

export default function SidebarLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <div>This is layout</div>
      <Link href="/api/auth/signout">Sign Out</Link>
      {children}
    </>
  );
}
