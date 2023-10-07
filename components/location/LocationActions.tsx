import { Button } from "@nextui-org/button";
import { useGlobalContext } from "@/app/context";
import type { LocationData } from "@/types";
import { TrashIcon, ConfirmIcon } from "../icons";

interface LocationActionsProps {
  disabled: boolean;
  data: LocationData;
  erase: (value: LocationData) => void;
}

const LocationActions = ({ erase, data, disabled }: LocationActionsProps) => {
  const { location, setLocation } = useGlobalContext();

  const saveLocation = () => {
    setLocation([...location, data]);
    erase({} as LocationData);

    const locations = localStorage.getItem("actualLocation");
    if (!locations) {
      localStorage.setItem("actualLocation", JSON.stringify([data]));
    } else if (typeof locations === "string") {
      const storedLocations = JSON.parse(locations);

      const newLocations = [...storedLocations, data];
      localStorage.setItem("actualLocation", JSON.stringify(newLocations));
    }
  };

  return (
    <div className="w-3/4 flex justify-center items-center gap-4">
      <Button
        className="hover:opacity-90 bg-default-200"
        onClick={() => erase({} as LocationData)}
        isDisabled={disabled}
        size="sm"
        radius="sm"
        aria-label="Erase location">
        <TrashIcon />
      </Button>
      <Button
        className="hover:opacity-90 w-2/5"
        onClick={saveLocation}
        isDisabled={disabled}
        color="primary"
        size="sm"
        radius="sm"
        aria-label="Confirm location">
        <ConfirmIcon />
      </Button>
    </div>
  );
};

export default LocationActions;