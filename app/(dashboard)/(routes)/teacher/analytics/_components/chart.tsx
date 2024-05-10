"use client";
import { Card } from "@/components/ui/card";
import {
    Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
interface ChartProps {
    data: {
        name: string;
        total: number;
        
    }[];
}

export const Chart = ({data}: ChartProps) => {
    return <Card>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="#8884d8" radius={[4,4,0,0]} />
            </BarChart>
        </ResponsiveContainer>
    </Card>;
    };