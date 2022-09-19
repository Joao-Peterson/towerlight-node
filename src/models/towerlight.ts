export interface towerlight{
    op: "=" | "|",                          // operation, "=" sets all lights to the exact value while "|" or's the fields with the current ones  
    red: boolean,
    yellow: boolean,
    green: boolean,
    siren: boolean 
}