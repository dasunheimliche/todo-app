import ButtonAddNote from "./button-add-note";

export default function Header() {
  return (
    <header className="flex items-center h-40 pl-10 relative ">
      <h1 className=" font-semibold text-[2rem]">Notify</h1>
      <div className="absolute bottom-5 right-0">
        <ButtonAddNote />
      </div>
    </header>
  );
}
