import { Title } from "@/shared/components/typography/Title.tsx";

export function CategoryAdminPage() {
  return (
    <div className={"p-6"}>
      <header className={"items- center flex w-full justify-between gap-2"}>
        <Title>List of categories</Title>
      </header>
    </div>
  );
}
