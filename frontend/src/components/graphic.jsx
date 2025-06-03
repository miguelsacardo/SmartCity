import { Chart as ChartJS, scales } from "chart.js/auto";
import {
  Line,
} from "react-chartjs-2";
import { FormatDate } from "./list_data/list_methods";

export function Graphic({ HistoricoData }) {
  return (
    <div className="flex justify-center">

      <div className="w-[70%] text-7xl">
        <Line
          data={{
            labels: HistoricoData.map((historico) =>
              FormatDate(historico.timestamp)
            ),
            datasets: [
              {
                label: "Valor",
                data: HistoricoData.map((historico) => historico.valor),
                borderRadius: 5,
                backgroundColor: '#B0FE76',
                borderColor: '#5E4AE3',
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          }}
          options={{
            scales:{
                x:{
                    ticks:{
                        font:{
                            size: 15,
                            family: 'Poppins',
                            weight: 'bold'
                        }
                    }
                },
                y:{
                    ticks:{
                        font:{
                            size: 18,
                            family: 'Poppins',
                            weight: 'bolder'
                        }
                    }
                }
            }
          }}
        />
      </div>
    </div>
  );
}
