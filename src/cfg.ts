import { readFileSync } from "fs";
import { Config } from "imap";
import { Url } from "url";

export interface config_i{
    towerlight: {
        url: string | Url;
    };
    whatsapp:{
        
    };
    email:{
        servers: Config[]
    };
    mail:{
    
    };
};
    
export var cfg: config_i = {
    towerlight: {
        url: "http://your-towerlight-addr:port/set-route"
    },
    whatsapp:{
        
    },
    email:{
        servers:[
            {
                user: "you-email@mail.com",
                password: "your-password",
                host: "your-imap-host.imap.com",
                port: 993,
                tls: true,
                tlsOptions:{
                    servername: "same as your host"
                }
            }
        ]
    },
    mail:{

    }
};    

export function set_cfg(filename: string){
    try {
        cfg = JSON.parse(readFileSync(filename, "utf-8"));
    } catch (error) {
        throw error;
    }
}