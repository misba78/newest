import { createClient } from '@supabase/supabase-js'

// 1. 변수를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 2. 변수가 없을 경우를 대비해 '빈 값'이라도 넣어줍니다 (빌드 에러 방지용)
// 이렇게 하면 빌드는 통과되고, 나중에 브라우저에서 에러 원인을 찾기 쉽습니다.
const url = supabaseUrl || "https://placeholder.supabase.co"
const key = supabaseKey || "placeholder-key"

export const supabase = createClient(url, key)