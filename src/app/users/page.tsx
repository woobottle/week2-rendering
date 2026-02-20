import { Suspense } from "react";
import RecentPosts from "./_components/RecentPosts";
import Statistics from "./_components/Statistics";
import UserList from "./_components/UserList";

export default function UsersPage() {
  return (
    <div>
      <h1>사용자 목록</h1>

      {/* 빠르게 로드되는 섹션 */}
      <Suspense fallback={<div>사용자 목록 로딩 중...</div>}>
        <UserList /> {/* /users fetch */}
      </Suspense>

      {/* 느리게 로드되는 섹션 (3초 지연) */}
      <Suspense fallback={<div>최근 게시글 로딩 중...</div>}>
        <RecentPosts /> {/* /posts?_limit=5 fetch + 3초 delay */}
      </Suspense>

      {/* 매우 느리게 로드되는 섹션 (5초 지연) */}
      <Suspense fallback={<div>통계 데이터 로딩 중...</div>}>
        <Statistics /> {/* /comments?_limit=1 fetch + 5초 delay */}
      </Suspense>
    </div>
  );
}
