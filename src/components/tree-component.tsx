'use client';

import { Input, Tree } from 'antd';

const { Search } = Input;

export default function TreeComponent() {
  const nodes = [
    {
      key: '0',
      title: 'Dashboard',
      data: 'Documents Folder',
      //   icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '1-0',
          title: 'UI Components',
          data: 'Sub Item 1',
          //   icon: 'pi pi-fw pi-inbox',
          // children: [
          //   {
          //     key: '1-0-0',
          //     title: 'Child Item 1',
          //     //   icon: 'pi pi-fw pi-inbox',
          //     data: 'Expenses Document',
          //   },
          // ],
        },
      ],
    },
  ];

  return (
    <>
      <Search className="mb-4 mt-4" placeholder="Search" />
      <Tree showLine defaultExpandedKeys={['0-0']} treeData={nodes} />
    </>
  );
}
