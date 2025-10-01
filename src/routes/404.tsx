import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "../components/ErrorComponents";

export const Route = createFileRoute("/404")({
  component: NotFoundComponent,
});
