import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileMenuProps = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

export default function ProfileMenu({ name, email, image }: ProfileMenuProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage src={image ?? ''} alt={name ?? ''} />
            <AvatarFallback>{getInitials(name ?? '')}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="relative p-4">
          <div className="text-xs text-neutral-400">Logged in as:</div>
          <div className="mt-2 font-semibold">{name}</div>
          <div className="truncate text-neutral-500">{email}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
