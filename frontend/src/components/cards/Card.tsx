'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '../HeartButton';

import type { CardData } from '@/lib/shared_types';

interface CardProps {
  data: CardData;
  follow?: boolean;
}

const Card = ({ data, follow }: CardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/activity/main/${data.activity_id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-0 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-slate-400">
          {/* TODO: activity image src */}
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={'/images/placeholder_new.jpg'}
            alt="Listing"
            priority
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={data.activity_id} isFollow={follow} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-light text-neutral-500">{data.activity_tag}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data.student_fee}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
