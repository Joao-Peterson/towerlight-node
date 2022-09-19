import { create, Whatsapp, Message, SocketState, Ack } from '@wppconnect-team/wppconnect';
import { status } from './status';

// init wpp-connect
export async function wpp_exec(){
    await create( 
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
            // folderNameToken: "./tokens",
            // puppeteerOptions: {
            //     userDataDir: './tokens/node'
            // },
            devtools: false,
            useChrome: false,
            logQR: true,
            disableWelcome: true,
            autoClose: 0
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

    client.onMessage(async (message: Message) => {
        console.log("[wpp]: %s: %s", message.sender.shortName, message.body);
        status.flagWhatsapp = true;
    });
    
    client.onIncomingCall(async (call: any) => {
        console.log("[wpp]: incoming call");
        status.flagWhatsapp = true;
    });
}
