import { Square3Stack3DIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import "./App.css";
import { BudgetCalculation } from "./ui/components/BudgetCalculation";
import FileInput from "./ui/components/FileInput";
import PredictCalculation from "./ui/components/PredictCalculation";
import { StudentData } from "./ui/components/StudentData";
import { BaseBudget, Registrants } from "./ui/model/Budget";
import { LinearAttribute } from "./ui/model/LinearAttribute";
import { useAlertStore } from "./ui/provider/useAlertsStore";
import { useBudgetStore } from "./ui/provider/useBudgetStore";

const chartOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    type: "scatter",
  },
  dataLabels: { enabled: false },
  colors: ["#00E396", "#FF4560"],
  xaxis: {
    tickAmount: 10,
    title: { text: "Actual" },
    type: "numeric", // Ensure the x-axis handles numeric values
    labels: { formatter: (val: number) => val },
  },
  yaxis: {
    title: { text: "Predicted" },
    type: "numeric", // Ensure the x-axis handles numeric values
    labels: { formatter: (val: number) => val },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    padding: { top: 5, right: 20 },
  },
  markers: { size: [0, 5] },
  tooltip: { theme: "dark" },
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState(null); // Store chart data
  const [budgetData, setBudgetData] = useState(null); // Store budget data
  const [linearAttribute, setLinearAttribute] = useState<LinearAttribute>()
  const [error, setError] = useState<string | null>(null); // Store error message
  const [success, setSuccess] = useState<string | null>(null); // Store success message
  const { setAttribute, setRegistrants } = useBudgetStore();

  const { alerts, removeAlert } = useAlertStore();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }, [success, error]);

  useEffect(() => {
    if (budgetData) {
      const df = JSON.parse(budgetData.data);
      const df_base_budget: BaseBudget[] = df.map((data: any) => ({
        year: data["Year"],
        spp: data["SPP"],
        heregistrasi: data["Heregistrasi"],
        dpp: data["DPP"],
        ospek: data["OSPEK"],
        utsuas: data["UTS&UAS"],
      }));
      setAttribute(df_base_budget);
    }
  }, [budgetData]);

  useEffect(() => {
    if (chartData) {
      const df_registrants = JSON.parse(chartData["TI"].df);
      const registrants: Registrants = {};
      df_registrants.map(
        (data: any) => (registrants[data["year"]] = data["DU_TI"])
      );
      setRegistrants(registrants);

      const linearAttribute: LinearAttribute = {
        slopes: chartData["TI"].coef_list,
        intercept : chartData["TI"].intercept,
      }
      setLinearAttribute(linearAttribute) 
      // const registrants : Registrant = df_registrants.map((data: any) => ({
      //   year: data['Year'],
      //   du: data['DU'],
      // }));
    }
  }, [chartData]);

  const formattedData = (data: any) => {
    if (!chartData || !chartData[data]) return { series: [], options: {} };

    const actualValues = chartData[data].actual || [];
    const predictions = chartData[data].predictions || [];

    if (actualValues.length !== predictions.length) {
      console.error("Actual values and predictions length mismatch");
      return { series: [], options: {} };
    }

    const minActual = Math.min(...actualValues);
    const maxActual = Math.max(...actualValues);

    return {
      series: [
        {
          name: "Line of Equality",
          type: "line",
          data:
            minActual !== Infinity && maxActual !== -Infinity
              ? [
                  { x: minActual, y: minActual },
                  { x: maxActual, y: maxActual },
                ]
              : [],
        },
        {
          name: "Actual vs Predicted",
          type: "scatter",
          data: actualValues.map((val: number, index: number) => ({
            x: val,
            y: predictions[index],
          })),
        },
      ],
      options: {
        ...chartOptions,
      },
    };
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      setError(null); // Clear previous error
      setSuccess(null); // Clear previous success
      const response = await fetch(import.meta.env.VITE_API_URL + "/predict", {
        method: "POST",
        body: formData,
      });
      const responseBudget = await fetch(
        import.meta.env.VITE_API_URL + "/budgets",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok || !responseBudget.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const dataBudget = await responseBudget.json();

      console.log(`data`, data);
      setSuccess("File uploaded successfully");
      setBudgetData(dataBudget);
      setChartData(data); // Update chart data
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Linear Regression Data Mahasiswa</title>
        <meta name="description" content="Linear Regression Data Mahasiswa" />
      </Helmet>
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`flex items-center p-4 shadow-md text-white ${
              alert.type === "success"
                ? "bg-green-500"
                : alert.type === "error"
                ? "bg-red-500"
                : alert.type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            <Typography variant="small" className="flex-1">
              {alert.message}
            </Typography>
            <IconButton
              variant="text"
              className="text-white ml-2"
              onClick={() => removeAlert(alert.id)}
            >
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          </Card>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {success && (
          <Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] mt-4">
            {success}
          </Alert>
        )}
        {error && (
          <Alert className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e] mt-4">
            {error}
          </Alert>
        )}
        <section id="landing">
          <h1 className="mb-8 text-center font-sans text-3xl md:text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit">
            Linear Regression Data Mahasiswa
          </h1>
          {chartData && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full px-4 md:px-0">
              <Card className="mb-4 md:mb-3">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Data Mahasiswa TI
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="px-2 pb-0">
                  {chartData ? (
                    <Chart
                      options={formattedData("TI").options}
                      series={formattedData("TI").series}
                      type="line"
                      height={350}
                    />
                  ) : (
                    <Typography variant="small" color="gray">
                      No data to display. Upload a file to see the charts.
                    </Typography>
                  )}
                </CardBody>
              </Card>
            </div>
          )}
          <FileInput
            onFileChange={handleFileChange}
            className="w-full max-w-md px-4"
          />
          <Button
            color="purple"
            onClick={handleUpload}
            disabled={!file}
            loading={isLoading}
            className="mt-4 w-full md:w-auto justify-center focus:outline-none border-none"
          >
            Upload File
          </Button>
        </section>
        {chartData && (
          <section
            id="data-corr"
            className="min-h-[100vh] flex flex-col justify-center mb-4 "
          >
            <h2 className="my-3 block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
              Visualisasi Data Mahasiswa
            </h2>
            <StudentData data={chartData} section={"TI"} />
            
          </section>
        )}
        {chartData && (
          <section className="min-h-[100vh] flex flex-col justify-start">
            <h2 className="my-3 block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
              Budget Calculation
            </h2>
            <div className="mb-3">
              <BudgetCalculation />
            </div>
          </section>
        )}
        {chartData && (
          <section
            id="data-corr"
            className="min-h-[100vh] flex flex-col w-full justify-start"
          >
            <h2 className="my-3 block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
              Predict New Data Calculation
            </h2>
            <div className="mb-3">
              <PredictCalculation data={linearAttribute}/>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
