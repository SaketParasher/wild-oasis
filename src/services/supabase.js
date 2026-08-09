
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zxyclwlfjzfszzisndpz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eWNsd2xmanpmc3p6aXNuZHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjQ2NTMsImV4cCI6MjEwMTg0MDY1M30.B0kNGIcBa1_ZO4G8aFRVaDrmAe1DJEUHwFLnRcvV1Bg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;