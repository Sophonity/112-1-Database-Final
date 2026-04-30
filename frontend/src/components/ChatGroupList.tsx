'use client';

import { ChatgroupData } from '@/lib/shared_types';
import Link from 'next/link';

const ChatGroupList = ({ data }: { data: ChatgroupData }) => {
  return (
    <div>
      <p>ChatGroupList</p>
      <Link href={`/chatroom/${data.chatgroup_id}`}>{data.chatname}</Link>
    </div>
    // <>
    //   <Link href={`/chatroom/${data.chatgroup_id}`}>{data.chatname}</Link>
    // </>
  );
};

export default ChatGroupList;
