import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ---------- Hero ---------- */}
      <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 md:py-32">
        <Badge className="bg-accent text-accent-foreground hover:bg-accent">
          De temporada
        </Badge>

        <h1 className="text-6xl font-medium leading-[1.05] tracking-tight md:text-8xl">
          Arrels
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
          Fruita i verdura del barri. Producte fresc, de proximitat i de
          temporada al cor de l&apos;Eixample.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button size="lg">Descobreix la botiga</Button>
          <Button size="lg" variant="outline">
            La nostra filosofia
          </Button>
        </div>
      </section>

      {/* ---------- Sección de valores / productos ---------- */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Proximitat</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Treballem amb pagesos i cooperatives locals per portar-te el
              millor producte de Catalunya.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Frescor</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Rebem gènere cada matí. El que veus a la botiga s&apos;ha collit
              fa poques hores.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Arrels</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Un comerç de tota la vida, amb l&apos;orgull i la cura del
              producte de sempre.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---------- Franja de acento ---------- */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-20 text-center">
          <h2 className="text-3xl font-medium md:text-4xl">
            Vine a veure&apos;ns
          </h2>
          <p className="max-w-md opacity-90">
            Av. de Mistral, 24 · Eixample, Barcelona
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-2 bg-background text-foreground hover:bg-background/90"
          >
            Com arribar
          </Button>
        </div>
      </section>
    </main>
  );
}