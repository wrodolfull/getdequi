import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
  return <main className="dashboardShell"><Sidebar /><DashboardClient /></main>;
}
