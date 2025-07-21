
import ProjeDetayPage from "@/app/components/ProjeDetayPage";
import { use } from "react";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <ProjeDetayPage id={id} />;
}
