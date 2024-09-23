import { Navbar } from '@/components/navbar';
import QueryBuilder from '@/components/query-builder/query-builder';
import Head from 'next/head';
export default function QueryBuilderPage() {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <QueryBuilder />
    </div>
  );

}
