import type { AppProps } from 'next/app'
import { useState } from 'react'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}


