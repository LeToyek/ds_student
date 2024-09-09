import { Card, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaPercentage } from "react-icons/fa";
import { moneyParser } from "../../utils/parser";
import { BaseTotalBudget } from "../model/Budget";
import { useBudgetStore } from "../provider/useBudgetStore";

const TABLE_HEAD = [
  "YEAR",
  "SPP",
  "Heregistrasi",
  "DPP",
  "OSPEK",
  "UTS&UAS",
  "Total Budget",
  "Total Pendapatan",
];

const TABLE_HEAD_PERCENTAGE = [
  "YEAR","Sarana", "Prasarana", "SDM"];

export function BudgetCalculation() {
  const {
    saranaPercentage,
    prasaranaPercentage,
    sdmPercentage,
    baseTotalBudgets,
    registrants,
    setNewSaranaPercentage,
    setNewPrasaranaPercentage,
    setNewSdmPercentage,
  } = useBudgetStore();

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<{
    sarana: number;
    prasarana: number;
    sdm: number;
  }>({
    sarana: saranaPercentage * 100,
    prasarana: prasaranaPercentage * 100,
    sdm: sdmPercentage * 100,
  });

  const handleInputChange = (
    type: "sarana" | "prasarana" | "sdm",
    value: number
  ) => {
    setIsTyping(true);
    setInputValue((prev) => ({ ...prev, [type]: value }));

    setTimeout(() => {
      // Update the corresponding percentage after a delay
      if (type === "sarana") {
        setNewSaranaPercentage(value / 100);
      } else if (type === "prasarana") {
        setNewPrasaranaPercentage(value / 100);
      } else if (type === "sdm") {
        setNewSdmPercentage(value / 100);
      }
      setIsTyping(false);
    }, 200);
  };
  return (
    <div className="min-w-[50vw] flex flex-col">
      {/* Show loading indicator when typing */}
      {isTyping && (
        <Typography variant="h4" className="mx-3 mb-3">
          Loading...
        </Typography>
      )}

      <div className="w-full flex flex-col lg:flex-row mb-3">
        {/* First Card */}
        <Card className="h-full w-full overflow-auto mx-3 mb-4 lg:mb-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head: string, index: number) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 p-4 ${
                      index === TABLE_HEAD.length - 1
                        ? "bg-yellow-500"
                        : "bg-light-blue-100"
                    }`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baseTotalBudgets &&
                baseTotalBudgets.map((e: BaseTotalBudget) => (
                  <tr
                    key={e.baseBudget.year}
                    className="even:bg-blue-gray-50/50"
                  >
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {e.baseBudget.year}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.baseBudget.spp)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.baseBudget.heregistrasi)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.baseBudget.dpp)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.baseBudget.ospek)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.baseBudget.utsuas)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(e.totalBudget)}
                      </Typography>
                    </td>
                    <td className="p-4 bg-yellow-200">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(
                          e.totalBudget * registrants[e.baseBudget.year]
                        )}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="w-full flex flex-col items-start">
        <Typography variant="h4" className="mx-3 mb-3">
          Persentase
        </Typography>
        <div className="w-full px-3 flex flex-col mb-3 justify-evenly lg:flex-row ">
          <Input
            label="Sarana"
            className="mb-3"
            icon={<FaPercentage />}
            value={inputValue.sarana}
            crossOrigin={undefined}
            onChange={(e) => {
              const value =
                e.target.value.length === 0 ? 0 : parseFloat(e.target.value);
              handleInputChange("sarana", value);
            }}
          />
          <Input
            label="Prasarana"
            className="mb-3"
            icon={<FaPercentage />}
            value={inputValue.prasarana}
            crossOrigin={undefined}
            onChange={(e) => {
              const value =
                e.target.value.length === 0 ? 0 : parseFloat(e.target.value);
              handleInputChange("prasarana", value);
            }}
          />
          <Input
            label="SDM"
            className="mb-3"
            icon={<FaPercentage />}
            value={inputValue.sdm}
            crossOrigin={undefined}
            onChange={(e) => {
              const value =
                e.target.value.length === 0 ? 0 : parseFloat(e.target.value);
              handleInputChange("sdm", value);
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row mb-3">
        {/* First Card */}
        <Card className="h-full w-full overflow-auto mx-3 mb-4 lg:mb-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD_PERCENTAGE.map((head: string) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 p-4 bg-orange-300 overflow-x-auto`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baseTotalBudgets &&
                baseTotalBudgets.map((e: BaseTotalBudget) => {
                  const totalProfit:number =  e.totalBudget * registrants[e.baseBudget.year];
                  return (
                  <tr
                    key={e.baseBudget.year}
                    className="even:bg-blue-gray-50/50"
                  >
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {e.baseBudget.year}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(totalProfit * saranaPercentage)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(totalProfit * prasaranaPercentage)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moneyParser(totalProfit * sdmPercentage)}
                      </Typography>
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
