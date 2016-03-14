declare module "notification" {
    export class Notification {
       static permission: string;

       static requestPermission(): void;
    }
}
