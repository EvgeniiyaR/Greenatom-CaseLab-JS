import React from "react";
import { CurrencyLabel } from "@skbkontur/react-ui";
import { Vehicle, vehicleTypeTitles } from "../data/vehicles/contracts";

interface ITableItemProps {
    vehicle: Vehicle;
    number: number;
}

interface ITableItemsProps {
    vehicles: Vehicle[];
}

const TableItem: React.FC<ITableItemProps> = ({ vehicle, number }) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{vehicle.title}</td>
            <td>
                <CurrencyLabel value={vehicle.price} fractionDigits={2} />
            </td>
            <td>{vehicleTypeTitles[vehicle.type]}</td>
        </tr>
    );
};

export const Table: React.FC<ITableItemsProps> = ({ vehicles }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Цена, ₽</th>
                <th>Тип ТС</th>
            </tr>
            </thead>
            <tbody>
            {vehicles.length > 0 ? (
                vehicles.map((x, i) => (
                    <TableItem key={x.id} number={i + 1} vehicle={x} />
                ))
                )
                :
                <tr>
                    <td colSpan={4} align="center">Нет результатов поиска</td>
                </tr>
            }
            </tbody>
        </table>
    );
};
