import { TipoSensor } from "./types/tipoSensor";
import { Sensor } from "./types/sensor";
import { StatusMedicao } from "./types/statusMedicao";
import { Medicao } from "./interfaces/medicao";
const sensorMotorA: Sensor = {
  id: 1,
  nome: "Motor A - Linha 1",
  tipo: "TEMPERATURA",
  limiteMinimo: 10,
  limiteMaximo: 80,
  ativo: true,
};
const sensorPressaoB: Sensor = {
  id: 2,
  nome: "Sistema Hidráulico B",
  tipo: "PRESSAO",
  limiteMinimo: 30,
  limiteMaximo: 120,
  ativo: true,
};
function criarMedicao(
  id: number,
  sensor: Sensor,
  valor: number,
  data: Date
): Medicao {
  let status: StatusMedicao = "normal";
  if (valor < sensor.limiteMinimo || valor > sensor.limiteMaximo) {
    status = "alerta";
  }
  if (valor > sensor.limiteMaximo * 1.2) {
    status = "critico";
  }
  return {
    id,
    sensor,
    valor,
    data,
    status,
  };
}
function exibirMedicao(medicao: Medicao): string {
  return `
Medição #${medicao.id}
Sensor: ${medicao.sensor.nome}
Tipo: ${medicao.sensor.tipo}
Valor: ${medicao.valor}
Data: ${medicao.data.toLocaleString("pt-BR")}
Status: ${medicao.status}
`;
}
const medicao1 = criarMedicao(
  1,
  sensorMotorA,
  75,
  new Date()
);
const medicao2 = criarMedicao(
  2,
  sensorMotorA,
  95,
  new Date()
);
const medicao3 = criarMedicao(
  3,
  sensorMotorA,
  15,
  new Date()
);
const medicao4 = criarMedicao(
  4,
  sensorMotorA,
  25,
  new Date()
);
const medicao5 = criarMedicao(
  5,
  sensorMotorA,
  45,
  new Date()
);
console.log("=== MEDIÇÃO 1 ===");
console.log(exibirMedicao(medicao1));
console.log("=== MEDIÇÃO 2 ===");
console.log(exibirMedicao(medicao2));
console.log("=== MEDIÇÃO 3 ===");
console.log(exibirMedicao(medicao3));
console.log("=== MEDIÇÃO 4 ===");
console.log(exibirMedicao(medicao4));
console.log("=== MEDIÇÃO 5 ===");
console.log(exibirMedicao(medicao5));
function listarAlertas(medicoes: Medicao[]): Medicao[] {
  return medicoes.filter((m) => m.status === "alerta" || m.status === "critico");
}
function listarPorSensor(
  medicoes: Medicao[],
  sensor: Sensor
): Medicao[] {
  return medicoes.filter((m) => m.sensor.id === sensor.id);
}
