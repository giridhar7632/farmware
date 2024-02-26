'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Error() {
	const searchParams = useSearchParams()
	const error = searchParams.get('error')

	return (
		<>
			<Image
				className='mx-auto'
				width={72}
				height={72}
				src='/logo.png'
				alt='Helping hands network Logo'
			/>
			<h1 className='my-6 flex items-center gap-4 justify-center text-center text-2xl'>
				Aww x_x
			</h1>
			<p className='text-center'>
				{error === 'CallbackRouteError'
					? 'You may have used other methods to sign in!'
					: 'Something went wrong while signing you in!'}{' '}
			</p>
			<Button asChild>
				<Link className='mx-auto mt-6' href={'/auth/login'}>
					Try again
				</Link>
			</Button>
		</>
	)
}
