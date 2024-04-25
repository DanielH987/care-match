"use client";

import React from 'react';
import { User } from "@prisma/client";
import UserBox from "./UserBox";
import Header from "@/app/components/Header";

interface UserListProps {
    items: User[];
}

const UserList: React.FC<UserListProps> = ({
    items,
}) => {

  return ( 
    <aside 
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        bg-[#FFF1EC]
        block w-full left-0
      "
    >
      <div className="px-5">
        <Header headerText="People" />
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}
 
export default UserList;
