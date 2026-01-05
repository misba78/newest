import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1>환영합니다! 👋</h1>
      <p>김현 박사님의 앱입니다.</p>
      
      {/* 글쓰기 페이지로 가는 버튼 */}
      <Link href="/write">
        <button style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
          글쓰기 시작하기
        </button>
      </Link>
    </div>
  );
}