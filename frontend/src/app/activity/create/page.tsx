'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import axios from '@/lib/axios';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CardContent, Card } from '@/components/ui/card';

import { categories } from '@/components/navbar/Categories';
import clsx from 'clsx';

export default function Page() {
  const router = useRouter();
  const [topic, setTopic] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      event_start_timestamp: '',
      event_end_timestamp: '',
      location: '',
      capacity: 0,
      register_start_timestamp: '',
      register_end_timestamp: '',
      student_fee: 0,
      non_student_fee: 0,
      category: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.event_start_timestamp > data.event_end_timestamp) {
      toast.error('活動開始時間不得晚於活動結束時間');
      return;
    } else if (data.register_start_timestamp > data.register_end_timestamp) {
      toast.error('註冊開始時間不得晚於註冊結束時間');
      return;
    } else if (data.register_end_timestamp > data.event_start_timestamp) {
      toast.error('註冊結束時間不得晚於活動開始時間');
      return;
    } else if (data.non_student_fee < data.student_fee) {
      toast.error('非學生價不得低於學生價');
      return;
    } else if (data.register_start_timestamp < new Date().toISOString()) {
      toast.error('註冊開始時間不得早於現在時間');
      return;
    } else if (data.event_start_timestamp < new Date().toISOString()) {
      toast.error('活動開始時間不得早於現在時間');
      return;
    }

    // console.log("event_start_timestamp", data.event_start_timestamp);
    // console.log("event_start_timestamp type", typeof data.event_start_timestamp);
    // 媽的，是 string，UTC+8，e.g."2024-05-04T20:28"
    // 因為是 datetime-local 的 input，所以不會有時區資訊
    // 應該轉成標準型態的 string
    // 找到時區，塞進去
    // let fixedTime = new Date(data.event_start_timestamp).toISOString();
    // console.log("fixedTime", fixedTime);

    // 但不懂為何 deploy 之後會有問題，不都是 local 的 browser 嗎？

    // Time fixing
    data.event_start_timestamp = new Date(data.event_start_timestamp).toISOString();
    data.event_end_timestamp = new Date(data.event_end_timestamp).toISOString();
    data.register_start_timestamp = new Date(data.register_start_timestamp).toISOString();
    data.register_end_timestamp = new Date(data.register_end_timestamp).toISOString();
    // console.log("create", data);

    data = {
      ...data,
      category: topic,
      capacity: Number(data.capacity),
      student_fee: Number(data.student_fee),
      non_student_fee: Number(data.non_student_fee),
    };
    axios
      .post(`/activity`, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success('新增成功');
          router.push('/');
        }
      })
      .catch(() => {
        toast.error('新增失敗');
      });
  };

  return (
    <div className="mx-auto max-w-[850px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">新增活動</h1>
      </div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2 mt-2">
                <Label htmlFor="title">標題</Label>
                <Input
                  id="title"
                  placeholder="新增標題"
                  {...register('title')}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">活動的描述，記得要留下主揪的聯絡資訊喔！<br/></Label>
                <Label htmlFor="description">📢不知道怎麼辦出好活動嗎？讓揪團指引來幫忙！<br/></Label>
                <Link href="https://reurl.cc/vaEpxj" className="text-sm lg:text-lg text-sky-600 font-bold">
                  📌連結
                </Link>
                <Textarea
                  id="description"
                  placeholder="記得要留下主揪的聯絡資訊喔！"
                  {...register('description')}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-start">活動開始時間</Label>
                  <Input
                    id="event-start"
                    required
                    type="datetime-local"
                    {...register('event_start_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-end">活動結束時間</Label>
                  <Input
                    id="event-end"
                    required
                    type="datetime-local"
                    {...register('event_end_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">地點</Label>
                <Input
                  id="location"
                  placeholder="新增地點"
                  required
                  {...register('location')}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">人數，包含自己</Label>
                <Input
                  id="capacity"
                  placeholder="新增人數"
                  required
                  type="number"
                  {...register('capacity')}
                  disabled={isSubmitting}
                  min={1}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-start">註冊開始時間</Label>
                  <Input
                    id="register-start"
                    required
                    type="datetime-local"
                    {...register('register_start_timestamp')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-end">註冊結束時間</Label>
                  <Input
                    id="register-end"
                    required
                    type="datetime-local"
                    disabled={isSubmitting}
                    {...register('register_end_timestamp')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-fee">學生價</Label>
                  <Input
                    id="student-fee"
                    required
                    type="number"
                    {...register('student_fee')}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="non-student-fee">非學生價</Label>
                  <Input
                    id="non-student-fee"
                    required
                    type="number"
                    {...register('non_student_fee')}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">選擇類別</Label>
                <div className="flex flex-wrap gap-2" id="tags">
                  {categories.map(
                    (category) =>
                      category.type !== 'all' && (
                        <Badge
                          className={clsx(
                            `px-2 py-1 text-white rounded ${
                              topic === category.type ? 'bg-sky-600' : 'bg-gray-200 text-gray-800'
                            }`
                          )}
                          key={category.type}
                          onClick={() => setTopic(category.type)}
                          {...register('category')}
                        >
                          {category.label}
                        </Badge>
                      )
                  )}
                </div>
              </div>
              <Button className="w-full" type="submit">
                新增活動
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
