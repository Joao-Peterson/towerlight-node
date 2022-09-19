import Connection, { Config } from "imap"
import {cfg} from "../cfg";
import { status } from "./status";

export async function email_exec(){

    console.log("Servers: ", cfg.email.servers.length);
    for(var i = 0; i < cfg.email.servers.length; i++){
        console.log("Server: ", cfg.email.servers.length);
        try {
            var server_info: Config = cfg.email.servers[i];

            var server = new Connection(server_info);

            server.once("ready", () => {
                
                server.openBox("INBOX", true, (error: Error, mailbox: Connection.Box) => {
                    if(error) throw error;

                    server.search(["UNSEEN", ["SINCE", new Date()]], (error: Error, uids: number[]) => {
                        
                        console.log("Emails: ", uids.length);
                        if(uids.length > 0){
                            status.flagEMail = true;
                        }

                    })
                })
            });

            server.once("error", (error: Error) => {
                console.log("server error: ", error.message);
            });

            server.once("end", (error: Error) => {
                console.log("Endind server [%i] connection", i);
            })

            server.connect();
    
        } catch (error: any) {
            if(typeof error === "string"){
                console.log("servers error: ", error);
            }
            else if(error instanceof Error){
                console.log("servers error: ", error.message);
            }
        }

    }
}