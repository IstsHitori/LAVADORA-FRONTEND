export default function CardProfile({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full border border-zinc-800 bg-zinc-100 size-10 text-black flex items-center justify-center">
        {name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-zinc-500">{email}</p>
      </div>
    </div>
  );
}
