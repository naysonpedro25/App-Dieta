
export default function Button({onClick , children, type} :{ onClick?: () => void , children: string, type?: "submit" | "button" }) {
  return (
    <button className="hover:bg-sky-600 w-full text-white font-bold py-2 px-4 rounded-lg btn-bg" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
