import Plot from "react-plotly.js"; // Assuming you use react-plotly.js for Plot component

export const BoxPloter = (props: any) => {

  // Parse props data
  const df = JSON.parse(props.data[props.section].df);
  const features = props.data[props.section].features;

  const regexPendaftar = /P_/;
  const regexJumlah = /Jml_/;
  const regexIU = /IU_/;


  const pendaftarAttr = features.filter((feature: string) =>
    regexPendaftar.test(feature)
  );
  const iuAttr = features.filter((feature: string) => regexIU.test(feature));
  const jumlahAttr = Object.keys(df[0]).find((feature: string) =>
    regexJumlah.test(feature)
  );
  const x: any = {};
  const z = {};
  const colors = ["red", "green", "blue"];
  const removedRegex = pendaftarAttr.map((attr: string) =>
    attr.replace(regexPendaftar, "")
  );

  const plotObj: any[] = [];

  pendaftarAttr.forEach((attr: string, i: number) => {
    x[attr] = df.map((d) => ({
      value: d[attr],
      label: d["year"],
    }));
    z[iuAttr[i]] = df.map((d) => d[iuAttr[i]]);
    plotObj.push({
      x: x[attr].map((d) => d.value),
      y: df.map((d) => d[jumlahAttr]),
      z: z[iuAttr[i]],
      mode: "markers",
      type: "scatter3d",
      name: removedRegex[i],
      marker: { color: colors[i], size: 5 },
    });
  });

  if (!props.data) return <div>Loading...</div>;

  return (
    <Plot
      data={plotObj}
      layout={{
        width: 600,
        height: 600,
        title: "3D Plot of Pendaftar vs Ikut Ujian vs Jml_Mhs_TI",
        scene: {
          xaxis: { title: "Pendaftar" },
          yaxis: { title: "Jumlah" },
          zaxis: { title: "Ikut Ujian" },
        },
      }}
    />
  );
};
