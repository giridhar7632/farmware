import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { SignOut } from '@/app/auth/Methods'

type ProfileMenuProps = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

export default function ProfileMenu({ name, email, image }: ProfileMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={image ?? ''} alt={name ?? ''} />
          <AvatarFallback>{getInitials(name ?? '')}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="relative p-4">
        <Link href="/app/profile">
          <div className="text-xs text-neutral-400">Logged in as:</div>
          <div className="mt-2 font-semibold">{name}</div>
          <div className="truncate text-neutral-500">{email}</div>
        </Link>
      </PopoverContent>
    </Popover>
  )
}
