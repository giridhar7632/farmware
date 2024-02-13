import SoilAnalysis from "./_components/SoilAnalysis";
import Demo from "./_components/Demo";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-amber-100 pb-8">
      <SoilAnalysis />
      <Demo />
    </main>
  );
}
