import { Card, Typography } from "@material-tailwind/react";
import Plot from "react-plotly.js"; // Assuming you use react-plotly.js for Plot component

export const StudentData = (props: any) => {
  // Parse props data
  const df = JSON.parse(props.data[props.section].df);
  const features = props.data[props.section].features;

  const regexPendaftar = /P_/;
  const regexJumlah = /DU_/;
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
    <div className="min-w-[50vw] flex flex-col items-center justify-center">
      <Plot
      className="mb-3"
        data={plotObj}
        layout={{
          width: 600,
          height: 600,
          title: "3D Plot of Pendaftar vs Ikut Ujian vs Jml_Mhs_TI",
          scene: {
            xaxis: { title: "Pendaftar" },
            yaxis: { title: "Daftar Ulang" },
            zaxis: { title: "Ikut Ujian" },
          },
        }}
      />
      <Typography variant="h4" className="w-full text-left mx-3 mb-3">
        Jumlah Mahasiswa
      </Typography>
      <Card className="w-full mx-3">
        <table className="w-full min-w-max table-auto">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 p-4 bg-light-green-200">Tahun</th>
              <th className="border-b border-blue-gray-100 p-4 bg-light-green-200">Pendaftar</th>
              <th className="border-b border-blue-gray-100 p-4 bg-light-green-200">Ikut Ujian</th>
              <th className="border-b border-blue-gray-100 p-4 bg-light-green-200">Jumlah Mahasiswa</th>
            </tr>
          </thead>
          <tbody>
            {df.map((d: any, i: number) => (
              <tr key={i}>
                <td className="border-b border-blue-gray-100 p-4">{d.year}</td>
                <td className="border-b border-blue-gray-100 p-4">{d[pendaftarAttr[0]]}</td>
                <td className="border-b border-blue-gray-100 p-4">{d[iuAttr[0]]}</td>
                <td className="border-b border-blue-gray-100 p-4">{d[jumlahAttr]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
};
