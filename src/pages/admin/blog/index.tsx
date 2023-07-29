import React, { ReactElement } from 'react';
import Pagination from '../../../components/Pagination';
import PostPreview from '../../../components/PostPreview';
import Section from '../../../components/Section';
import { getLayout } from '../../../components/AdminLayout';
import { usePost } from '../../../hooks';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {}

export default function BlogPage({}: Props): ReactElement {
  const router = useRouter();
  const { pageNum = 1, pageSize = 20 } = router.query;
  const { data: res, mutate } = usePost(+pageNum, +pageSize);
  const { data, total } = res || { data: [], total: 0 };

  const handlePageChange = (current: number, pageSize: number) => {
    router.push({
      pathname: '/admin/blog',
      query: {
        pageSize,
        pageNum: current,
      },
    });
  };
  const AddButton = (
    <Link href="/admin/blog/create">
      <a>
        <button className="btn btn-primary">写文章</button>
      </a>
    </Link>
  );

  return (
    <div>
      <Section extra={AddButton} title="全部文章" id="blog">
        <ul className="flex flex-col mt-20 space-y-12">
          {data.map((post) => (
            <li key={post.id}>
              <PostPreview reload={mutate} editable post={post} />
            </li>
          ))}
        </ul>
      </Section>
      <Pagination
        pageSize={+pageSize}
        onChange={handlePageChange}
        current={+pageNum}
        total={total}
      />
    </div>
  );
}
BlogPage.getLayout = getLayout;
