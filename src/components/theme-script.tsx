/** Runs before paint so the first frame matches the saved theme. Default: dark. */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("cr-theme");if(t==="light")document.documentElement.classList.add("light");else document.documentElement.classList.remove("light");}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
