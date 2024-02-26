import { SocialLogin } from '../Methods'
import { PaddingIcon } from '@radix-ui/react-icons'

export default async function Login() {
  return (
    <>
      <PaddingIcon className="mx-auto" width={72} height={72} />
      <h1 className="my-6 text-center text-xl">Welcome to Farmware!</h1>
      {/* <EmailLogin /> */}
      <div className="my-6">
        {/* <p className="text-center text-neutral-400">- Or -</p> */}
        <div className="flex items-center gap-4 pt-4">
          <SocialLogin type="Google" />
          <SocialLogin type="GitHub" />
        </div>
      </div>
    </>
  )
}
