import { Card, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaPercentage } from "react-icons/fa";
import { moneyParser } from "../../utils/parser";
import { useBudgetStore } from "../provider/useBudgetStore";

const TABLE_HEAD = ["YEAR", "SMA", "SMK", "MA", "Total Budget"];
const TABLE_HEAD_PERCENTAGE = [
  "YEAR",
  "Sarana",
  "Prasarana",
  "SDM",
  "Total Budget",
];

export function BudgetCalculation() {
  const {
    registrantBudget,
    saranaPercentage,
    prasaranaPercentage,
    sdmPercentage,
    baseBudget,
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
    <div className="w-full flex flex-col">
      {/* Show loading indicator when typing */}
      {isTyping && (
        <Typography variant="h4" className="mx-3 mb-3">
          Loading...
        </Typography>
      )}

      <div className="w-full flex flex-col items-start">
        <div className="px-3 w-full items-start flex flex-col mb-3">
        <Typography variant="h4" className="mb-3">
          Basis Budget
        </Typography>
        <Input
          label="Basis Budget"
          className="mb-3 font-semibold"
          value={moneyParser(baseBudget)}
          crossOrigin={undefined}
          disabled
        />
        </div>
        <Typography variant="h4" className="mx-3 mb-3">
          Persentase
        </Typography>
        <div className="w-full px-3 flex flex-col mb-3 justify-evenly lg:flex-row ">
          <Input
            label="Sarana"
            className="mb-3 lg:mb-0"
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
            className="mb-3 lg:mb-0"
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
            className="mb-3 lg:mb-0"
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

      <div className="w-full flex flex-col lg:flex-row">
        {/* First Card */}
        <Card className="h-full w-full lg:w-1/2 overflow-auto mx-3 mb-4 lg:mb-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead >
              <tr>
                {TABLE_HEAD.map((head: string) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-light-blue-100 p-4"
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
              {registrantBudget &&
                registrantBudget.map(
                  ({
                    year,
                    sma,
                    smk,
                    ma,
                    yearBudget,
                  }: {
                    year: number;
                    sma: number;
                    smk: number;
                    ma: number;
                    yearBudget: number;
                  }) => (
                    <tr key={year} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {year}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(sma)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(smk)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(ma)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(yearBudget)}
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </Card>

        {/* Second Card */}
        <Card className="h-full w-full lg:w-1/2 overflow-auto mx-3 mb-4 lg:mb-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD_PERCENTAGE.map((head: string) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-green-100 p-4"
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
              {registrantBudget &&
                registrantBudget.map(
                  ({
                    year,
                    yearBudget,
                  }: {
                    year: number;
                    yearBudget: number;
                  }) => (
                    <tr key={year} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {year}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(yearBudget * saranaPercentage)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(yearBudget * prasaranaPercentage)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(yearBudget * sdmPercentage)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moneyParser(yearBudget)}
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
