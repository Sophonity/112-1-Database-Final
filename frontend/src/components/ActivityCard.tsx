'use client';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  FaRegClock,
  FaRegCalendar,
  FaRegUser,
  FaDollarSign,
  FaRegStar,
  FaReply,
} from 'react-icons/fa';
import { FaLocationCrosshairs, FaTag } from 'react-icons/fa6';
import { categories } from '@/components/navbar/Categories';
import { cn } from '@/lib/utils';
import type { ActivityData } from '@/lib/shared_types';

type Activity = ActivityData & {
  member_id: string;
  name: string;
};

type Comment = {
  comment: string;
  member_id: string;
  activity_id: string;
  score: number;
};

type ActivityCardProps = {
  activity: Activity | undefined;
  capacity: number | undefined;
  comments: Comment[] | undefined;
  status: () => string | undefined;
  rating: number | undefined;
  handleClick: () => void;
  identity: string | undefined;
  isLoading: boolean;
};

function formatDateTime(isoString: Date | undefined): string {
  if (!isoString) return '';
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的是 0-11，所以要加1
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year} 年 ${month} 月 ${day} 日 ${hour} 點 ${minute} 分`;
}

function getLabelByType(type: string | undefined): string {
  if (!type) return '';
  const category = categories.find((cat) => cat.type === type);
  return category ? category.label : '';
}

export default function ActivityCard({
  activity,
  capacity,
  rating,
  comments,
  status,
  handleClick,
  identity,
  isLoading,
}: ActivityCardProps) {
  const ButtonName = () => {
    if (identity === 'Host') return '刪除活動';
    if (identity === 'Participant') return '退出活動';
    if (identity === '') return '報名活動';
  };
  const disabled = () => {
    if (identity === 'Host') return false;
    if (identity === 'Participant' && (status() !== '已結束' || status() !== '已取消'))
      return false;
    if (identity === '' && status() === '註冊中') return false;
    return true;
  };
  return (
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">{activity?.title}</CardTitle>
        {/* <CardDescription className="text-gray-700 mt-2">{activity?.description}</CardDescription> */}
        <CardDescription className="text-gray-700 mt-2" content={activity?.description}></CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6 flex-grow">
        <div className="flex items-center space-x-3">
          <FaRegClock className="w-5 h-5 text-gray-700" />
          <span className="text-gray-600">狀態:</span>
          <Badge
            className={cn(
              'ml-2 text-gray-100',
              status() === '已結束' || status() === '已刪除' ? 'bg-red-500' : 'bg-green-500'
            )}
          >
            {status ? status() : ''}
          </Badge>
          {capacity && capacity === 0 && (
            <Badge className="ml-2 text-gray-100 bg-red-500">已額滿</Badge>
          )}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">註冊開始時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.register_start_timestamp)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">註冊結束時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.register_end_timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">活動開始時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.event_start_timestamp)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">活動結束時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.event_end_timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center space-x-3">
          <FaRegUser className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600">主持人:</span>
            <span className="ml-2 text-gray-900">{activity?.name}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaLocationCrosshairs className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">地點:</span>
              <span className="ml-2 text-gray-900">{activity?.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegUser className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">人數上限:</span>
              <span className="ml-2 text-gray-900">{activity?.capacity}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegUser className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">已報名人數:</span>
              <span className="ml-2 text-gray-900">{capacity ? capacity : 0}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaDollarSign className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">學生價:</span>
              <span className="ml-2 text-gray-900">{activity?.student_fee}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaDollarSign className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">非學生價:</span>
              <span className="ml-2 text-gray-900">{activity?.non_student_fee}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center space-x-3">
          <FaTag className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600">分類:</span>
            <span className="ml-2 text-gray-900"> {getLabelByType(activity?.activity_tag)}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaRegStar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">評分 :</span>
              <span className="ml-2 text-gray-900">{rating ? rating.toFixed(2) : 0} / 5</span>
            </div>
          </div>
          {comments?.map((comment, index) => {
            if (index >= 2) return;
            return (
              <div className="flex items-center space-x-3 mt-4" key={index}>
                <FaReply className="w-5 h-5 text-gray-700" />
                <div>
                  <span className="text-gray-600">評論:</span>
                  <span className="ml-2 text-gray-900">
                    {comment.comment ? comment.comment.slice(0, 25) + '...' : '目前沒有評論'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6">
        <Button
          className={cn(
            'w-full text-white',
            identity === 'Host' || identity === 'Participant'
              ? 'bg-red-500 hover:bg-red-700'
              : 'bg-blue-500 hover:bg-blue-700',
            disabled() ? 'opacity-50 cursor-not-allowed' : ''
          )}
          onClick={() => handleClick()}
          disabled={disabled() || isLoading}
        >
          {ButtonName()}
        </Button>
      </CardFooter>
    </Card>
  );
}
