import {
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaPaperPlane } from "react-icons/fa";
import { moneyParser } from "../../utils/parser";
import { useBudgetStore } from "../provider/useBudgetStore";

const PredictCalculation = ({ data }) => {
  const { saranaPercentage, prasaranaPercentage, sdmPercentage } =
    useBudgetStore();

  // Step 1: Add state to store input values
  const [pendaftar, setPendaftar] = useState(0);
  const [ikutUjian, setIkutUjian] = useState(0);

  const [spp, setSpp] = useState(1000);
  const [heregistrasi, setHeregistrasi] = useState(1000);
  const [dpp, setDpp] = useState(1000);
  const [ospek, setOspek] = useState(1000);
  const [utsUas, setUtsUas] = useState(1000);
  const [totalBudget, setTotalBudget] = useState(0);
  const budgetAttr = [
    {
      name: "SPP",
      function: setSpp,
      attr: spp,
    },
    {
      name: "Heregistrasi",
      function: setHeregistrasi,
      attr: heregistrasi,
    },
    {
      name: "DPP",
      function: setDpp,
      attr: dpp,
    },
    {
      name: "OSPEK",
      function: setOspek,
      attr: ospek,
    },
    {
      name: "UTS/UAS",
      function: setUtsUas,
      attr: utsUas,
    },
  ];

  const portions = [
    {
      name: "Sarana",
      percentage: saranaPercentage,
      color: "#020617",
    },
    {
      name: "Prasarana",
      percentage: prasaranaPercentage,
      color: "#ff8f00",
    },
    {
      name: "SDM",
      percentage: sdmPercentage,
      color: "#00897b",
    },
  ];

  // Step 2: Add state for chartConfig
  const [chartConfig, setChartConfig] = useState({
    type: "pie",
    width: 280,
    height: 280,
    series: [spp, heregistrasi, dpp, ospek, utsUas],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      labels: portions.map((e) => e.name), // Series names
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: true,
        position: "bottom",
      },
    },
  });

  // Update totalBudget whenever the budget values change
  useEffect(() => {
    setTotalBudget(spp + heregistrasi + dpp + ospek + utsUas);
  }, [spp, heregistrasi, dpp, ospek, utsUas]);

  useEffect(() => {
    setChartConfig((prevConfig) => ({
      ...prevConfig,
      series: [saranaPercentage, prasaranaPercentage, sdmPercentage], // Update series with new values
    }));
  }, [saranaPercentage, prasaranaPercentage, sdmPercentage]);

  // Function to handle input changes (ensuring numbers only)
  const handleInputChange = (setter: any, id: string) => (event: any) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== "") {
      setter(Number(value)); // Convert to number and update state
    } else if (value === "") {
      setter(""); // Allow empty input to clear the field
    }
  };

  // Function to handle the submit (button click)
  const handleSubmit = () => {
    console.log("Pendaftar:", pendaftar);
    console.log("Ikut Ujian:", ikutUjian);
  };

  return (
    data && (
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <Card className="w-full lg:w-1/3 overflow-auto mx-3 mb-4">
            <table className="w-full min-w-max table-auto text-left">
              <tbody>
                {Object.keys(data.slopes).map((key, index) => {
                  return (
                    <tr className="even:bg-blue-gray-50/50" key={index}>
                      <th className="border-b border-blue-gray-100 p-4">
                        <p>
                          {key} (&beta;<sub>{index + 1}</sub>)
                        </p>
                      </th>
                      <td className="border-b border-blue-gray-100 p-4">
                        {data.slopes[key].toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="p-4">
                  <th className="border-b border-blue-gray-100 p-4">
                    <p>
                      Intercept (&beta;<sub>0</sub>)
                    </p>
                  </th>
                  <td className="border-b border-blue-gray-100 p-4">
                    {data.intercept.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card className="w-full lg:w-2/3 mx-3 mb-4">
            <div className="h-full w-full flex flex-col justify-center p-4 rounded-xl">
              <div className="flex flex-col lg:flex-row gap-4 mb-3">
                <Input
                  variant="static"
                  label="Pendaftar"
                  size="md"
                  value={pendaftar}
                  onChange={handleInputChange(setPendaftar)}
                />
                <Input
                  variant="static"
                  label="Ikut Ujian"
                  size="md"
                  value={ikutUjian}
                  max={pendaftar}
                  onChange={handleInputChange(setIkutUjian)}
                />
                <IconButton className="p-4" onClick={handleSubmit}>
                  <FaPaperPlane />
                </IconButton>
              </div>
              <div className="w-full text-left mt-2">
                <Typography color="gray" variant="small">
                  <p>
                    <strong>Formula:</strong> Jumlah Mahasiswa TI = &beta;
                    <sub>0</sub> + &beta;<sub>1</sub> * Pendaftar + &beta;
                    <sub>2</sub> * Ikut Ujian
                  </p>
                </Typography>

                <Typography color="gray" variant="h4">
                  <p>
                    <strong>Prediksi Mahasiswa:</strong>{" "}
                    {pendaftar
                      ? pendaftar < ikutUjian
                        ? "Pendaftar harus lebih besar dari Ikut Ujian"
                        : (
                            data.intercept +
                            data.slopes["P_TI"] * pendaftar +
                            data.slopes["IU_TI"] * ikutUjian
                          ).toFixed(0)
                      : "0"}
                  </p>
                </Typography>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full flex flex-col lg:flex-row">
          <Card className="w-full lg:w-1/3 mb-3 mx-3 rounded-lg overflow-hidden">
            <table className="w-full table text-left p-0">
              <tbody>
                {budgetAttr.map((data, index) => {
                  return (
                    <tr className="even:bg-blue-gray-50/50" key={index}>
                      <th className="border-b border-blue-gray-100 p-4">
                        <p>{data.name}</p>
                      </th>
                      <td className="border-b border-blue-gray-100 p-4">
                        <Input
                          variant="static"
                          size="md"
                          value={data.attr}
                          onChange={handleInputChange(data.function)}
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr className="p-4 bg-green-600 text-white">
                  <th className="border-b border-blue-gray-100 p-4">
                    <p>Total Budget</p>
                  </th>
                  <td className="border-b border-blue-gray-100 p-4">
                    {pendaftar < ikutUjian
                      ? "Pendaftar harus lebih besar dari Ikut Ujian"
                      : moneyParser(totalBudget)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card className="w-full lg:w-2/3 mb-3 mx-3">
            <CardBody>
              <div className="h-full w-full flex justify-center p-4">
                <Chart {...chartConfig} />
                {/* show vertical table of calculation total budget sarana prasarana sdm */}
                <table className="w-full min-w-max table-auto text-left rounded-xl overflow-hidden">
                  <tbody>
                    {portions.map((data, index) => (
                      <tr key={index}>
                        <th
                          className={
                            `w-1/3  border-b border-gray-100 p-4 text-white ${
                              index === 0 ? "rounded-tl-lg" : "" // Rounded top-left corner for the first row
                            } ${
                              index === portions.length - 1
                                ? "rounded-bl-lg"
                                : ""
                            }` /* Rounded bottom-left corner for the last row */
                          }
                          style={{ backgroundColor: data.color }}
                        >
                          <p>{data.name}</p>
                        </th>
                        <td
                          className={
                            `w-2/3 border-b  p-4 ${
                              index === 0 ? "rounded-tr-lg" : "" // Rounded top-right corner for the first row
                            } ${
                              index === portions.length - 1
                                ? "rounded-br-lg"
                                : ""
                            }` /* Rounded bottom-right corner for the last row */
                          }
                          style={{ borderColor: data.color }}
                        >
                          {moneyParser(totalBudget * data.percentage)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter>
              <Typography color="gray" variant="h4">
                <p>
                  <strong>Total Budget:</strong>{" "}
                  {pendaftar < ikutUjian? "Pendaftar harus lebih besar dari Ikut Ujian":moneyParser(
                    totalBudget *
                      (
                        data.intercept +
                        data.slopes["P_TI"] * pendaftar +
                        data.slopes["IU_TI"] * ikutUjian
                      ).toFixed(0)
                  )}
                </p>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  );
};

export default PredictCalculation;
