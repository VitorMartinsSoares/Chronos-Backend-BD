let agrupamento = function(results, values, res) {
    if(results.length!=0){
        let items = [];
        let fund = [];
        items = results.map(e => {
            switch (e.horario) {
                case "07:00:00":
                    e.horario = "07:00 - 07:50";
                    e.pos = 0;
                    break;
                case "07:50:00":
                    e.horario = "07:50 - 08:40";
                    e.pos = 1;
                    break;
                case "08:55:00":
                    e.horario = "08:55 - 09:45";
                    e.pos = 2;
                    break;
                case "09:45:00":
                    e.horario = "09:45 - 10:35";
                    e.pos = 3;
                    break;
                case "10:50:00":
                    e.horario = "10:50 - 11:40";
                    e.pos = 4;
                    break;
                case "11:40:00":
                    e.horario = "11:40 - 12:30";
                    e.pos = 5;
                    break;
                case "12:30:00":
                    e.horario = "12:30 - 13:50";
                    e.pos = 6;
                    break;
                case "13:50:00":
                    e.horario = "13:50 - 14:40";
                    e.pos = 7;
                    break;
                case "14:40:00":
                    e.horario = "14:40 - 15:30";
                    e.pos = 8;
                    break;
                case "15:50:00":
                    e.horario = "15:50 - 14:40";
                    e.pos = 9;
                    break;
                case "16:40:00":
                    e.horario = "16:40 - 17:30";
                    e.pos = 10;
                    break;
                case "17:30:00":
                    e.horario = "17:30 - 19:00";
                    e.pos = 11;
                    break;
                case "19:00:00":
                    e.horario = "19:00 - 19:50";
                    e.pos = 12;
                    break;
                case "19:50:00":
                    e.horario = "19:50 - 20:40";
                    e.pos = 13;
                    break;
                case "20:55:00":
                    e.horario = "20:55 - 21:45";
                    e.pos = 14;
                    break;
                case "21:45:00":
                    e.horario = "21:45 - 22:35";
                    e.pos = 15;
                    break;
                default:
                    break;
            }
            return e;
        });
        let i = 0,
            j = 0,
            cont = 1;
        for (i = 0; i < items.length - 1; i++) {
            if (
                items[i].email == items[i + 1].email &&
                items[i].numero == items[i + 1].numero &&
                items[i].pos + 1 == items[i + 1].pos
            ) {
                let parts1 = items[i].horario.split("-")[0];
                let parts2 = items[i + 1].horario.split("-")[1];
                let vetPart = [parts1, parts2];
                items[i + 1].horario = vetPart.join("-");
                cont++;
            } else {
                fund[j] = items[i];
                fund[j].cont = cont;
                cont = 1;
                j = j + 1;
            }
        }
        fund[j] = items[items.length - 1];
        fund[j].cont = cont;
        res.json(fund);
    }else{
        res.status(200).send("OK")
    }
};
module.exports = agrupamento;