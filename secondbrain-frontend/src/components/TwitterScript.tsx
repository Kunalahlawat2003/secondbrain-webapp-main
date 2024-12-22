

export function loadTwitterScript() {

    if (typeof window !== "undefined" && !document.getElementById("twitter-wjs")) {
        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
        //@ts-ignore
      } else if (window.twttr) {
        // Reinitialize tweets if the script is already loaded
        //@ts-ignore
        window.twttr.widgets.load();
      }
}