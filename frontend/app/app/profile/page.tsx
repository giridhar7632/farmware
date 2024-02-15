import { Separator } from '@/components/ui/separator'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how people will see you!
        </p>
      </div>
      <Separator />
    </div>
  )
}
