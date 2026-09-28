type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
  };
  
  export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
    const base = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const styles =
      variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300";
  
    return (
        <button className={`${base} ${styles}`} onClick={onClick}>
        {children}
        </button>
    );
}