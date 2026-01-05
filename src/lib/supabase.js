import { createClient } from '@supabase/supabase-js'

// 1. 환경 변수를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 2. [수정된 부분] 빌드 타임에 에러가 나지 않도록 '방어 코드'를 넣습니다.
// URL이 없으면 억지로라도 가짜 주소를 넣어서 createClient가 멈추지 않게 합니다.
const safeUrl = supabaseUrl || "https://placeholder.supabase.co"
const safeKey = supabaseKey || "placeholder-key"

// 3. 클라이언트 생성
export const supabase = createClient(safeUrl, safeKey)