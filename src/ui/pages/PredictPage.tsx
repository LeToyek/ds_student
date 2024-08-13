// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useRef } from "react";
import { IpynbRenderer } from "react-ipynb-renderer";
import ipynb from "../../assets/predict.json"

// import "react-ipynb-renderer/dist/styles/default.css";
// import "react-ipynb-renderer/dist/styles/dark.css";
//import "react-ipynb-renderer/dist/styles/darkbronco.css";
// import "react-ipynb-renderer/dist/styles/dorkula.css";
//import "react-ipynb-renderer/dist/styles/chesterish.css";
//import "react-ipynb-renderer/dist/styles/grade3.css";
// import "react-ipynb-renderer/dist/styles/gruvboxd.css";
//import "react-ipynb-renderer/dist/styles/gruvboxl.css";
// import "react-ipynb-renderer/dist/styles/monokai.css";
// import "react-ipynb-renderer/dist/styles/oceans16.css";
//import "react-ipynb-renderer/dist/styles/onedork.css";
//import "react-ipynb-renderer/dist/styles/solarizedd.css";
// import "react-ipynb-renderer/dist/styles/solarizedl.css";

export const PredictPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <IpynbRenderer
        ipynb={ipynb}
        syntaxTheme={"darcula"}
        onLoad={() => {
          console.log("loaded", ref.current);
        }}
        ref={ref}
      />
    </div>
  );
}
