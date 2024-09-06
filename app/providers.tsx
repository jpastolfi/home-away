'use client'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './theme-provider'

import React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <>
    <Toaster />
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </>
}
