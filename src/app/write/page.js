'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    thanks: '',
    word: '',
    prayer: ''
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      week_label: "2026-W02", // 실제로는 날짜 라이브러리로 자동 계산 추천
      content_thanks: formData.thanks,
      content_word: formData.word,
      content_prayer: formData.prayer
    });

    if (error) {
      alert("저장 실패: " + error.message);
    } else {
      alert("나눔이 등록되었습니다!");
      router.push('/'); // 메인으로 이동
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 text-center">이번 주 나눔 작성</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block font-bold text-gray-700 mb-2">🌱 한 주간 감사한 일은?</label>
            <textarea 
              className="w-full p-3 border rounded-lg h-24 focus:ring-2 ring-blue-200 outline-none"
              placeholder="사소한 것이라도 좋아요."
              value={formData.thanks}
              onChange={(e) => setFormData({...formData, thanks: e.target.value})}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">📖 마음에 와닿은 말씀은?</label>
            <textarea 
              className="w-full p-3 border rounded-lg h-24 focus:ring-2 ring-blue-200 outline-none"
              value={formData.word}
              onChange={(e) => setFormData({...formData, word: e.target.value})}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">🙏 기도제목을 나눠주세요</label>
            <textarea 
              className="w-full p-3 border rounded-lg h-24 focus:ring-2 ring-blue-200 outline-none"
              value={formData.prayer}
              onChange={(e) => setFormData({...formData, prayer: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? '저장 중...' : '나눔 완료하기'}
          </button>
        </div>
      </div>
    </div>
  );
}