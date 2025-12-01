import Link from "next/link";
import { Button } from "@shinatga/ui";
import { PAGES, ROUTES } from "@/lib/constants";

export default function HomePage() {
  const { hero, cta, features } = PAGES.home;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:p-8 md:p-24">
      <div className="max-w-5xl w-full text-center space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <hero.icon className="h-12 w-12 sm:h-16 sm:w-16" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {hero.title}
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          {hero.description}
          <br />
          {hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <Link href={ROUTES.notes}>
            <Button size="lg" className="w-full sm:w-auto">{cta.start}</Button>
          </Link>
          {/*<Link href={ROUTES.register}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {cta.register}
            </Button>
          </Link>*/}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.title}
                className="p-5 sm:p-6 border rounded-lg"
              >
                <div className="mb-3 sm:mb-4 flex items-center justify-center">
                  <IconComponent className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
