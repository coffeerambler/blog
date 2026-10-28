/** Runs before paint so the first frame matches the saved theme. */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("cr-theme");if(t==="dark")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
