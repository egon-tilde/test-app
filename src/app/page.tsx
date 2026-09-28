import CheckoutForm from "@/components/CheckoutForm";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-10">
      <h1 className="text-2xl font-semibold">Codeview test app</h1>
      <CheckoutForm />
      <div className="flex gap-3">
        <Button>Server-rendered button</Button>
        <Button variant="secondary">Sekundarni</Button>
      </div>
    </div>
  );
}