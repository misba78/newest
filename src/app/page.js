'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  
  // 현재 주차 계산 (간단 예시)
  const currentWeek = "2026-W02"; 

  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  const fetchPosts = async () => {
    // users 테이블 정보까지 조인해서 가져오기
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(name, avatar_url)')
      .eq('week_label', currentWeek)
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
  };

  const handleLogin = async () => {
    // 카카오 로그인 예시 (Supabase Auth 설정 필요)
    await supabase.auth.signInWithOAuth({ provider: 'kakao' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 헤더 & 대시보드 */}
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">1월 2주차 나눔</h1>
          {!user ? (
            <button onClick={handleLogin} className="bg-yellow-400 px-4 py-2 rounded font-bold text-sm">
              카카오 로그인
            </button>
          ) : (
            <span className="text-sm text-gray-600">안녕하세요!</span>
          )}
        </div>
        
        {/* 현황판 */}
        <div className="max-w-4xl mx-auto mt-4 bg-blue-50 p-3 rounded-lg text-center">
          <span className="font-semibold text-blue-700">
            이번 주 나눔 현황: {posts.length} / 50명 작성완료
          </span>
        </div>
      </header>

      {/* 메인 피드 (Grid Layout) */}
      <main className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2 border-b pb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                {/* 프로필 이미지 들어갈 곳 */}
              </div>
              <span className="font-bold text-gray-700">{post.users?.name || '익명'}</span>
            </div>
            
            {/* 3단 구성 내용 */}
            <div className="bg-green-50 p-3 rounded text-sm">
              <strong className="block text-green-700 mb-1">🌱 감사한 일</strong>
              {post.content_thanks}
            </div>
            <div className="bg-blue-50 p-3 rounded text-sm">
              <strong className="block text-blue-700 mb-1">📖 말씀 묵상</strong>
              {post.content_word}
            </div>
            <div className="bg-purple-50 p-3 rounded text-sm">
              <strong className="block text-purple-700 mb-1">🙏 기도 제목</strong>
              {post.content_prayer}
            </div>

            {/* 댓글/좋아요 버튼 영역 (기능은 추후 구현) */}
            <div className="flex justify-end gap-2 mt-2 text-gray-400 text-sm">
              <button>❤️ 아멘</button>
              <button>💬 댓글</button>
            </div>
          </div>
        ))}
      </main>

      {/* 글쓰기 플로팅 버튼 (로그인 시에만 노출) */}
      {user && (
        <Link href="/write" className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
          + 나눔하기
        </Link>
      )}
    </div>
  );
}