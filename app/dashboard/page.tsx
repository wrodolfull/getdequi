import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  DequiGrid,
  Folders,
  HeaderStatsCard,
  SearchAndActions,
  TemplateGrid,
} from "@/components/dashboard/Cards";
import { SharePanel } from "@/components/dashboard/SharePanel";

export default function DashboardPage() {
  return (
    <main className="dashboardShell">
      <Sidebar />

      <section className="workspace">
        <div className="heroRow">
          <div>
            <h1>Olá, Rodolfo 👋</h1>
            <p>Aqui está o resumo dos seus Dequis e atividades.</p>
          </div>

          <div className="stats">
            <HeaderStatsCard
              title="Seu plano"
              value="Pro"
              caption="Válido até 18/07/2026"
              tone="primary"
            />

            <HeaderStatsCard
              title="Dequis criados"
              value="12 / 25"
              caption="48% do limite utilizado"
              tone="teal"
            />
          </div>
        </div>

        <SearchAndActions />

        <section className="section">
          <h2>Pastas</h2>
          <Folders />
        </section>

        <section className="section bigGap">
          <div className="sectionHead">
            <div>
              <h2>Meus Dequis</h2>

              <div className="tabs">
                <button className="active">Todos</button>
                <button>Recentes</button>
                <button>Favoritos</button>
              </div>
            </div>

            <div className="viewTools">
              <select defaultValue="recentes">
                <option value="recentes">Mais recentes</option>
              </select>

              <button className="active">▦</button>
              <button>▤</button>
            </div>
          </div>

          <DequiGrid />
        </section>

        <section className="section templates">
          <div className="sectionHead inline">
            <h2>Templates recomendados</h2>
            <a>Ver todos</a>
          </div>

          <TemplateGrid />
        </section>
      </section>

      <SharePanel />
    </main>
  );
}
