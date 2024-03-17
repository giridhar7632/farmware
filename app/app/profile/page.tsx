import { SignOut } from '@/app/auth/Methods'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/lib/auth'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how people will see you!
        </p>
      </div>
      <Separator />
      <Input name="name" type="text" value={session?.user?.name ?? 'No name'} />
      <Input
        name="email"
        type="email"
        value={session?.user?.email ?? 'email'}
      />
      <SignOut />
    </div>
  )
}
