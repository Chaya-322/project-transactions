import { Component, OnInit } from '@angular/core';
import { StatusTran } from '../models/status';
import { Transaction } from '../models/transaction';
   
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  allTransactions=new Array<Transaction>();
  allStatus=new Array<StatusTran>();
  newStatus="";
  delStatus="";
  selectedStatus="Ready";
  delTransac="";
  selectedTransac="Elbit-Systems";
  tranName="";
  managerName="";
  email="";
  initialStatus="";
  showNewTran=false;
  showS=false;
  showT=false;

  constructor() { }

  ngOnInit(): void {
    this.fillStatusArray();
    this.addTransac("Elbit-Systems","Daitch Chaya",new Date("2021/06/08"),"cd770150@gmail.com",this.allStatus[0].statusName,this.allStatus[1].statusName);
    this.addTransac("EL-AL","Israeli Israel",new Date("2021/06/09"),"123@gmail.com",this.allStatus[1].statusName,this.allStatus[2].statusName);
  }

  saveInitialStatus(){
    if(this.initialStatus!=undefined && this.initialStatus!="")
    window.alert('InitialnStatus '+ this.initialStatus);
    document.getElementsByName('initial').forEach(t=>t.style.display="none");
  }

  addNewTransac(){
    this.showNewTran=!this.showNewTran;
    if(this.tranName!='' && this.managerName!='')
      this.addTransac(this.tranName,this.managerName,new Date(Date.now()),this.email,this.selectedStatus);
  }

  addTransac(uName:string,mName:string,cDate:Date,email:string,fStatus:string,tStatus?:string){
    this.selectedStatus="Ready";
    this.tranName="";
    this.managerName="";
    this.email="";
    if(fStatus=="Final" || tStatus=="Final"){
      window.alert('A transaction cannot be applied to this status');
      return;
    }
    const fromStatus= (this.allStatus.find(s=>s.statusName==fStatus) as StatusTran);
    const toStatus= (this.allStatus.find(s=>s.statusName==tStatus) as StatusTran);
    if (fStatus==this.initialStatus){
      this.allTransactions.push(new Transaction(uName,mName,cDate,email,fromStatus,new StatusTran("orphan","orphan")));
      return;
    } 
    if(tStatus==undefined) 
      tStatus="";
    this.allTransactions.push(new Transaction(uName,mName,cDate,email,fromStatus,toStatus));
  }
      
  fillStatusArray(){
    this.allStatus.push(new StatusTran("Ready"));
    this.allStatus.push(new StatusTran("Active"));
    this.allStatus.push(new StatusTran("Doing"));
    this.allStatus.push(new StatusTran("Impediment"));
    this.allStatus.push(new StatusTran("Final","Final"));
 }

 addStatus(){
     if(this.searchStatus(this.newStatus)==this.allStatus.length && this.newStatus){
      this.allStatus.push(new StatusTran(this.newStatus));
    }
    else{
      if(this.searchStatus(this.initialStatus)==this.allStatus.length && this.initialStatus!=""){
        this.allStatus.push(new StatusTran(this.initialStatus,"Initial"));
      }
      else
      window.alert('Can not add this status');
   }
   this.newStatus="";
 }

 searchStatus(status:string){
  var index=0;
  for(;index<this.allStatus.length && this.allStatus[index].statusName!=status;index++);
  this.allStatus[index]==undefined;
  return index;
 }

 deleteStatus(){
  const indexStatus=this.searchStatus(this.delStatus);
  if(indexStatus===this.allStatus.length){
    window.alert('Missing Status');
  }
  else{
    for(;indexStatus<this.allStatus.length-1;this.allStatus[indexStatus].statusName=this.allStatus[indexStatus+1].statusName,this.allStatus[indexStatus].statusId=indexStatus,indexStatus==indexStatus+1);
    this.allStatus.length=indexStatus;
    window.alert('Deleted Status');
    var i=0;
    this.allTransactions.forEach(element => {
      if(element.fromStatus.statusName==this.delStatus || element.toStatus.statusName==this.delStatus)
      this.selectDeleted(element.tranName);
      i++;
    });
  }
  this.delStatus="";
 }

 selectDeleted(nameTransac:string){
   var index;
    const t=this.allTransactions.find(t=>t.tranName==nameTransac);
    for(index=(t as Transaction).tranId;index<this.allTransactions.length-1;this.allTransactions[index]=this.allTransactions[index+1],this.allTransactions[index].tranId=index,index++);
    this.allTransactions[index]==undefined;
    this.allTransactions.length=index;
    window.alert('Deleted Transaction');
  }

 deleteTransac(){
  const tran= this.allTransactions.find(e=>(e.tranName==this.delTransac));
  if(this.selectedTransac){
    this.selectDeleted(this.selectedTransac);
  }
  else
    window.alert('Missing Transaction');
 }

 showTransacs() {
    this.showT=!this.showT;
 }

  showStatuses(){
    this.showS=!this.showS;
  }

 showNewTransac(){
  this.showNewTran=!this.showNewTran;
 }

 reset(){
   this.allTransactions=new Array<Transaction>();
   this.allStatus=new Array<StatusTran>();
   this.initialStatus="";
 }
}