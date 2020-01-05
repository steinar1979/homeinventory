import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model'; // optional
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-harryhandel',
  templateUrl: './harryhandel.component.html',
  styleUrls: ['./harryhandel.component.scss']
})
export class HarryhandelComponent{
  user$: Observable<User>;
  user: any
  varer;
  guest;

  constructor(
    private fb:FormBuilder, db: 
    AngularFireDatabase, private firestoreDB: 
    AngularFirestore, public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  validateHarryhandel = this.fb.group({
    varenavn: ['',Validators.required],
  
  
    

  })
  get f() { return this.validateHarryhandel.controls; }

  ngOnInit() {

    this.varer = this.firestoreDB.collection('Harryhandel').valueChanges().subscribe((data)=> {
      this.varer = data;

  
    
     
 } )
  }

  documentid=Math.random().toString(36).substr(2, 9);

  createHarryhandel(){
   
    this.firestoreDB.collection('Harryhandel').doc(this.documentid).set({DocID: this.documentid, varenavn: this.validateHarryhandel.value.varenavn, 
     antall_lager: 0, antall_skal_ha:0, antall_balanse:0})


    }

  edit=false;
  checkDocID;
  editFields(docid){
      console.log(docid)
      if(this.edit){
        this.edit=false;
      }
      else{
        this.edit=true
      }
      this.checkDocID=docid;
      

      
  }
  updateVarer(docid,varenavn){
      
    if(this.validateHarryhandel.value.varenavn==''){
        varenavn=varenavn;
    }
    else{
        varenavn=this.validateHarryhandel.value.varenavn;
    }

 

 
    this.firestoreDB.collection('Harryhandel').doc(docid.replace(/ /g, "")).update({varenavn: varenavn})
    }
balanse:number;
    
    changeAntall(docID,addremove,antall_lager,antall_skal_ha){
      console.log(docID,addremove,antall_lager)
       

      if (addremove=="add"){
        antall_lager=antall_lager+1;
      }
      else if (addremove=="remove"){
        antall_lager=antall_lager-1;
      }
      this.balanse=antall_lager-antall_skal_ha;
    
      this.firestoreDB.collection('Harryhandel').doc(docID.replace(/ /g, "")).update({antall_lager: antall_lager,antall_balanse:this.balanse})
    }
    
    changeAntallSkalHa(docID,addremove,antall_lager,antall_skal_ha){
      console.log(docID,addremove)
      if (addremove=="add"){
        antall_skal_ha=antall_skal_ha+1;
       

      }
      else if (addremove=="remove"){
        antall_skal_ha=antall_skal_ha-1;
      }
      this.balanse=antall_lager-antall_skal_ha;
      console.log(docID,addremove,antall_skal_ha)
      this.firestoreDB.collection('Harryhandel').doc(docID.replace(/ /g, "")).update({antall_skal_ha: antall_skal_ha, antall_balanse: this.balanse})
    }
    
   
    
}
