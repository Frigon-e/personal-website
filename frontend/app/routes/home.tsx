import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Ethan Frigon — Portfolio"},
    {
      name: "description",
      content: "Welcome to my portfolio website. I'm a software engineer with a passion for building innovative solutions."
    },
  ];
}

export default function Home() {
  return <Welcome/>;
}
