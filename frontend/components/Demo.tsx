import Image from "next/image";
import { Input } from "./ui/input";

export default function Demo() {
  return (
    <>
      <h2
        className="min-h-[50vh] py-8 text-2xl font-semibold italic"
        data-aos="fade-up"
      >
        What more can we do?
      </h2>
      <article className="flex flex-col items-center justify-center gap-4 px-4">
        <section
          className="flex min-h-screen place-items-center justify-center gap-4"
          data-aos="fade-up"
        >
          <h3 className="mb-2 text-3xl">Step 1: Input the coordinate.</h3>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"></path>
                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                <path
                  strokeLinecap="round"
                  d="M2 12h2m16 0h2M12 4V2m0 20v-2"
                ></path>
              </g>
            </svg>
            <Input value="34.665,31.625" disabled className="text-gray-900" />
          </div>
        </section>
        <section
          className="flex min-h-screen flex-row-reverse items-center justify-center gap-4 px-8"
          data-aos="fade-up"
        >
          <h3 className="w-1/2 text-3xl">
            Step 2: We will fetch the latest satellite imagery from{" "}
            <a
              href="https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2"
              className="underline hover:text-gray-700"
            >
              sentinel-2
            </a>
            .
          </h3>
          <Image
            src={"/sentinel-satellite.png"}
            width={300}
            height={200}
            alt={`sentinel satellite image of request coordinates`}
          />
        </section>

        <section className="flex min-h-screen flex-col items-center justify-center gap-8">
          <h3 className="text-3xl" data-aos="fade-up">
            Step 3: Wait a moment while we perform the analysis.
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-20 w-20"
            data-aos="fade-up"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2.25 11.88c-.01.177.015.39.065.818l.401 3.428A5.515 5.515 0 0 0 8.193 21h3.614a5.515 5.515 0 0 0 5.028-3.25H19a3.75 3.75 0 1 0 0-7.5h-2.279a1.996 1.996 0 0 0-.618-.22c-.174-.03-.39-.03-.82-.03H4.717c-.43 0-.645 0-.819.03a2 2 0 0 0-1.646 1.85m15.487-.13c.005.043.01.087.012.13c.01.177-.014.39-.064.818l-.401 3.428l-.016.124H19a2.25 2.25 0 0 0 0-4.5zM10.53 1.47a.75.75 0 0 1 0 1.06a.666.666 0 0 0 0 .94a2.164 2.164 0 0 1 0 3.06a.75.75 0 0 1-1.06-1.06c.26-.26.26-.68 0-.94a2.164 2.164 0 0 1 0-3.06a.75.75 0 0 1 1.06 0m-4.5 1.5a.75.75 0 0 1 0 1.06l-.116.116a.691.691 0 0 0-.064.904a2.191 2.191 0 0 1-.204 2.864l-.116.116a.75.75 0 0 1-1.06-1.06l.116-.116a.691.691 0 0 0 .064-.904a2.191 2.191 0 0 1 .204-2.864l.116-.116a.75.75 0 0 1 1.06 0m9.5 0a.75.75 0 0 1 0 1.06l-.116.116a.691.691 0 0 0-.064.904a2.191 2.191 0 0 1-.204 2.864l-.116.116a.75.75 0 1 1-1.06-1.06l.116-.116a.691.691 0 0 0 .064-.904a2.191 2.191 0 0 1 .204-2.864l.116-.116a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            ></path>
          </svg>
        </section>
        <section
          className="flex flex-col items-center gap-8"
          data-aos="fade-up"
        >
          <h3 className="text-3xl">
            Step 4: Log in to see the results and recommendations!
          </h3>
          <Image
            src="https://placehold.co/600x400/jpg"
            alt="exmaple result page in dashboard"
            width={600}
            height={400}
          />
        </section>
      </article>
    </>
  );
}
