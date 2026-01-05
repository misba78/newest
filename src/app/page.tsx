"use client"; // 👈 이 줄이 꼭 맨 위에 있어야 합니다! (중요)

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // 🚨 본인의 supabase 파일 위치에 맞게 수정하세요 (예: '../utils/supabase')
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]); // 글 목록을 저장할 빈 상자

  // 1. 화면이 켜지면 Supabase에서 글을 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      // 'posts' 테이블에서 모든(*) 내용을 가져오되, 최신순(created_at 내림차순)으로 정렬
      const { data, error } = await supabase
        .from('posts') // 🚨 본인의 테이블 이름이 'posts'가 아니라면 수정하세요 (예: 'memo')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log("에러 발생:", error);
      } else {
        setPosts(data || []); // 가져온 데이터를 상자에 담기
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* 상단 헤더 영역 */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>📢 100인의 게시판</h1>
        <p>함께 공유하는 공간입니다.</p>
        
        <Link href="/write">
          <button style={{ 
            padding: '12px 24px', 
            fontSize: '16px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '25px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            ✏️ 나도 글 쓰러 가기
          </button>
        </Link>
      </header>

      {/* 글 목록 영역 */}
      <section>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>아직 등록된 글이 없습니다. 첫 글을 남겨보세요!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '10px', 
              padding: '20px', 
              marginBottom: '15px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {/* 내용 표시 */}
              <p style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{post.content}</p> 
              {/* 🚨 테이블 컬럼명이 content가 아니라면 수정 (예: post.text) */}

              {/* 작성 시간 (작게 표시) */}
              <small style={{ color: '#999' }}>
                {new Date(post.created_at).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}