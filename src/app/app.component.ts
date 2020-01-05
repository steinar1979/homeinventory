import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { User } from './services/user.model'; // optional
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;
  courses : any []
  user: any
  title = 'firebasetest';
  books;
  lyspaerer;
  guest;




  constructor(
    private fb:FormBuilder, db: 
    AngularFireDatabase, private firestoreDB: 
    AngularFirestore, public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ){
   
        //firestoreDB.collection('steinarsgreie').add({ting: "tang"});
        //firestoreDB.collection('books').doc('bok4').delete();
       /*  firestoreDB.collection('books').doc('bok1').set({Tittel: "Hei på deg1", Forfatter: "Jon Michelet"})
        firestoreDB.collection('books').doc('bok2').set({Tittel: "Hei på deg2", Forfatter: "Jon Michelet"})
        firestoreDB.collection('books').doc('bok3').set({Tittel: "Hei på deg3", Forfatter: "Jon Michelet"})
        firestoreDB.collection('books').doc('bok4').set({Tittel: "Hei på deg4", Forfatter: "Jon Michelet"})
        firestoreDB.collection('books').doc('bok5').set({Tittel: "Hei på deg5", Forfatter: "Jon Michelet"})
 */
        //firestoreDB.collection('books').doc('bok1').update({Forfatter: "Steinar Løberg Myrvang"})

      


          
          
  }

  validateLyspaerer = this.fb.group({
    type: ['',Validators.required],
    teknologi: ['', Validators.required],
    watt: ['',Validators.required],
    bildeurl: ['',Validators.required],
    add: ['',Validators.required]
    

})
get f() { return this.validateLyspaerer.controls; }


  ngOnInit() {
    
    //this.firestoreDB.collection('books').doc('bok6').set({Tittel: "Hei på deg6", Forfatter: "Jon Michelet"})
 /*        this.firestoreDB.collection('books').valueChanges().subscribe( (data) => {
          this.books = data;
        } )  
  } */

  //this.books = this.firestoreDB.collection('books').valueChanges()
  this.lyspaerer = this.firestoreDB.collection('lyspaerer').valueChanges().subscribe((data)=> {
      this.lyspaerer = data;
 } )


 

}

 
 

  
 

  //this.createLyspaerer()


documentid=Math.random().toString(36).substr(2, 9);

  createLyspaerer(){
    console.log(this.validateLyspaerer.value.type, 
      this.validateLyspaerer.value.watt, this.validateLyspaerer.value.teknologi)
    this.firestoreDB.collection('lyspaerer').doc(this.documentid).set({DocID: this.documentid, Type: this.validateLyspaerer.value.type, 
      watt: this.validateLyspaerer.value.watt, teknologi: this.validateLyspaerer.value.teknologi, bildeurl: this.validateLyspaerer.value.bildeurl})


    }
    element: HTMLElement;
    type;
    teknologi;
    watt;
    bildeurl;

  updateLyspaere(docid,type,teknologi,watt,bildeurl){

    if(this.validateLyspaerer.value.type==''){
        type=type;
    }
    else{
        type=this.validateLyspaerer.value.type;
    }

    if(this.validateLyspaerer.value.teknologi==''){
      teknologi=teknologi;
    }
    else{
      teknologi=this.validateLyspaerer.value.teknologi;
    }

    if(this.validateLyspaerer.value.watt==''){
      watt=watt
    }
    else{
      watt=this.validateLyspaerer.value.watt;
    }

    if(this.validateLyspaerer.value.bildeurl==''){
      bildeurl=bildeurl;
    }
    else{
      bildeurl=this.validateLyspaerer.value.bildeurl;
    }


   console.log("DOCID"+docid,"TYPE"+type,"WATT"+watt,"TEKNOLOGI"+teknologi,"BILDEURL"+bildeurl)
    this.firestoreDB.collection('lyspaerer').doc(docid.replace(/ /g, "")).update({Type: type, 
      watt: watt, teknologi: teknologi, bildeurl: bildeurl})


  }

  
  edit=false;
  checkDocID;
  editFields(docid){
    console.log(this.validateLyspaerer)
      if(this.edit){
        this.edit=false;
      }
      else{
        this.edit=true
      }
      this.checkDocID=docid;
      

      
  }

  changeNumber(docID,addremove,antall){
      console.log(docID,addremove)
      if (addremove=="add"){
        antall=antall+1;
       

      }
      else if (addremove=="remove"){
        antall=antall-1;
      }

      console.log(docID,addremove,antall)
      this.firestoreDB.collection('lyspaerer').doc(docID.replace(/ /g, "")).update({antall: antall})
  }



}
