import { Helmet } from 'react-helmet-async';
import React from 'react';

type PageProps = {
  children: React.ReactNode;
  title: string;
};

const Page = ({ children, title }: PageProps) => (
  <>
    <Helmet>
      {/* <title>{`Undefine | ${title}`}</title> */}
      {/* <title>{title}</title> */}
    </Helmet>
    {children}
  </>
);

export default Page;
