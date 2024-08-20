import Plot from "react-plotly.js";


export const BoxPloter = (props:any) => {
  const df = JSON.parse(props.data[props.section].df);
  const features = props.data[props.section].features;
  
  // const x = df.map(d => d.P_SMA_TI);        // P_SMA_TI as x
  // const y = df.map(d => d.Jml_Mhs_TI);      // Jml_Mhs_TI as y
  // const z = df.map(d => d[' IU_SMA_TI ']);  // IU_SMA_TI as z
  
  const regexPendaftar = /P_/;
  const regexJumlah = /Jml_/;
  const regexIU = /IU_/;
  
  const pendaftarAttr = features.filter((feature: string) => regexPendaftar.test(feature));
  const iuAttr = features.filter((feature: string) => regexIU.test(feature));
  const jumlahAttr = Object.keys(df[0]).filter((feature: string) => regexJumlah.test(feature))[0];
  const x = {}
  const z = {}
  const colors = ['red','green','blue']
  const removedRegex = pendaftarAttr.map((attr: string) => attr.replace(regexPendaftar,''));

  console.log("pendaftarAttr",pendaftarAttr);


  const plotObj = []

  pendaftarAttr.forEach((attr: string,i: number)   => {
    x[attr] = df.map(d => d[attr]);
    z[iuAttr[i]] = df.map(d => d[iuAttr[i]]);
    plotObj.push({
      x: x[attr],
      y: df.map(d => d[jumlahAttr]),
      z: z[iuAttr[i]],
      mode: 'markers',
      type: 'scatter3d',
      name: removedRegex[i],
      marker: { color: colors[i], size: 5, },
    })

  });
  console.log("plotObj",plotObj);
  

  if (!props.data) return <div>Loading...</div>;

  return (
    <Plot
      data={plotObj}
      layout={{
        width: 600,
        height: 600,
        title: '3D Plot of Pendaftar vs Ikut Ujian vs Jml_Mhs_TI',
        scene: {
          xaxis: { title: 'Pendaftar' },
          yaxis: { title: 'Jumlah' },
          zaxis: { title: 'Ikut Ujian' },
        },
      }}
    />
  )
}
