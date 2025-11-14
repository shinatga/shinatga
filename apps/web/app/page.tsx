import Link from "next/link";
import { Button } from "@shinatga/ui";
import { PAGES, ROUTES } from "@/lib/constants";

export default function HomePage() {
  const { hero, cta, features } = PAGES.home;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight">
          {hero.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {hero.description}
          <br />
          {hero.subtitle}
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link href={ROUTES.notes}>
            <Button size="lg">{cta.start}</Button>
          </Link>
          {/*<Link href={ROUTES.register}>
            <Button variant="outline" size="lg">
              {cta.register}
            </Button>
          </Link>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 border rounded-lg w-full h-screen">
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
