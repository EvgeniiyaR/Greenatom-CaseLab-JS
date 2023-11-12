import React, { ChangeEvent, useState, Dispatch } from "react";
import { VehicleTypeSelect } from "./VehicleTypeSelect";
import { VehicleType, Vehicle } from "../data/vehicles/contracts";
import { VehicleApi } from "../data/vehicles/api";
import { Input, Button, Gapped } from "@skbkontur/react-ui";

interface IFilter {
    setVehicles: Dispatch<Vehicle[]>;
}

export const Filter: React.FC<IFilter> = ({ setVehicles }) => {
    const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    const handleVehicleTypeChange = (newType: VehicleType | null) => {
        setSelectedVehicleType(newType);
        setVehicles(VehicleApi.search({title: searchValue, type: newType}));
    };

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        setVehicles(VehicleApi.search({title: value, type: selectedVehicleType}));
    };

    const hadnleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVehicles(VehicleApi.search({title: searchValue, type: selectedVehicleType}));
    };

    return (
        <form name="form-search" onSubmit={hadnleSubmit}>
            <Gapped gap={5}>
                <Input name="search" placeholder="Поиск" onChange={handleSearchValueChange} value={searchValue} />
                <VehicleTypeSelect value={selectedVehicleType} onChange={handleVehicleTypeChange} />
                <Button type="submit">Search</Button>
            </Gapped>
        </form>
    );
};
