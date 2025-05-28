import {Chart as ChartJS, scales} from "chart.js/auto";
import { Bar, Doughnut, Line, Bubble, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2"
import { FormatDate } from "./list_data/list_methods";

export function Graphic({ HistoricoData }){
    HistoricoData = [
        {
            "id":1,
            "mac_address":"00:01:1B:12:00",
            "valor": 13.8,
            "timestamp": "2025-05-05T19:00:00Z"
        },
        {
            "id":2,
            "mac_address":"00:01:1B:12:00",
            "valor": 25.78,
            "timestamp": "2025-05-09T01:00:00Z"
        },
        {
            "id":3,
            "mac_address":"00:01:1B:12:00",
            "valor": 2.78,
            "timestamp": "2025-05-09T20:00:00Z"
        },
        {
            "id":4,
            "mac_address":"00:01:1B:12:00",
            "valor": 3.0,
            "timestamp": "2025-05-09T20:00:01Z"
        },
        {
            "id":5,
            "mac_address":"00:01:1B:12:00",
            "valor": 10.78,
            "timestamp": "2025-05-10T00:00:00Z"
        },
        {
            "id":6,
            "mac_address":"00:01:1B:12:00",
            "valor": 99.99,
            "timestamp": "2025-05-10T05:00:00Z"
        },
        {
            "id":7,
            "mac_address":"00:01:1B:12:00",
            "valor": 99.99,
            "timestamp": "2025-05-10T05:00:00Z"
        },

    ]
    return(
        <div className="w-150 h-auto flex">
                <Radar
                data={{
                    labels: HistoricoData.map((historico) => historico.id),
                    datasets: [
                        {
                            label: "Valor",
                            data: HistoricoData.map((historico) => historico.valor),
                            borderRadius: 5,
                        },
                    ],
                
                }}
            />
            <Doughnut
                data={{
                    labels: HistoricoData.map((historico) => historico.id),
                    datasets: [
                        {
                            label: "Valor",
                            data: HistoricoData.map((historico) => historico.valor),
                            borderRadius: 5,
                        },
                    ],
                
                }}
            />
            <Bar
                data={{
                    labels: HistoricoData.map((historico) => FormatDate(historico.timestamp)),
                    datasets: [
                        {
                            label: "Valor",
                            data: HistoricoData.map((historico) => historico.valor),
                            borderRadius: 5,
                        },
                    ],
                
                }}
            />
        </div>
    )
}