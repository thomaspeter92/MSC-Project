import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxxqwotagugztamftphi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eHF3b3RhZ3VnenRhbWZ0cGhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjM1OTQ5NywiZXhwIjoyMDE3OTM1NDk3fQ.RtAYepaXDBNHVbWNSEvO42z3ICQ7j1DsAmz_6M0nS2s'

export const supabase = createClient(supabaseUrl, supabaseKey)

