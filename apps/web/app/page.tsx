import Link from "next/link";
import { Button } from "@shinatga/ui";
import { PAGES, ROUTES } from "@/lib/constants";

export default function HomePage() {
  const { hero, cta, features } = PAGES.home;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:p-8 md:p-24">
      <div className="max-w-5xl w-full text-center space-y-8 sm:space-y-10">
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <hero.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {hero.title}
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2 leading-relaxed">
          {hero.description}
          <br />
          {hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
          <Link href={ROUTES.notes}>
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">{cta.start}</Button>
          </Link>
          {/*<Link href={ROUTES.register}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {cta.register}
            </Button>
          </Link>*/}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-12 sm:mt-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.title}
                className="group p-6 sm:p-7 border border-border/50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card"
              >
                <div className="mb-4 sm:mb-5 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <IconComponent className="h-7 w-7 sm:h-8 sm:h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
