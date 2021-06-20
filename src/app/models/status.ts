export class StatusTran{

    statusName:string;
    statusId:number;
    label:string;

    constructor(sName:string,label?:string){
        this.statusName=sName;
        this.statusId=length++;
        if(label)
            this.label=label;
        else
            this.label="Regular";
    }

    // print(){
    //     return("statusId:"+ this.statusId+" uniqueName:"+ this.uniqueName+"  from:"+ this.from.toLocaleDateString()+" to:"+ this.to.toLocaleDateString());
    // }
}