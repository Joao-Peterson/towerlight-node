import { ClientRequest, IncomingMessage, request } from "http";
import { towerlight } from "./towerlight";
import * as cfg from "../config.json";

export class status_t {
    flagWhatsapp: boolean;
    flagEMail: boolean;
    flagMail: boolean;

    constructor () {
        this.flagWhatsapp = false;
        this.flagEMail = false;
        this.flagMail = false;
    }

    send(){
        const req: ClientRequest = request(
            cfg.towerligh.url, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            },
            (res: IncomingMessage) => {
                res.on("error", (err: Error) => {
                    console.log("[towerlight] [response] [ERROR]: ", err.message);
                });
            }
        );

        const body: towerlight = {
            op: "|",
            red: this.flagEMail,
            yellow: this.flagMail,
            green: this.flagWhatsapp,
            siren: false 
        };
        
        req.on("error", (err: Error) => {
            console.log("[towerlight] [request] [ERROR]: ", err.message);
        })

        req.write(body);
        req.end;

        this.flagEMail = false;
        this.flagMail = false;
        this.flagWhatsapp = false;
    }
}

export const status: status_t = new status_t();