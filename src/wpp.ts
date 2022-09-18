import { create, Whatsapp } from '@wppconnect-team/wppconnect';

// init wpp-connect
export function wppInit(){
    create( 
        {
            session: "node",
            catchQR: (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => {
                console.log("QR Read attempts: ", attempt);
                console.log(asciiQR);
            },
            statusFind: (status: string, session: string) => {
                console.log("Status session: ", status);
                console.log("Session name: ", session);
            },
            headless: true,
            devtools: false,
            useChrome: false,
            logQR: true,
            disableWelcome: false,
            folderNameToken: "./tokens"
        }
    ).then(
        (client: Whatsapp) => {
            start(client);
        }
    ).catch(
        (error: string) => {
            console.log(error);
        }
    );
}

// start wpp-connect Whatsapp client
async function start(client: Whatsapp){
    client.onMessage((message) => {
        // console.log("[%s]: %s", message.timestamp.toLocaleString(), message.body);
        console.log(message);
    });
}