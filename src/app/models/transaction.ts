import { StatusTran } from "./status";

export class Transaction{
   
    tranId:number;
    tranName: string;
    managerName: string;
    createdDate: Date;
    email: string;
    fromStatus:StatusTran;
    toStatus:StatusTran;

    constructor(tName:string,mName:string,cDate:Date,email:string,fStatus:StatusTran,tStatus:StatusTran){
        this.tranId=length++;
        this.tranName=tName;
        this.managerName=mName;
        this.createdDate=new Date(cDate);
        this.email=email;
        this.fromStatus=fStatus;
        this.toStatus=tStatus;
    }

//     f(status:string){
// if(this.toStatus.statusName==status)
// return true;
//     }
    // print(){
    //     return("uniqueName:"+ this.uniqueName+"managerName:"+ this.managerName+"  createdDate:"+ this.createdDate.toLocaleDateString()+" phone:"+ this.phone+" email:"+this.email+" status:"+this.status);
    // }
}