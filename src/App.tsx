import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./App.css";
import FileInput from "./ui/components/FileInput";

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
  const [error, setError] = useState<string | null>(null); // Store error message
  const [success, setSuccess] = useState<string | null>(null); // Store success message

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
  }, [success,error]);

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

      const response = await fetch(
        "http://34.44.42.255/api/regression/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSuccess("File uploaded successfully");
      setChartData(data); // Update chart data
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 text-center font-sans text-3xl md:text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit">
        Linear Regression Data Mahasiswa
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-0">
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
                Data Mahasiswa SI
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            {chartData ? (
              <Chart
                options={formattedData("SI").options}
                series={formattedData("SI").series}
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

      {/* Success Alert */}
      {success && (
        <Alert
          className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] mt-4"
        >
          {success}
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert
          className="rounded-none border-l-4 border-[#c92e2e] bg-[#c92e2e]/10 font-medium text-[#c92e2e] mt-4"
          
        >
          {error}
        </Alert>
      )}
    </div>
  );
}


export default App;
