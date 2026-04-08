export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-auto bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} CodeStep. Diseñado para aprender de verdad.
        </p>
      </div>
    </footer>
  );
}
