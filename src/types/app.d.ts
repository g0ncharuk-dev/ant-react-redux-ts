export = App;
export as namespace App;

declare namespace App {

    interface IApiConfig {
        api: {
            connection: string;
        }
    }
    
}


declare module '*.svg'
declare module '*.png'
declare module '*.jpg'