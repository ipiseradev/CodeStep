import { useState } from "react";

export default function Auth() {
  const [mode, setMode] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage("Error al conectar con el backend");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8081/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();
      setMessage(data);
      if (data == "Login exitoso") {
        // Redirigir al Dashboard después de un login exitoso
        localStorage.setItem("userEmail", email); // Guardar el email en localStorage
        window.location.href = "/dashboard"; // Redirigir al Dashboard
      }
    
    
    
    } catch (error) {
      setMessage("Error al conectar con el backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-zinc-950/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-3">
          CodeStep Auth
        </p>

        <h1 className="text-4xl font-black italic uppercase tracking-[-0.06em] mb-6">
          {mode === "register" ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        <form
          onSubmit={mode === "register" ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {mode === "register" && (
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-white/10 px-4 py-3 outline-none focus:border-primary-500"
                placeholder="Ignacio"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 px-4 py-3 outline-none focus:border-primary-500"
              placeholder="test@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 px-4 py-3 outline-none focus:border-primary-500"
              placeholder="1234"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase text-sm py-3 hover:bg-primary-500 transition disabled:opacity-60"
          >
            {loading
              ? "Cargando..."
              : mode === "register"
              ? "Registrarme"
              : "Entrar"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-primary-500 font-bold">{message}</p>
        )}

        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "register" ? "login" : "register"))
          }
          className="mt-6 text-sm text-zinc-400 hover:text-white transition"
        >
          {mode === "register"
            ? "¿Ya tenés cuenta? Iniciá sesión"
            : "¿No tenés cuenta? Registrate"}
        </button>
      </div>
    </div>
  );
}