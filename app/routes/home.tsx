import { CreateRoom } from "../components/CreateRoom";

export function meta() {
  return [
    { title: "Agile Poker - Planning Tool" },
    { name: "description", content: "Agile poker planning tool for development teams" },
  ];
}

export default function Home() {
  return <CreateRoom />;
}
