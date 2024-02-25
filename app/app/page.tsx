import { Separator } from '@/components/ui/separator'
import { AnalyseForm } from './AnalyseForm'

export default function AppAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Analyse</h3>
        <p className="text-sm text-muted-foreground">
          Get to know your form better{' '}
        </p>
      </div>
      <Separator />
      <AnalyseForm />
    </div>
  )
}
