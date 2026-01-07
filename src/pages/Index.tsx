import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Award, Users, Target, Building2, Lightbulb, ChevronRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  const { t } = useTranslation();

  const educationPaths = [
    {
      titleKey: "paths.after10th.title",
      descriptionKey: "paths.after10th.description",
      icon: BookOpen,
      href: "/careers?level=10th",
      color: "bg-info/10 text-info"
    },
    {
      titleKey: "paths.after12thScience.title",
      descriptionKey: "paths.after12thScience.description",
      icon: Lightbulb,
      href: "/careers?level=12th-science",
      color: "bg-success/10 text-success"
    },
    {
      titleKey: "paths.after12thCommerce.title",
      descriptionKey: "paths.after12thCommerce.description",
      icon: Building2,
      href: "/careers?level=12th-commerce",
      color: "bg-warning/10 text-warning"
    },
    {
      titleKey: "paths.after12thArts.title",
      descriptionKey: "paths.after12thArts.description",
      icon: GraduationCap,
      href: "/careers?level=12th-arts",
      color: "bg-primary/10 text-primary"
    }
  ];

  const features = [
    {
      titleKey: "features.careerGuidance.title",
      descriptionKey: "features.careerGuidance.description",
      icon: Target,
      href: "/careers"
    },
    {
      titleKey: "features.governmentJobs.title",
      descriptionKey: "features.governmentJobs.description",
      icon: Briefcase,
      href: "/government-jobs"
    },
    {
      titleKey: "features.scholarships.title",
      descriptionKey: "features.scholarships.description",
      icon: Award,
      href: "/scholarships"
    },
    {
      titleKey: "features.freeCourses.title",
      descriptionKey: "features.freeCourses.description",
      icon: BookOpen,
      href: "/courses"
    }
  ];

  const stats = [
    { labelKey: "stats.careersListed", value: "500+" },
    { labelKey: "stats.govtJobCategories", value: "50+" },
    { labelKey: "stats.scholarships", value: "100+" },
    { labelKey: "stats.freeCourses", value: "1000+" }
  ];
  return <Layout>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section 1: Title, subtitle, description */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
                <Sparkles className="h-4 w-4" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-display text-3xl md:text-4xl lg:text-5xl xl:text-display font-extrabold tracking-tight animate-slide-up">
                {t("hero.title")}
                <span className="block text-gradient-primary mt-2">{t("hero.titleHighlight")}</span>
              </h1>

              <p
                className="text-body-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                {t("hero.description")}
              </p>
            </div>

            {/* Section 2: Call-to-action buttons */}
            <div className="mt-10 flex justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Card variant="elevated" className="w-full max-w-xl pointer-events-auto">
                <CardContent className="p-5 pt-5">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                      <Link to="/career-quiz" aria-label={t("hero.findCareerPath")}>
                        {t("hero.findCareerPath")}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                      <Link to="/careers" aria-label={t("hero.exploreAllCareers")}>
                        {t("hero.exploreAllCareers")}
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Paths */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-heading text-2xl md:text-3xl font-bold mb-4">
              {t('paths.title')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('paths.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {educationPaths.map((path, index) => <Link to={path.href} key={path.titleKey}>
                <Card variant="interactive" className="h-full animate-slide-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${path.color} flex items-center justify-center mb-2`}>
                      <path.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{t(path.titleKey)}</CardTitle>
                    <CardDescription>{t(path.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {t('common.explore')} <ChevronRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-heading text-2xl md:text-3xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => <Link to={feature.href} key={feature.titleKey}>
                <Card variant="gradient" className="h-full text-center hover:shadow-glow transition-all duration-300 animate-scale-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardHeader className="items-center pb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle>{t(feature.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t(feature.descriptionKey)}</p>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-gradient-secondary rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => <div key={stat.labelKey} className="text-center animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    {t(stat.labelKey)}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card variant="elevated" className="relative max-w-3xl mx-auto text-center overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
            />
            <CardHeader className="relative pb-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                {t('cta.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <p className="text-muted-foreground">
                {t('cta.description')}
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/career-quiz">
                  {t('cta.button')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>;
}