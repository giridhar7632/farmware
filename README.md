<div align="center">
      <img src="https://farmware-xi.vercel.app/logo-light.png" width="100px"><br/>
        <h1> <a href="https://farmware-xi.vercel.app/">Farmware</h1></a>
  <p><p>Farmware can analyse your farm by getting a soil moisture reading using satllite imagery.</p></p>
     </div>

---

✨ Video demo: [Presentation](https://devpost.com/software/farmware-omy1wa)

Note: Website is nonfunctional as the [European Satellite Agency API free trial](https://www.sentinel-hub.com/develop/api/) only lasts 1 month per account. 

## Tech stack ⚒️

- Backend: Convex
- Frontend: Next.js + React
- UI: Shadcn + Tailwind

## Development Guide 🚀

1. Run `yarn` to install dependencies.
2. Copy and rename `.env.example` to `.env.local` and fill in the required environment variables.
3. Run `npx convex dev` to start the convex dev server and deploy the functions and db schema defined. Select the project of your choice.
4. In a separate terminal, run `yarn dev` to start the dev server.
